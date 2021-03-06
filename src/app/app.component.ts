import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Linear Regression Visualizer';
  dots:any  = [];
  line = [0,0,2000,0];
  editMode: Boolean = true;
  reset: Boolean =false;
  learningRate = 0.000001;
  iterations = 1000;
  delay = 10;
  x:any = [];
  y:any = [];
  t0 = 0;
  t1 = 0;
  cost: number = 0;
  makeDot(event: any){
    if(!this.editMode) return;
    const temp = [event.offsetX,event.offsetY];
    this.dots.push(temp);
  }

  async GradientDescent(){
    this.editMode = false;
    var m: number = this.dots.length;
    this.x = new Array(m);
    this.y = new Array(m);
    var xAvg = 0;
    for (let i = 0; i < m; i++) {
      this.x[i] = this.dots[i][0];
      this.y[i] = this.dots[i][1];
      xAvg += this.x[i];
    }
    xAvg = xAvg/m;
    for (let i = 0; i < m; i++) {
      //this.x[i] = (this.x[i]-xAvg)/xAvg;
    }
    var h:number[] = new Array(m);

    for (let itr = 0; itr < this.iterations; itr++) {
      if(this.reset) break;
      for (let i = 0; i < m; i++) {
        h[i]=this.t0 + this.t1*this.x[i];    
      }



      this.cost = 0;
      for(let i=0;i<m;i++){
        this.cost += (h[i]-this.y[i])*(h[i]-this.y[i]);
      }
      this.cost = this.cost/(2*m);

      var temp: number = 0;
      for(let i=0;i<m;i++){
        temp += (h[i]-this.y[i]);
      }
      this.t0 = this.t0 - (temp)/m;

      temp = 0;
      for(let i=0;i<m;i++){
        temp += (h[i]-this.y[i])*this.x[i];
      }
      console.log(temp);
      this.t1 = this.t1 - (this.learningRate*temp)/m;

      this.line[1] = this.t0;
      this.line[3] = this.t0 + 2000*this.t1;

      await new Promise(f => setTimeout(f,this.delay));

      
    }


    this.editMode = true;
  }

  async doReset(){
    this.reset = true;
    this.x.length = 0;
    this.y.length = 0;
    this.dots.length = 0;
    this.cost =0;
    this.t1=0;
    this.t0 =0;
    this.line[0] = 0;
    this.line[1] = 0;
    this.line[2] = 2000;
    this.line[3] = 0;
    await new Promise(f => setTimeout(f,2*this.delay));
    this.reset = false;
  }
}
