import { Routes } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LayoutComponent} from './layout/layout.component';
import {ToursComponent} from './pages/tours/tours.component';
import {TourItemComponent} from './pages/tour-item/tour-item.component';
import {authGuard} from './shared/guards/auth/auth.guard';
import {NotFoundGuard} from './shared/guards/NotFound/not-found.guard';

export const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'not-found', component: NotFoundComponent },
  {
    path: 'tours',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
    {
      path: '', component: ToursComponent
    },
    {
      path: 'tour', redirectTo: '', pathMatch: 'full'
    },
    {
      path: 'tour/:tourId', component: TourItemComponent
    }
  ]},
  {path: '', redirectTo:'/auth', pathMatch: 'full'},
  {path: '**', redirectTo:'/not-found', pathMatch: 'full', canActivate: [NotFoundGuard]}
];
