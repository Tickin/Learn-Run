import { Component, OnInit } from '@angular/core';
import { VdiToken } from '../vdiToken';
import { Servers } from '../servers';
import { Token } from '../token';

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-vdi',
  templateUrl: './vdi.component.html',
  styleUrls: ['./vdi.component.css']
})
export class VdiComponent implements OnInit {
  url :SafeResourceUrl;
  constructor(private vdiToken: VdiToken, private servers: Servers
  , private sanitizer : DomSanitizer) {
    //console.log(VdiToken.id);
    this.url=sanitizer.bypassSecurityTrustResourceUrl(VdiToken.id);
   }

  ngOnInit() {
    //this.getVncToken();
  }

  private vncToken:string;


}
