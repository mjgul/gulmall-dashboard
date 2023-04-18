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

  uploadFile(blob:Blob,file_name:string) {
            const storageRef = ref(this.storage,`OMAN/1001_MUHAMMAD_97022005/FASHION/MEN WESTERN WEAR/JUBBA/90/${file_name}`);
            uploadBytesResumable(storageRef, blob);
}
}