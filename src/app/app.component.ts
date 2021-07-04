import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MachineLearningVisualizer';
  dots:any  = [];
  line = [0,310,2000,0]
  makeDot(event: any){
    console.log("clicked")
    //this.line[0] = event.offsetX;
    //this.line[1] = event.offsetY;
    const temp = [event.offsetX,event.offsetY];
    this.dots.push(temp);

  }
}
