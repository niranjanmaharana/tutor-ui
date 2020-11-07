export class EmailProperty {
    public id: number;
    public purpose: string;
    public emailHost: string;
    public emailPort: number;
    public protocol: string;
    public auth: boolean;
    public starttls: boolean;
    public username: string;
    public password: string;
    public emailFrom: string;
    public defaultEncoding: string;

    constructor(id: number, purpose: string, username: string,
                password: string, emailHost: string, emailPort: number,
                emailFrom: string, protocol: string, auth: boolean,
                starttls: boolean, defaultEncoding: string) {
        this.id = id;
        this.purpose = purpose;
        this.username = username;
        this.password = password;
        this.emailHost = emailHost;
        this.emailPort = emailPort;
        this.emailFrom = emailFrom;
        this.protocol = protocol;
        this.auth = auth;
        this.starttls = starttls;
        this.defaultEncoding = defaultEncoding;
    }
}
