import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login.component';
import { OtpComponent } from './authentication/otp.component';
import { RegisterComponent } from './authentication/register.component';
import { ProductsComponent } from './reporting/products.component';

const routes: Routes = [
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'otp', component:OtpComponent},
  {path: 'productDashboard', component:ProductsComponent},
  {path: '', redirectTo: 'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
