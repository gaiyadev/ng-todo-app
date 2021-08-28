import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppError } from '../common/app.error';
import { BadRequestError } from '../common/bad-request.error';
import { ForbiddenError } from '../common/forbidden.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    public postService: PostService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.postService.fetchPosts().subscribe((response: any) => {
      this.loading = false
      this.posts = response.notes
    }, (error: Error | any) => {
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
          // this.errorMsg = error.originalError
          localStorage.clear()
          this.router.navigate(['/signin'])
          break
        default:
          this.errorMsg = 'An error occured'
          break;
      }
    })
  }

  public posts: any = []
  public title1 = 'Add Post'
  public successMsg: String = ''
  public errorMsg: String = ''
  public loading: Boolean = false

  deletePost(id: string) {
    this.loading = true
    this.errorMsg = ''
    this.successMsg = ''
    this.postService.deletePost(id).subscribe((response: any) => {
      this.loading = false
      this.successMsg = response.message
      // reload the page
      let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
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
}
