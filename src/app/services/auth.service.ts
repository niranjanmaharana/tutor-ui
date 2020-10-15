import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, first } from 'rxjs/operators';
import { Configuration } from '../util/config';
import { JwtResponse } from '../model/jwt.response';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { AppConstant } from '../const/app.constant';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  showWarning = false;
  idleState = 'Not started.';
  timedOut = false;
  lastPing = null;
  tokenUpdateIntervalTask = null;

  constructor(private http: HttpClient, private router: Router, private idle: Idle, private keepalive: Keepalive) {
    idle.setIdle(AppConstant.IDLE_TIME);
    idle.setTimeout(AppConstant.TIMEOUT_INTERVAL);
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.invalidateSession();
      this.router.navigate(['/']);
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      this.showWarning = true;
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(AppConstant.PING_INTERVAL);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    if (Configuration.user == null) {
      idle.stop();
    } else if (Configuration.user) {
      idle.watch();
    }
  }

  login(username: string, password: string) {
    // return this.http.post<JwtResponse>(Configuration.getApiUrl() + '/' + Configuration.getLoginUrl(), { username, password })
    return this.http.get<JwtResponse>('../assets/json/login.json')
      .pipe(map(response => {
        Configuration.udpateToken(response);
        this.start();
      }));
  }

  logout() {
    clearInterval(this.tokenUpdateIntervalTask);
    Configuration.clearToken();
    this.stop();
    this.router.navigate(['/login']);
  }

  resetPassword(email: string) {
    return this.http.post<JwtResponse>(Configuration.getApiUrl() + '/noauth/reset-password', { email })
      .pipe(map(response => {
        console.log(response);
      }));
  }

  updateTokenWithInterval() {
    this.tokenUpdateIntervalTask = setInterval(() => {
      const token = Configuration.getToken();
      if (token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        });
        const options = { headers };
        // this.http.post<JwtResponse>(Configuration.getApiUrl() + '/' + Configuration.getUpdateTokenUrl(), null, options)
        this.http.get<JwtResponse>('../assets/json/token.json')
          .pipe(first())
          .subscribe(
            data => {
              Configuration.udpateToken(data);
            },
            error => {
              alert('Invalid session. Please try again.');
              console.log(error);
              this.logout();
            });
      } else {
        this.logout();
      }
    }, AppConstant.UPDT_TKN_INTRVL);
  }

  checkSessionToken() {
    const token = Configuration.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      });
      const options = { headers };
      // this.http.post<JwtResponse>(Configuration.getApiUrl() + '/' + Configuration.getUpdateTokenUrl(), null, options)
      this.http.get<JwtResponse>('../assets/json/token.json')
        .pipe(first())
        .subscribe(
          data => {
            Configuration.udpateToken(data);
            this.updateTokenWithInterval();
            if (this.idleState === 'Not started.') {
              this.start();
              this.router.navigate(['/home']);
            }
          },
          error => {
            this.stop();
            alert('Invalid session. Please try again.');
            console.log(error);
            this.logout();
          });
    } else {
      this.logout();
    }
  }

  start() {
    this.idle.watch();
  }

  stop() {
    this.idle.stop();
  }

  invalidateSession() {
    this.logout();
    this.showWarning = false;
  }

  continueSession() {
    this.checkSessionToken();
    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
    this.showWarning = false;
  }

  getUser() {
    return Configuration.getUser();
  }

  getFirstName() {
    return Configuration.getFirstName();
  }
}
