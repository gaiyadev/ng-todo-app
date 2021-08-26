import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppError } from '../common/app.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { NetWorkError } from '../common/network.error';
import { BadRequestError } from '../common/bad-request.error';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private baseUrl: String = 'https://note-expressjs-api.herokuapp.com'

  signUp(formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/users/register`, formData)
      .pipe(
        catchError((error: Response | any): any => {
          switch (true) {
            case error.status === 404:
              throw (new NotFoundError())
            case error.status === 500:
              throw (new ServerError())
            case error.status === 0:
              throw (new NetWorkError())
            case error.status === 400:
              throw (new BadRequestError(error.error.error))
            default:
              throw (new AppError(error))
          }



        })
      )

  }

  // SignIn User
  signIn(formData: any) {
    return this.http.post(`${this.baseUrl}/api/users/login`, formData)
      .pipe(
        catchError((error: Response | any): any => {
          switch (true) {
            case error.status === 404:
              throw (new NotFoundError())
            case error.status === 500:
              throw (new ServerError())
            case error.status === 0:
              throw (new NetWorkError())
            case error.status === 400:
              throw (new BadRequestError(error.error.error))
            default:
              throw (new AppError(error))
          }



        })
      )

  }

  // Get Login user
  getUser() {

  }

  // Signout
  signOut(): void {
    localStorage.clear();
  }

  isSignIn(): Boolean {
    return false
  }
}
