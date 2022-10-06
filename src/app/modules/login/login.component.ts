import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formsubmitted: boolean = false;
  emailId = "info@gmail.com";
  pass  = "1234"
  message: string;

  constructor(private formBuilder: FormBuilder,private router: Router,) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {
    // if(localStorage.getItem('token') == "logged In successfully"){
    //   this.router.navigate(['login/dashboard']);
    // }
  }

  login(){
    this.formsubmitted = true;
    if(this.loginForm.invalid){
      return;
    }

    if(this.emailId == this.loginForm.value['email']){
      if(this.pass == this.loginForm.value['password']){
        localStorage.setItem('token', 'logged In successfully')
        this.router.navigate(['user/dashboard']);
      }else{
        this.message = "Password Is incorrect"
        setTimeout(() => {
          this.message = "";
        }, 2000);
      }
    }else{
      this.message = "Email Is incorrect"
      setTimeout(() => {

        this.message = "";
      }, 2000);
    }

  }

  get email() {
    return this.loginForm.get('email');
  }
 get password() {
    return this.loginForm.get('password');
  }

}
