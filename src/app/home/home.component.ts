import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BadRequestError } from '../common/bad-request.error';
import { ForbiddenError } from '../common/forbidden.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) { }


  ngOnInit() {
    this.isLoading = true
    this.postService.fetchAllPost().subscribe((response: any) => {
      this.isLoading = false
      this.posts = response.notes
    }, (error: Error | any) => {
      this.isLoading = false
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
        default:
          this.errorMsg = 'An error occured'
          break;
      }
    })
  }
  public successMsg: String = ''
  public errorMsg: String = ''
  public loading: Boolean = false
  public isLoading: Boolean = false
  public posts: any[] = []
  title = "All blog posts"
  subTitle = "Latest news"
}
