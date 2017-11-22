import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, Http } from '@angular/http';
import { Token } from './Token';
import { Servers } from './servers';

@Injectable()
export class VdiToken{
    private static url = "http://164.125.70.14:18774/v2.1/servers/";
    private static headers = new Headers();
    private data:Object;
    private static http : Http;
    public static id : string;
    public static value = null;

    
    constructor( http: Http ){
        VdiToken.http = http;
    }

    /*
    public static getServers = function() {
       window.setTimeout(function(){
         var request = new XMLHttpRequest();
                 
         request.onreadystatechange = function (oEvent) {
             if (request.readyState == 4) {
                 Servers.value = request.response;
                 console.log(Servers.value);
             }
         }
         //var token = Token.getToken();
         request.open("GET", Servers.url);
         //request.setRequestHeader('X-Auth-Token',Token.getToken());
         request.setRequestHeader('X-Auth-Token',Token.id);
         //console.log(body);
         //console.log(JSON.stringify(body));
         request.send();
       }, 3000);
   }
   */

  _promise = function () {
    return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
            var data: any;
            VdiToken.headers.set('X-Auth-Token', Token.id);
            console.log(Token.id);
            console.log(Servers.id);

            VdiToken.http.post(VdiToken.url + Servers.id + '/action', JSON.stringify({
                "os-getVNCConsole": {
                    "type": "novnc"
                }
            }),{ headers: VdiToken.headers }).subscribe(response => {
                    this.data = (response);
                    resolve(this.data);
                }
            );

        }, 3000);
    });
};
}