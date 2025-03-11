import { Routes } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundGuard} from './guards/not-found.guard';

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'not-found', component: NotFoundComponent },
  {path: '', redirectTo:'/auth', pathMatch: 'full'},
  {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];
