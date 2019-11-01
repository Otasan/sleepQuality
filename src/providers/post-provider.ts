import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class PostProvider{
    server : string = "http://alexandre-abdo.alwaysdata.net/API/sleep";
    constructor(public http : Http){

    }

    postData(body, file){
        let type = "application/json; characterset=UTF-8";
        let headers = new Headers({'Content-Type' : type});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.server = file, JSON.stringify(body), options)
        .pipe(map(data => data.json()));
    }
}