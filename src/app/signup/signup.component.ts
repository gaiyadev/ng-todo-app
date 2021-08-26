import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppError } from '../common/app.error';
import { BadRequestError } from '../common/bad-request.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { AuthService } from '../services/auth.service';
import { FieldValidators } from '../validators/field.validators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public title = 'Sign up'
  public successMsg: String = ''
  public errorMsg: String = ''
  public loading = false


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
    this.loading = true
    this.errorMsg = ''
    this.successMsg = ''
    const { username, email, password } = this.form.value
    const data = {
      username, email, password
    }

    this.authService.signUp(data).subscribe((response: any) => {
      this.loading = false
      this.successMsg = response.message
    }, (error: AppError) => {
      this.loading = false
      switch (true) {
        case error instanceof NotFoundError:
          this.errorMsg = 'Not found'
          break;
        case error instanceof BadRequestError:
          this.errorMsg = error.originalError
          break
        case error instanceof NetWorkError:
          this.errorMsg = 'Network problem'
          break
        case error instanceof ServerError:
          this.errorMsg = 'Internal server error'
          break
        default:
          this.errorMsg = 'An error occured'
          break;
      }
    })
  }
}
