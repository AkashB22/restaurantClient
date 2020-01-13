import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantHomeComponent} from './restaurant-home/restaurant-home.component';
import {RestaurantMapsComponent} from './restaurant-maps/restaurant-maps.component';
import {RestaurantDescriptionComponent} from './restaurant-description/restaurant-description.component'
import {SignupPageComponent} from './signup-page/signup-page.component';
import {SigninPageComponent} from './signin-page/signin-page.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: RestaurantHomeComponent},
  {path: 'maps', component: RestaurantMapsComponent},
  {path: 'desp/:id', component: RestaurantDescriptionComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'signin', component: SigninPageComponent},
  {path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
