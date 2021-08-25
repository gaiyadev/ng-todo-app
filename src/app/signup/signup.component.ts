import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldValidators } from '../validators/field.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'Sign up'

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
      FieldValidators.cannotContainSpace,
    ],
      FieldValidators.ShouldBeUniqueField
    ),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      FieldValidators.cannotContainSpace
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10),
      FieldValidators.cannotContainSpace
    ])
  })

  get username(): any {
    return this.form.get('username');
  }
  get email(): any {
    return this.form.get('email');
  }
  get password(): any {
    return this.form.get('password')
  }


  onSubmit() {
    console.log(this.form.value)
  }
}
