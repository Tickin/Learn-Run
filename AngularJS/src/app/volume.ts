import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Token } from './Token';

@Injectable()
export class Volume{
    private static url = "http://hyjung888.dlinkddns.com:18776/v3/3311cdf1d2794ca38a4ab87930348d87/snapshots";
    private static headers = new Headers();
    private data:Object;
    private static http : Http;
    public static id : string;
    public static value = null;
    
    constructor( http: Http ){
        Volume.http = http;
    }

  _promise = function () {
    return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
            var data: any;
            console.log(Token.id);
            Volume.headers.set('X-Auth-Token', Token.id);
            console.log(Volume.headers);

            Volume.http.get(Volume.url, { headers: Volume.headers }).subscribe(response => {
                    this.data = (response);
                    resolve(this.data);
                }
            );

        }, 3000);
    });
};
}