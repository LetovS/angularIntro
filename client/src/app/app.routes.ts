import { Routes } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';

export const routes: Routes = [
  {path: '', redirectTo:'/auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: NotFoundComponent}
];
