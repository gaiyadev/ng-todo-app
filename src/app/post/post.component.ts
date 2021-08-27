import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppError } from '../common/app.error';
import { BadRequestError } from '../common/bad-request.error';
import { ForbiddenError } from '../common/forbidden.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private router: Router,
    private postService: PostService
  ) { }

  ngOnInit(): void {

  }

  public posts = []
  public title1 = 'Add Post'
  public successMsg: String = ''
  public errorMsg: String = ''
  public loading: Boolean = false

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(299)
    ]),
    body: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(2000)
    ])
  })
  get title(): any {
    return this.form.get('title')
  }
  get body(): any {
    return this.form.get('body')
  }

  createPost() {
    this.loading = true
    this.errorMsg = ''
    this.successMsg = ''
    const { title, body } = this.form.value
    const data = {
      title, body
    }
    this.postService.createPost(data).subscribe((response: any) => {
      this.loading = false
      this.successMsg = response.message
    }, (error: AppError) => {
      this.loading = false
      switch (true) {
        case error instanceof NotFoundError:
          this.errorMsg = 'Resource not found'
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
        case error instanceof ForbiddenError:
          this.errorMsg = error.originalError
          localStorage.clear()
          this.router.navigate(['/signin'])
          break
        default:
          this.errorMsg = 'An error occured'
          break;
      }

    })
  }

  updatePost() { }

  deletePost() { }

  fetchPosts() { }

  fetchPost() { }

}
