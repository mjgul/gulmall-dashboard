import { Injectable } from '@angular/core';
import { getApp } from '@angular/fire/app'
import { ref, uploadBytesResumable,getStorage } from '@angular/fire/storage';

@Injectable({ 
  providedIn: 'root'
})
export class FirebaseStorageService {
  private readonly firebaseApp = getApp();
  private readonly storage = getStorage(this.firebaseApp, "gs://gul-e-mall-app.appspot.com");
  constructor() { 
      
      
  }

  uploadFile(blob:Blob,path:string) {
            console.log("PATH at the end", path);
            const storageRef = ref(this.storage,path);
            uploadBytesResumable(storageRef, blob);
}
}