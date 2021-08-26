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
          if (error.status === 404) {
            throw (new NotFoundError())
          }
          else if (error.status === 500) {
            throw (new ServerError())
          }
          else if (error.status === 0) {
            throw (new NetWorkError())
          }
          else if (error.status === 400) {
            throw (new BadRequestError(error.error.error))
          }
          throw (new AppError(error))
        })
      )

  }

  // SignIn User
  signIn() { }

  // Get Login user
  getUser() {

  }

  // Signout
  signOut() { }
}
