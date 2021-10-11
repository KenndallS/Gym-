import { HttpHeaders } from "@angular/common/http";

export class Configuration {
    public static api: string = 'http://localhost:3000/api';
    public static headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
}
