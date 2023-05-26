import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { LoginUser } from '../shared/login-user';
import { RegisterUser } from '../shared/register-user';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://localhost:44381/api/'

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {   
  }

  RegisterUser(registerUser: RegisterUser){
    return this.httpClient.post(`${this.apiUrl}Authentication/Register`, registerUser, this.httpOptions)
  }

  LoginUser(loginUser: LoginUser){
    return this.httpClient.post<User>(`${this.apiUrl}Authentication/Login`, loginUser, this.httpOptions)
  }

  ValidateOtp(user: User){
    return this.httpClient.post(`${this.apiUrl}Authentication/Otp`, user, this.httpOptions)
  }

  CompileProductDashboard(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Product/GetProductDashboard`)
    .pipe(map(result => result))
  }

}
