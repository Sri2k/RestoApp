import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestaurentModel } from '../models/restaurent.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurentService {

  constructor(private _http: HttpClient) { }
  apiUrl:string = environment.apiUrl;

  [x: string]: any;
  addRestaurent(restaurentModelObj: RestaurentModel) {
    throw new Error('Method not implemented.');
  }

  //POST request
  postRestaurent(data:any ) {
    return this._http.post<any>(this.apiUrl+"restoposts", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  //GET request
  getRestaurent() {
    return this._http.get<any>(this.apiUrl+"restoposts").pipe(map((res:any)=>{
      return res;
    }));
  }
  //GET request
  getRestaurantById(id:number) {
    return this._http.get<any>(this.apiUrl+"restoposts/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }
  //delete request
  deleteRestaurant(id:number) {
    return this._http.delete<any>(this.apiUrl+"restoposts/"+id).pipe(map((res:any)=>{
      return res;
    }));
  }
  //update request
  updateRestaurant(id: number, data: any) {
    return this._http.put<any>(this.apiUrl+"restoposts/"+id,data).pipe(map((res:any)=>{
      return res;
    }));
  }

}
