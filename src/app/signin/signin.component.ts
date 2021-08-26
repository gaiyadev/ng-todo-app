import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app.error';
import { BadRequestError } from '../common/bad-request.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  public title = "Sign in"
  public successMsg: String = ''
  public errorMsg: String = ''
  public loading = false

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(10)
    ])
  })
  get email(): any {
    return this.form.get('email')
  }
  get password(): any {
    return this.form.get('password')
  }

  onSubmit() {
    this.loading = true
    this.errorMsg = ''
    this.successMsg = ''

    const { email, password } = this.form.value
    const data = {
      email, password
    }

    this.authService.signIn(data).subscribe((response: any) => {
      this.loading = false

      const { token } = response;
      const { _id, email, username } = response.user;

      const user = {
        _id,
        email,
        username
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      this.successMsg = response.message
      // redirect
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
      this.router.navigate([returnUrl || '/dashboard'])
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
