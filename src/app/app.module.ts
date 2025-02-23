import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataService } from './users/services/user-data.service';
import { UserService } from './users/services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AppComponent } from './app.component';
import { ListComponent, } from './users/list/list.component';
import { FormComponent } from './users/edit-form/edit-form.component';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
  ], 
  providers: [
    UserDataService,
    UserService,
  ]
})
export class AppModuleModule { }
