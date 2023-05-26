import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.email]],
    Password: ['', Validators.required],
  })

  isLoading:boolean = false

  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  LoginUser(){
    if(this.loginFormGroup.valid)
    {
      this.isLoading = true

      this.dataService.LoginUser(this.loginFormGroup.value).subscribe(result => {
        localStorage.setItem('User', JSON.stringify(result))
        this.loginFormGroup.reset();
        this.router.navigate(['otp']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`The OTP has been sent to your email address`, 'X', {duration: 10000});
          }
       });
      }, (response: HttpErrorResponse) => {
        this.isLoading = false
        if (response.status === 404) {
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
      })
    }
  }
}
