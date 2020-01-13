import { Component, OnInit } from '@angular/core';
import {UserService} from './../user.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$";
  model ={
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
  };

  msg: string = "";

  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    if(form.valid && this.model['password'] === this.model['repeatPassword']){
      console.log(form);
      this.service.onSignup(this.model).subscribe(
        (data)=>{
          form.reset();
          console.log(data);
          this.router.navigateByUrl('/signin?email=' + this.model['email']);
        }
      )
    } else{
      this.msg = "password not matching";
    }
  }
}
