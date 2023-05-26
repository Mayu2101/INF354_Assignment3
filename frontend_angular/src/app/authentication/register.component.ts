import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.fb.group({
    UserName: ['', [Validators.required, Validators.email]],
    Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
  })

  constructor(private router: Router, private dataService: DataService, private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  RegisterUser(){

    if(this.registerFormGroup.valid)
    {
      this.dataService.RegisterUser(this.registerFormGroup.value).subscribe(() => {
        this.registerFormGroup.reset();
        this.router.navigate(['']).then((navigated: boolean) => {
          if(navigated) {
            this.snackBar.open(`Registered successfully`, 'X', {duration: 5000});
          }
       });
      }, (response: HttpErrorResponse) => {
        if (response.status === 403) {
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
        if (response.status === 500){
          this.snackBar.open(response.error, 'X', {duration: 5000});
        }
      })
    }
  }
}
