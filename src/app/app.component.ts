import { Component } from '@angular/core';
import { appservice } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'Calculator';
  public result: string = '';
  constructor(private appservice:appservice){}
  readonly calcMap: Object[] = [
    [7, 8, 9, '*'],
    [4, 5, 6, '-'],
    [1, 2, 3, '+'],
    [0, '.', '/', '='],
  ];

  public addToCalculation(param: any): void {
    switch (param) {
      case '=':
        this.appservice.sendData({'data':this.result}).subscribe((sendData: any)=>{
          console.log(sendData);
          this.appservice.getData().subscribe((redecivedData:any)=>{
            console.log(redecivedData.data);
            this.result=redecivedData.data;
           })
        })
        break;
      case '.':
        if (!isNaN(+this.result[this.result.length - 1])) {
          this.result += param;
        }
        break;
      default:
        this.result += param;
        break;
    }
  }
  public delete(last?: boolean): void {
    this.result = last && this.result.length > 1 ? this.result.slice(0, -1) : '';
  }
}
