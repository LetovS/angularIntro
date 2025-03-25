import { Routes } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {LayoutComponent} from './layout/layout.component';
import {ToursComponent} from './pages/tours/tours.component';
import {TourItemComponent} from './pages/tour-item/tour-item.component';
import {authGuard} from './shared/guards/auth/auth.guard';
import {SettingsComponent} from './pages/settings/settings.component';
import {ChangePasswordComponent} from './pages/settings/change-password/change-password.component';
import {StatisticsComponent} from './pages/settings/statistics/statistics.component';

export const routes: Routes = [
  {path: 'auth', component: AuthComponent}, //
  {path: 'not-found', component: NotFoundComponent },,
  {
    path: 'settings',
    component: LayoutComponent,
    children: [
      {
        path: '', component: SettingsComponent
      },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'statistics', component: StatisticsComponent }
    ]
  },
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
  {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];
