import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Volume } from '../volume';

import { ViewChild } from '@angular/core';
import { enableProdMode } from '@angular/core';

@Component({
  selector: 'app-version-flow',
  templateUrl: './version-flow.component.html',
  styleUrls: ['./version-flow.component.css']
})
export class VersionFlowComponent {
  nodeR:number = 30;
  context:CanvasRenderingContext2D;
  nodes = {};
  selectedNode = undefined;
  queue = new Array();
  ctx;
  color = {
      "previous":"yellow",
      "current":"red",
      "unupdated":"blue"
  };

  @ViewChild("versionflow") canvas;

  selectNode(pos): void{
      let self = this;

      let tempNode = undefined;

      let idxs = Object.keys(self.nodes);

      for(let i=0; i<idxs.length; i++){
        let node = self.nodes[idxs[i]];
        let mag:number = Math.sqrt(Math.pow(pos.offsetX - node.x, 2) + Math.pow(pos.offsetY - node.y, 2));         
        
            if(mag <= self.nodeR){
                tempNode = node;
            }
      };

      if(self.selectedNode != undefined)
        self.drawNode(self, self.selectedNode.status, self.selectedNode.base, self.selectedNode.id, false);

      if(tempNode != undefined)
        self.drawNode(self, tempNode.status, tempNode.base, tempNode.id, true);

      self.selectedNode = tempNode;
  }

  drawNode(self, status, base, id, selected){
    let xVal;
    let yVal;

    

    if(self.nodes[id] == undefined){
        
        if(base == null)
            xVal = 50;
        else
            xVal = self.nodes[base].x + 150;
    }else{
        xVal = self.nodes[id].x;
    }

    if(self.nodes[id] == undefined){
        yVal = 50;

        let idxs = Object.keys(self.nodes);
        
        for(let i=0; i<idxs.length; i++){
            let node = self.nodes[idxs[i]];
            if(node.base == base)
                yVal += 100;
        };
    }
    else{
        yVal = self.nodes[id].y;
    }

    self.ctx.beginPath();
    self.ctx.arc(xVal, yVal, self.nodeR, 0, 2*Math.PI);
    self.ctx.fillStyle=self.color[status];
    self.ctx.fill();
    if(selected == true){
        self.ctx.lineWidth=4.8;
        self.ctx.strokeStyle="cyan";
    }
    else{
        self.ctx.lineWidth=5;
        self.ctx.strokeStyle=self.color[status];
    }
    self.ctx.stroke();
    self.ctx.fillStyle = "black";
    self.ctx.textAlign = "center";
    self.ctx.fillText((id as string).substr(0,id.length / 2), xVal, yVal + 20);
    self.ctx.fillText((id as string).substr(id.length / 2 + 1, id.length / 2), xVal, yVal + 30);

    self.nodes[id] = {
        id: id,
        base:base, 
        x:xVal, 
        y:yVal,
        status: status
    };
  }

  drawEdge(self, from, to){
      let dir = {
          x: to.x - from.x,
          y: to.y - from.y
      };

      let mag = Math.sqrt(Math.pow(dir.x,2) + Math.pow(dir.y,2));

      let normalizedDir = {
        x: dir.x / mag,
        y: dir.y / mag
      };

      self.ctx.beginPath();
      self.ctx.moveTo(from.x + normalizedDir.x * self.nodeR, from.y + normalizedDir.y * self.nodeR);
      self.ctx.lineTo(to.x - normalizedDir.x * self.nodeR, to.y - normalizedDir.y * self.nodeR);
      self.ctx.strokeStyle="#000000";
      self.ctx.lineWidth=1;
      self.ctx.stroke();
  }

  ngAfterViewInit(){
    let self = this;
    let canvas = this.canvas.nativeElement;

    this.context = canvas.getContext("2d");

    self.ctx = this.context;

    canvas.addEventListener('mousedown', function(event){
        self.selectNode(event);
        console.log(event);
    })

  }

  constructor(private volume: Volume,
        private router:Router) {
    let self = this;

    this.volume._promise().then(function (text) {
        let volumeList = (text as Response).json();

        let snapshots:Array<any> = volumeList['snapshots'];

        let idx = 0;
        let base = null;

        while(snapshots.length != 0){
            for(let i=0; i<snapshots.length; i++){
                console.log(snapshots[i].description);
                let tempSnap = eval('(' + snapshots[i].description + ')');

                if(tempSnap.base == base){
                    let tempObject = {
                        id:snapshots[i].id,
                        base:base,
                        status:tempSnap.status
                    }
                    self.queue.push(tempObject);
                    snapshots.splice(i,1);
                    i--;
                }
            }
            base = self.queue[idx++].id;
        }

        self.drawCanvas(self);
  
      }, function (error) {
        
      });

  }

  drawCanvas(self){

      self.drawNode(self, self.queue[0].status, self.queue[0].base, self.queue[0].id, false);
      
      for(let i=1; i<self.queue.length; i++){
          self.drawNode(self, self.queue[i].status, self.queue[i].base, self.queue[i].id, false);
          
          self.drawEdge(self, self.nodes[self.queue[i].id], self.nodes[self.queue[i].base]);
      }
  }

  backButton(){
      this.router.navigate(['./screen']);
  }
}
