import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BadRequestError } from '../common/bad-request.error';
import { ForbiddenError } from '../common/forbidden.error';
import { NetWorkError } from '../common/network.error';
import { NotFoundError } from '../common/not-found.error';
import { ServerError } from '../common/server.error';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,


  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.postId = params.get('postId')
      this.isLoading = true
      this.postService.fetchPost(this.postId).subscribe((response: any) => {
        this.isLoading = false
        this.post = response.item
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

    });
  }


  postId: any = ''
  post: any
  public successMsg: String = ''
  public errorMsg: String = ''
  public isLoading: Boolean = false


}
