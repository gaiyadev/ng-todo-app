import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  baseUrl: String = ''

  signUp() {
  }

  // SignIn User
  signIn() { }

  // Get Login user
  getUser() { }

  // Signout
  signOut() { }
}
