import { Injectable } from '@angular/core';

//Camera thingz
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {

  photos: UserPhoto;

  constructor() { }

  async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos = {
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}