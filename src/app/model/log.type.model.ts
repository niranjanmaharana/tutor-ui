import { Type } from '@angular/core';

export class LogType {
    public key: number;
    public value: string;
    public type: string;

    constructor(key: number, value: string, type: string) {
        this.key = key;
        this.value = value;
        this.type = type;
    }
}
