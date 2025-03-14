import { Routes } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {NotFoundGuard} from './guards/not-found.guard';
import {LayoutComponent} from './layout/layout.component';

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'main', component: LayoutComponent },
  {path: 'not-found', component: NotFoundComponent },
  {path: '', redirectTo:'/auth', pathMatch: 'full'},
  {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];
