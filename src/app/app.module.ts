import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './services/auth-guard.service';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { PostComponent } from './post/post.component';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenGetter } from './jwt/jwt.config';
import { UpdatePostComponent } from './update-post/update-post.component';
import { ViewPostComponent } from './view-post/view-post.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    PageNotFoundComponent,
    NavbarComponent,
    HomeComponent,
    DashboardComponent,
    AdminComponent,
    ForbiddenComponent,
    PostComponent,
    UpdatePostComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://note-expressjs-api.herokuapp.com', 'http://localhost:4200'],
        disallowedRoutes: []

      }
    }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
