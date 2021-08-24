import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('loading...')
  }
  title = "Sign in"
  onSubmit(formData: any) {
    const { email, password } = formData.value;
    const data = {
      email,
      password
    }
    console.log(JSON.stringify(data))
  }
}
