import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RestaurantDetails} from './Models/RestaurantDetails';
import {Subject, Observable, pipe} from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  constructor(private http: HttpClient) { }

  private restaurantUrl = 'http://localhost:3000/api/restaurant';
  private restaurantDespUrl = 'http://localhost:3000/api/restaurantDesp';
  
  //private restaurantUrl = 'https://restaurant-app-server.herokuapp.com/api/restaurant';
  //private restaurantDespUrl = 'https://restaurant-app-server.herokuapp.com/api/restaurantDesp';
  private restaurants: any;
  private restaurantsUpdated = new Subject();
  noAuthHeader:any = {
    headers : new HttpHeaders({
      'x-noauth' : 'true'
    })   
  };

  getRestaurants(){
    this.http.get<any>(this.restaurantUrl, this.noAuthHeader)
      .subscribe(
        (restaurants)=>{
          this.restaurants = restaurants;
          this.restaurantsUpdated.next([...this.restaurants])
        },
        (err)=> console.log(err)
      )
  }

  getRestaurantsUpdatedListener(){
    return this.restaurantsUpdated.asObservable();
  }

  getRestaurantDesp(id){
    return this.http.get(`${this.restaurantDespUrl}/${id}`, this.noAuthHeader);
  }

  getLocationBasedDetails(long, lat){
    return this.http.get(`${this.restaurantUrl}/${long}/${lat}`);
  }
}
