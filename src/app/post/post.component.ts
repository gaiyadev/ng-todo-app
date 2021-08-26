import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  posts: any[] = []
  public title = 'Add Post'
  public successMsg: String = ''
  public errorMsg: String = ''
  public loading: Boolean = false

  createPost() { }

  updatePost() { }

  deletePost() { }

  fetchPosts() { }

  fetchPost() { }

}
