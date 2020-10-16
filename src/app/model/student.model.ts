import { Address } from './address.model';

export class Student {
    public id: number;
    public enrlmntNmbr: string;
    public stdntNm: string;
    public stndrd: number;
    public addrss: Address;
    public cntct: number;
    public prntNm: string;
    public rltnshp: string;

    // tslint:disable-next-line: max-line-length
    constructor(id: number, enrlmntNmbr: string, stdntNm: string, stndrd: number, addrss: Address, cntct: number, prntNm: string, rltnshp: string) {
        this.id = id;
        this.enrlmntNmbr = enrlmntNmbr;
        this.stdntNm = stdntNm;
        this.stndrd = stndrd;
        this.addrss = addrss;
        this.cntct = cntct;
        this.prntNm = prntNm;
        this.rltnshp = rltnshp;
    }
}
