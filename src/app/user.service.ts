import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  userUrl:string = 'http://localhost:3000/users/';
  
  //userUrl:string = 'https://restaurant-app-server.herokuapp.com/users/';
  noAuthHeader = {
    headers : new HttpHeaders({
      'x-noauth' : 'true'
    })   
  }

  onSignup(data){
    return this.http.post(this.userUrl + 'signup', data, this.noAuthHeader);
  }

  onSignin(data){
    return this.http.post(this.userUrl + 'login', data, this.noAuthHeader);
  }

  getUserDetails(){
    return this.http.get(this.userUrl + 'userprofile');
  }

  updateUser(user): Observable<any>{
    return this.http.put(this.userUrl + 'update', user);
  }

  deleteUser(id){
    return this.http.delete(this.userUrl + 'delete');
  }
//helpers
  setToken(token){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  deleteToken(){
    return localStorage.removeItem("token");
  }
  
  //getuserpayload function
  getUserPayload(){
    let token = this.getToken();
    if(token){
      try{
        let userObj = JSON.parse(atob(token.split('.')[1]));
        return userObj;
      }catch(e){
        console.log('Error on parsing token' + e);
        return false;
      } 
    } else{
      return null;
    }
  }

  //isLoggin
  isLoggin(){
    let userObj = this.getUserPayload();
    if(userObj){
      return userObj['exp'] > Date.now()/ 1000;
    } else{
      return false;
    }
  }
}
