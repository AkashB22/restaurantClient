import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  user = new Subject();
  user$ = this.user.asObservable();

  constructor() { }
  
  setUser(username){
    this.user.next(username);
  }
}
