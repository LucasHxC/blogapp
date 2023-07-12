import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private photo_storage = 'photos';

  constructor(private postService: PostService) {}

  private async convertBase64(photo: Photo): Promise<string | null> {
    if (photo.webPath) {
      const res = await fetch(photo.webPath);
      const blob = await res.blob();

      return await this.convertBlobTo64(blob) as string;
    }
    return null;
  }

  private convertBlobTo64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  }

  private async saveToDevice(photo: Photo): Promise<UserPhoto | undefined> {
    const base64data = await this.convertBase64(photo);
    if (base64data) {
      const filename = `Picture taken at ${new Date().getTime()}.jpeg`;
      const savedFile = await Filesystem.writeFile({
        path: filename,
        data: base64data,
        directory: Directory.Data
      });
      console.log(filename);
      console.log(savedFile);
      return {
        filepath: filename,
        webviewPath: photo.webPath
      };
    }
    return undefined;
  }

  async takePhoto(): Promise<string | undefined> {
    if (!Capacitor.isPluginAvailable('Camera')) {
      throw new Error('Camera plugin not available.');
    }
  
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 80
    });
  
    return photo.base64String;
  }

  async savePhoto() {
    try {
      const photoData = await this.takePhoto();
      if (photoData) {
        const photo: Photo = {
          webPath: '',
          base64String: photoData,
          format: 'jpeg',
          saved: false
        };
        const savedPhoto = await this.saveToDevice(photo);

        const post = {
          text: 'Your text',
          location: 'Your location',
          photo: savedPhoto
        };

        this.postService.savePost(post);
      }
    } catch (error) {
      console.log('Error taking photo:', error);
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
