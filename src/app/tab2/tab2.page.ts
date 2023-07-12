import { Component } from '@angular/core';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  photoPreview: string | undefined;
  location: string = '';
  text: string = '';

  constructor(private photoService: PhotoService, private postService: PostService) {}

  async takePhoto() {
    try {
      const photoData = await this.photoService.takePhoto();
      if (photoData) {
        this.photoPreview = `data:image/jpeg;base64,${photoData}`;
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  }

  savePost() {
    if (this.text && this.location && this.photoPreview) {
      const post = {
        text: this.text,
        location: this.location,
        photo: this.photoPreview
      };
      this.postService.savePost(post);
      this.resetForm();
    }
  }

  resetForm() {
    this.photoPreview = undefined;
    this.location = '';
    this.text = '';
  }
}
