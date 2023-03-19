// Copyright 2010 Google LLC
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

import { BlobStorageService } from 'src/app/services/azure/blob-storage.service';
import { Injectable } from '@angular/core';
import {
  Camera,
  CameraDirection,
  CameraResultType,
  ImageOptions,
  GalleryImageOptions,
  GalleryPhoto,
  Photo,
} from '@capacitor/camera';
import { FileService } from 'src/app/services/file/file.service';
import { Platform } from '@ionic/angular';
import { Snap } from '../../classes/snap';
import { Capacitor } from '@capacitor/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MediaService {
  // MAXIMUM NUMBER OF IMAGES USER CAN SELECT.
  private maximumImages: number = 20;
  // IMAGES COUNT FOR ANDROID.
  imagesCount: number = 0;

  public imageObject: Snap[] = [];
  // CAMERA OPTIONS
  private cameraOptions: ImageOptions = {
    quality: 40,
    resultType: CameraResultType.Uri,
    direction: CameraDirection.Rear,
    presentationStyle: 'popover',
    webUseInput: true,
  };
  // GALLERY OPTIONS
  private galleryOptions: GalleryImageOptions = {
    quality: 60,
    correctOrientation: true,
    presentationStyle: 'fullscreen',
    limit: 20,
    width: 800,
    height: 600,
  };

  constructor(
    private fileSystem: FileService,
    public platform: Platform,
    private blobStorage: BlobStorageService
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
  getLibraryImages = async () => {
    const images = await Camera.pickImages(this.galleryOptions);
    return images.photos;
  };

  // UPLOAD IMAGES TO THE SERVER
  /**
   * @param images GalleryPhoto
   * @param mediaType string
   * @param entity_id string
   */

  async uploadImages(
    images: GalleryPhoto[] | Photo[],
    mediaType: string,
    addOrUpdate?: string,
    oldPath?: string
  ) {
    if (this.platform.is('hybrid')) {
      console.log('IMAGES HYBRID: ',images );
      await this.uploadImagesFromPhone(images, mediaType, addOrUpdate, oldPath);
    } else {
      await this.readAsFile(images, addOrUpdate, oldPath);
      console.log('IMAGES WEB: ', images);
      console.log('*** IMAGE OBJECT WEB ===> : ', this.imageObject);
    }
    return this.imageObject;
  }

  private async uploadImagesFromPhone(images:any, mediaType:string, addOrUpdate?:string, oldPath?:string) {
    let _blobArray: any[] = [];
    for (var i = 0; i < images?.length; i++) {
      let file_Name = images[i]?.path?.substring(
        images[i].path?.lastIndexOf('/') + 1
      );
      this.imagesCount++;
      if (this.imagesCount <= this.maximumImages) {
        let data: any = await this.fileSystem?.readFile(
          { path: images[i].path },
          file_Name
        );
        _blobArray?.push(data);
      } else {
        return _blobArray;
      }
    }
    this.imagesCount = 0
    console.log('BLOB ARRAY: ', _blobArray);
    return this.readAsFile(_blobArray, addOrUpdate, oldPath);
  }

  async readAsFile(photo: any, addOrUpadate?: string, oldPath?: string) {
    let files: Blob[] = [];
    this.imageObject = [];
    console.log('PHOTOS: ', photo);
    // Fetch the photo, read as a blob, then convert to base64 format
    for (let index = 0; index < photo.length; index++) {
      let blob: Blob;
      if (!this.platform.is('hybrid')) {
        // IN CASE OF WEB
        const response = await fetch(photo[index].webPath);
        blob = await response.blob();
      } else {
        blob = photo[index];
      }
      let file_name: string = '';
      if (this.platform.is('hybrid')) {
        // IN CASE OF PHONE
        let indexes = photo[index].type.split('/');
        let extension = indexes[indexes.length - 1];
        file_name = `${Math.floor(Math.random() * 999999)}.${extension}`;
      } else {
        // IN CASE OF WEB
        file_name = `${Date.now().toString()}.${photo[index].format}`;
      }
      if (addOrUpadate === 'edit-post') {
        // EDIT IMAGE OR EDIT POST SECTION SECTION
        let path = `${oldPath}/${localStorage.getItem('post_public_id')}/gul-e-mall-oman-cloth-for-sale-${localStorage.getItem('post_public_id')}-${file_name}`; // public post if of post.
        // MAKE IMAGE URL
        let url: string = `${environment.azureAccountName}/${oldPath}/${localStorage.getItem('post_public_id')}/gul-e-mall-oman-cloth-for-sale-${localStorage.getItem('post_public_id')}-${file_name}`; // public post id of post
        this.imageObject.push(
          new Snap(
            file_name,
            blob,
            url,
            path.slice(path.indexOf('/') + 1),
            photo[index].webPath
          )
        );
      } else {
        // NEW IMAGE UPLOAD
        let date = new Date().toISOString().split('T')[0];
        let year = date.split('-')[0]; // 2023
        let month = date.split('-')[1]; // 01
        let day = date.split('-')[2]; // 21
        let path = `${year}/${month}/${day}/${localStorage.getItem('post_public_id')}/gul-e-mall-oman-cloth-for-sale-${localStorage.getItem('post_public_id')}-${file_name}`; // public post if of post.
        let url: string = `${environment.azureAccountName}/posts/${year}/${month}/${day}/${localStorage.getItem('post_public_id')}/gul-e-mall-oman-cloth-for-sale-${localStorage.getItem('post_public_id')}-${file_name}`; // public post id of post
        this.imageObject.push(
          new Snap(file_name, blob, url, path, photo[index].webPath)
        );
      }

      //this.blobStorage.uploadImage(blob,file_name)

      console.log('Web Path: ', photo[index].webPath);
      console.log('POST IMAGE OBJECT: ', this.imageObject);
    }

    return files;
  }

  /**
   * UPLOAD IMAGES AND RETURN RESPONSE
   */
  uploadMultipleImages(entity_id: string) {
    if (this.imageObject.length != 0) {
      this.blobStorage.uploadImage(this.imageObject, entity_id);
    }
    this.imageObject = [];
  }

  /**
   * CHECKS THE PERMISSION AND RETURNS OBJECT
   * @returns {camera:string, photos:string}
   */
  async checkPermission() {
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
  };

  /**
   * REQUEST FOR THE CAMERA AND RETURN STRING.
   * @returns string
   */
  requestForGalleryPermission = async () => {
    let result = (await Camera.requestPermissions()).camera;
    return result;
  };


}
