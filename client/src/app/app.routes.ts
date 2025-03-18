import { Routes } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundGuard} from './guards/NotFound/not-found.guard';
import {LayoutComponent} from './layout/layout.component';
import {loginGuard} from './guards/LoginGuard/login.guard';
import {ToursComponent} from './pages/tours/tours.component';

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'not-found', component: NotFoundComponent },
  {path: 'tours', component: LayoutComponent,
  children: [
    {path: '', component: ToursComponent},
  ]},
  {path: '', redirectTo:'/auth', pathMatch: 'full'},
  {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];
