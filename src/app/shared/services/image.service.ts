import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private storage: AngularFireStorage) { }

  uploadImage(path: string, file: File){
    return this.storage.upload(path, file)
  }

  loadImage(path: string){
    return this.storage.ref(path)
  }

}
