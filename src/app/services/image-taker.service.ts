/**
 * (Type docs)
 *
 * @author Muhammad Junaid Gul <muhammad.gul.mi@outlook.com>
 */

/**
 * ANDROID
 * Use these in AndroidManifest.xml
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
 */

/**
 * IOS
 * use these in info.plist
 * NSCameraUsageDescription (Privacy - Camera Usage Description)
 * NSPhotoLibraryAddUsageDescription (Privacy - Photo Library Additions Usage Description)
 * NSPhotoLibraryUsageDescription (Privacy - Photo Library Usage Description)
 */
 import { Injectable } from '@angular/core';
 import {
   Camera,
   CameraDirection,
   CameraResultType,
   ImageOptions,
   GalleryImageOptions,
   GalleryPhoto,
   Photo,
   GalleryPhotos
 } from '@capacitor/camera';
 import { FileSystemService } from './file-system.service';
 import { Platform } from '@ionic/angular';
import { IgalleryImage } from '../interface/IgalleryImages';
 @Injectable({
   providedIn: 'root',
 })
 export class ImageTakerService {
   // MAXIMUM NUMBER OF IMAGES USER CAN SELECT.
   maximumImages: number = 20;
   // IMAGES COUNT FOR ANDROID.
   imagesCount: number = 0;
 
   // CAMERA OPTIONS
   private cameraOptions: ImageOptions = {
     quality: 100,
     resultType: CameraResultType.Uri,
     direction: CameraDirection.Rear,
     presentationStyle: 'popover',
     webUseInput: true,
   };
   // GALLERY OPTIONS
   private galleryOptions: GalleryImageOptions = {
     quality: 80,
     correctOrientation: true,
     presentationStyle: 'popover',
     limit: 20,
   };
 
   constructor(
     private fileSystem: FileSystemService,
     public platform: Platform
   ) {}
 
   /***
    * THIS FUNCTION TAKES IMAGE FROM CAM AND SENDS YOU DataUrl
    * @author JGS
    * @return {DataUrl}
    *
    */
   captureImage = async () => {
     const takeImage = await Camera.getPhoto(this.cameraOptions);
     return takeImage;
   };
 
   /**
    * THIS FUNCTION SENDS YOU ARRAY OF SELECTED IMAGES.
    * @returns Array of images/blob()
    *
    */
   getLibraryImages = async ():Promise<GalleryPhotos> => {
     const images:GalleryPhotos = await Camera.pickImages(this.galleryOptions);
     return images;
   };
 
   
 
 
   async readAsFile(photo: Photo[]) {
     console.log('PHOTOS: ', photo);
     let files: File[] = [];
     // Fetch the photo, read as a blob, then convert to base64 format
     for (let index = 0; index < photo.length; index++) {
       const response = await fetch(photo[index].webPath!);
       const blob = await response.blob();
       let file_Name =photo[index].webPath!.substring(photo[index].webPath!.lastIndexOf('/') + 1) +'.' +photo[index].format;
       const file = new File([blob], file_Name, { type: 'image/jpeg' });
       files.push(file);
     }
     return files;
   }
 
   /**
    * UPLOAD IMAGES AND RETURN RESPONSE
    * @param files File
    * @param entityId string
    *
    */
   uploadMultipleImages(files: File[], mediaType: string, entityId: string) {
     console.log('FILE: ', files);
   }
 
 /**
  * CHECKS THE PERMISSION AND RETURNS OBJECT
  * @returns {camera:string, photos:string}
  */
   async checkPermission(){
    const cam_gal_permission = await Camera.checkPermissions();
    return cam_gal_permission;
   }
 
 /**
  * REQUEST FOR THE PHOTOS AND RETURN STRING.
  * @returns string
  */
   requestForPhotosPermission = async () => {
   let result = (await Camera.requestPermissions()).photos;
   return result;
  }
 
  /**
  * REQUEST FOR THE CAMERA AND RETURN STRING.
  * @returns string
  */
   requestForGalleryPermission = async () => {
   let result = (await Camera.requestPermissions()).camera;
   return result;
  }
 
 }