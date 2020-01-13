import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {UserService} from './../user.service';
import {SharedService} from './../shared.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent implements OnInit {
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  model = {
    email: '',
    password: ''
  }

  constructor(private service: UserService, private router: Router, private sharedService: SharedService) { }

  ngOnInit() {
  }

  onSubmit(form){
    //console.log(this.model);
    if(form.valid){
      this.service.onSignin(this.model).subscribe(
        (data)=>{
          this.service.setToken(data['token']);
          this.sharedService.setUser(this.model['email'])
          this.router.navigateByUrl('/home');
        }
      )
    }
  }  
}
