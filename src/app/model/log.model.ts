export class Log {
    public id: number;
    public createdDate: Date;
    public createdBy: number;
    public lastModifiedDate: Date;
    public lastModifiedBy: number;
    public active: boolean;
    public logTypeCd: number;
    public logMsg: string;
    public logDesc: string;
    public requestUri: string;
    public logClass: string;
    public username: string;

    constructor(id: number, createdDate: Date, createdBy: number, lastModifiedDate: Date, lastModifiedBy: number, active: boolean,
                logTypeCd: number, logMsg: string, logDesc: string, requestUri: string, logClass: string, username: string) {
        this.id = id;
        this.createdDate = createdDate;
        this.createdBy = createdBy;
        this.lastModifiedBy = lastModifiedBy;
        this.lastModifiedDate = lastModifiedDate;
        this.active = active;
        this.logTypeCd = logTypeCd;
        this.logMsg = logMsg;
        this.logDesc = logDesc;
        this.requestUri = requestUri;
        this.logClass = logClass;
        this.username = username;
    }
}
