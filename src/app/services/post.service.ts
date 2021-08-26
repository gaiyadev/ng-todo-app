import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient,
  ) { }

  createPost() { }

  updatePost() { }

  deletePost() { }

  fetchPosts() { }

  fetchPost() { }
}
