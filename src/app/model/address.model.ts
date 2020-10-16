export class Address {
    public id: number;
    public cntry: string;
    public state: string;
    public dstrct: string;
    public city: string;
    public addrss: string;
    public zipCd: number;

    constructor(id: number, cntry: string, state: string, dstrct: string, city: string, addrss: string, zipCd: number){
        this.id = id;
        this.cntry = cntry;
        this.state = state;
        this.dstrct = dstrct;
        this.city = city;
        this.addrss = addrss;
        this.zipCd = zipCd;
    };
}
