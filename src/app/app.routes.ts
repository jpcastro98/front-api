import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ListComponent } from './users/list/list.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthLogothGuard } from './auth/authLogouth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent,canActivate:[AuthLogothGuard]},
    { path: 'auth/login', component: LoginComponent, canActivate:[AuthLogothGuard]},
    { path: 'users', component: ListComponent, canActivate: [AuthGuard] },
    { path: '**', component: ListComponent, canActivate: [AuthGuard] },
];
