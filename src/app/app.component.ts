import { Component } from '@angular/core';
import { UserService} from './user.service';
import {Router} from '@angular/router';
import {SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'restaurantClient';
  validUser: Boolean;
  username: string;

  constructor(private service : UserService, private router: Router, private sharedService: SharedService){}

  ngOnInit(){
    this.sharedService.user$.subscribe(
      (data)=>{
        console.log(data);
        if(data != null){
          this.setUserData();
        } else{
          this.validUser = false;
          this.username = null;
        }
      }
    )
    this.validUser = this.service.isLoggin();
    if(this.validUser){
      this.setUserData();
    }
  }

  setUserData(){
    this.service.getUserDetails().subscribe(
      (data)=>{
        if(data!=null){
          this.validUser = true;
          this.username = data['user']['username'];
        } else{
          this.validUser = false;
          this.username = null;
        }
      }
    )
  }

  logoutUser(){
    this.service.deleteToken();
    this.validUser = this.service.isLoggin();
    this.router.navigateByUrl('/signin');
  }
}
