import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurentModel } from '../models/restaurent.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurentService {

  constructor(private _http: HttpClient) { }


  [x: string]: any;
  addRestaurent(restaurentModelObj: RestaurentModel) {
    throw new Error('Method not implemented.');
  }

  //POST request
  postRestaurent(data:any ) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  //GET request
  getRestaurent() {
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }));
  }
  //delete request
  deleteRestaurant(id:number) {
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }
  //update request
  updateRestaurant(id: number, data: any) {
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }

}
