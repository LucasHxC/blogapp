import { Component } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ionViewDidEnter() {
    this.posts = this.postService.getPosts();
  }
}
