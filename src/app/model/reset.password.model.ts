export class ResetPassword {
    public password: string;
    public token: string;

    constructor(token: string, password: string) {
        this.token = token;
        this.password = password;
    }
}