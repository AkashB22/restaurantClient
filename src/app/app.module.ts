import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RestaurantHomeComponent, NgbdSortableHeader } from './restaurant-home/restaurant-home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomPipe } from './custom.pipe';
import { RestaurantMapsComponent } from './restaurant-maps/restaurant-maps.component';
import {AgmCoreModule} from '@agm/core';
import { RestaurantDescriptionComponent } from './restaurant-description/restaurant-description.component';
import { CurrencyCustomPipe } from './currency-custom.pipe';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AuthInterceptor} from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    RestaurantHomeComponent,
    CustomPipe,
    NgbdSortableHeader,
    RestaurantMapsComponent,
    RestaurantDescriptionComponent,
    CurrencyCustomPipe,
    SignupPageComponent,
    SigninPageComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNNfHUYNJIf6_9QOqC297BYNdygDqfgMc'
    })
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
