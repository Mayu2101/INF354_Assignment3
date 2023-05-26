import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  
   user: User = {
     userName: '',
     otp: ''
   }

  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  otpFormGroup:FormGroup = this.fb.group({
   Otp: ['', Validators.required],
  })

  ngOnInit(): void {
  }

  SubmitOtp(){
      if (localStorage.getItem('User'))
      {
        this.user = JSON.parse(localStorage.getItem('User')!)
        this.user.otp = this.otpFormGroup.value['Otp']
        
          this.dataService.ValidateOtp(this.user).subscribe(() => {
            this.otpFormGroup.reset();
              this.router.navigate(['../productDashboard'])
          }, (response: HttpErrorResponse) => {
            if (response.status === 400) {
              this.snackBar.open(response.error, 'X', {duration: 5000});
            }
          })  
      }
  }
}
