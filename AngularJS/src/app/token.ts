import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions, Http } from '@angular/http';

@Injectable()
export class Token {
  private static url = "http://164.125.70.14:10080/identity/v3/auth/tokens";
  private static headers = new Headers({'Content-Type':'application/json'});
  private data: Object;
  private static http: Http;
  public static id: string;
  public static value = null;


  constructor(http: Http) {
    Token.http = http;
  }
  /*
  public static getToken = function() {
    if(Token.value == null){
      window.setTimeout(function(){
        var request = new XMLHttpRequest();
                
        request.onreadystatechange = function (oEvent) {
            if (request.readyState == 4) {
                Token.value = request.getResponseHeader('X-Subject-Token');
                console.log(Token.value);
                return Token.value;
            }
        }
        
        var body = {
          "auth": {
            "identity": {
              "methods": [
                  "password"
              ],
              "password": {
                  "user": {
                      "name": "demo",
                      "domain":{
                        "name":"Default"
                      },
                      "password": "stack"
                  }
              }
            },
            "scope": {
              "project": {
                "domain": {
                  "name" : "Default"
                },
                "name":"demo"
              }
            }
          }
        };
        
        request.open("POST", "http://164.125.70.14:10080/identity/v3/auth/tokens");
        request.setRequestHeader('Content-Type','application/json');
        //console.log(body);
        //console.log(JSON.stringify(body));
        request.send(JSON.stringify(body));
      }, 3000);
    }else{
      return Token.value;
    }
  };
  */

  public getToken(){
    
  }
  
  _promise = function () {
    return new Promise(function (resolve, reject) {
        window.setTimeout(function () {
            var data: any;
            Token.http.post(Token.url, JSON.stringify({
              "auth": {
                "identity": {
                  "methods": [
                      "password"
                  ],
                  "password": {
                      "user": {
                          "name": "demo",
                          "domain":{
                            "name":"Default"
                          },
                          "password": "stack"
                      }
                  }
                },
                "scope": {
                  "project": {
                    "domain": {
                      "name" : "Default"
                    },
                    "name":"demo"
                  }
                }
              }
            }),
              { headers: Token.headers }).subscribe(response => {
                    this.data = (response);
                    resolve(this.data);
                }
            );

        }, 3000);
    });

  };
  
}

