import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class appservice {

  constructor(private http: HttpClient) { }
getData(){
  return this.http.get('http://localhost:3000/data')
}

  sendData(data:any):any {
    
    return this.http.post('http://localhost:3000/data',data);
  }
}
