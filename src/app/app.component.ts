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
  learningRate = 0.01;
  iterations = 10;
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
    for (let i = 0; i < m; i++) {
      this.x[i] = this.dots[i][0]/100 ;
      this.y[i] = this.dots[i][1]/100;
    }
    var h:number[] = new Array(m);

    for (let itr = 0; itr < this.iterations; itr++) {
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
      this.t0 = this.t0 - (this.learningRate*temp)/m;

      temp = 0;
      for(let i=0;i<m;i++){
        temp += (h[i]-this.y[i])*this.x[i];
      }
      console.log(temp);
      this.t1 = this.t1 - (this.learningRate*temp)/m;

      this.line[1] = this.t0;
      this.line[3] = this.t0 + 2000*this.t1;

      await new Promise(f => setTimeout(f,1000));

      
    }


    this.editMode = true;
  }
}
