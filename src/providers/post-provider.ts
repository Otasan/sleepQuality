import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PostProvider{
    server : string = "http://alexandre-abdo.alwaysdata.net/API/sleep/";
    constructor(public http : Http){

    }

    postData(body, file){
        return this.http.post(this.server + file, JSON.stringify(body), {})
        .pipe(map(data => data.json()));
    }
}
