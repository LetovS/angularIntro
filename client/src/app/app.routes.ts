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
import {UsersComponent} from './pages/settings/users/users.component';
import {ToursEditorComponent} from './pages/settings/tours-editor/tours-editor.component';
import {OrdersComponent} from './pages/orders/orders.component';
import {CartComponent} from './pages/cart/cart.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '', component: AuthComponent
      }
    ]},
  { path: 'not-found', component: NotFoundComponent },
  {
    path: 'settings',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '', component: SettingsComponent
      },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'statistics', component: StatisticsComponent,
        data: {showAside: true} },
      { path: 'users', component: UsersComponent,
        data: {showAside: true} }
      ,
      { path: 'tours-editor', component: ToursEditorComponent,
        data: {showAside: true} }
    ]
  },
  {
    path: 'tours',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
    {
      path: '', component: ToursComponent, data: {showAside: true},
    },
    {
      path: 'tour', redirectTo: '', pathMatch: 'full'
    },
    {
      path: 'tour/:tourId', component: TourItemComponent,
    }
  ]},
  {
    path: 'cart',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '', component: CartComponent
      },
      {
        path: 'cart', redirectTo: '', pathMatch: 'full'
      }]},
  {
    path: 'orders',
    canActivate: [authGuard],
    component: LayoutComponent,
    children: [
      {
        path: '', component: OrdersComponent
      }]},
  {path: '', redirectTo:'/auth', pathMatch: 'full'},
  {path: '**', redirectTo:'/not-found', pathMatch: 'full'}
];
