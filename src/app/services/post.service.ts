import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppError } from '../common/app.error';
import { BadRequestError } from '../common/bad-request.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { ForbiddenError } from '../common/forbidden.error';
// import { AuthHttp } from 'angular2-jwt';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    //  private authHttp: AuthHttp,
    private http: HttpClient,
  ) { }
  private baseUrl: String = 'https://note-expressjs-api.herokuapp.com'

  createPost(formData: any): Observable<any> {
    let token: any = localStorage.getItem('token')

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })

    const httpOptions = {
      headers: headers
    };


    return this.http.post(`${this.baseUrl}/api/notes/add`, formData, httpOptions)
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
            case error.status === 401:
              throw (new ForbiddenError(error.error.error))
            default:
              throw (new AppError(error))
          }
        })
      )
  }

  updatePost() { }

  deletePost() { }

  fetchPosts() {
    let token: any = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    })
    const httpOptions = {
      headers: headers
    };

    return this.http.get(`${this.baseUrl}/api/notes/`, httpOptions)
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
            case error.status === 401:
              throw (new ForbiddenError(error.error.error))
            default:
              throw (new AppError(error))
          }
        })
      )
   }

  fetchPost() { }
}
