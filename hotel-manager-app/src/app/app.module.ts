import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { UserRoutingModule } from './user/user-routing.module';
import { UserModule } from './user/user.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MealEventsModule } from './meal-events/meal-events.module';
import { CredentialsInterceptor } from './interceptors/http.interceptor';
import { AuthGuard } from './utils/auth-guard';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { GuestsModule } from './guests/guests.module';
import { MenuModule } from './menu/menu.module';
import { PieChartComponent } from './home/pie-chart/pie-chart.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    HttpClientModule,
    UserRoutingModule,
    BrowserAnimationsModule,
    MealEventsModule,
    MenuItemsModule,
    GuestsModule,
    MenuModule,
    HomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
