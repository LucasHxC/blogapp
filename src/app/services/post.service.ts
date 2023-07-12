import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: any[] = [];

  constructor() {}

  savePost(post: any) {
    this.posts.unshift(post); // Add the new post to the beginning of the array
  }

  getPosts() {
    return this.posts;
  }
}
