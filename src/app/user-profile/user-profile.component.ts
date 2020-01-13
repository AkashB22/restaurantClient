import { Component, OnInit } from '@angular/core';
import {UserService} from './../user.service';
import {Router} from '@angular/router';
import {SharedService} from './../shared.service';
interface UserDetail{
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  token: string;
  userObj: any;
  editable: Boolean = false;
  userDetails: UserDetail
  model = {
    username: '',
    password: '********',
    repeatPassword: '********',
    email: ''
  };
  passwordChange: Boolean = false;
  
  constructor(private service: UserService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
    this.userObj = this.service.getUserPayload();
    if(this.userObj){
      this.service.getUserDetails().subscribe(
        (data)=>{
          let password = {password: '********', repeatPassword: '********'};
          this.userDetails = {...data['user'], ...password};
          this.model = {...this.userDetails};
          //console.log(this.userDetails);
        }
      )
    } else{
      this.router.navigateByUrl('/signin');
    }
  }

  updateUserForm(form){
    console.log(this.model);
    if(this.model.password == this.model.repeatPassword){
      this.service.updateUser(this.model).subscribe(
        (data)=> {
          this.userDetails = this.model;
          //console.log(this.userDetails);
          this.editable = false;
        }
      )
    }
  }

  onDelete(){
    if(confirm('Are you sure you want to delete you account?')){
      console.log(this.service.getUserPayload().id);
      this.service.deleteUser(this.service.getUserPayload().id).subscribe(
        (data)=> {
          console.log('user deleted ', data);
          this.service.deleteToken();
          this.sharedService.setUser(null);
          this.router.navigateByUrl('/home');
        }
      )
    }
  }
}
