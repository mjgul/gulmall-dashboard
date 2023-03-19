import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { MediaService } from 'src/app/services/media/media.service';
@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss'],
})
export class AddImagesComponent implements OnInit {
  noImageTaken:boolean = false;
  imagesArray:any[] = []
  
  constructor(private popUpManager:PopUpManagerService, private mediaService:MediaService,public sanitizer: DomSanitizer) { }

  ngOnInit() {}

  async deleteImage(imageIndex:number){
    
  let result = await this.popUpManager.deleteItem('Deleting Image','Are you sure you want to delete this image ?')
  console.log("result", result)
  if(result.role === 'destructive'){
    this.removeImageFromImagesArray(imageIndex);
  } else {
    return;
  }
  }

  // FIND INDEX AND REMOVE IT FROM ARRAY.
  removeImageFromImagesArray(index:number){
    this.imagesArray.splice(index,1);
  }

  // upload images form gallery as file
  uploadImages = async() => {
    // GALLERY PHOTOS WILL BE SAVED IN images VARIABLE.
    let images = await this.mediaService.getLibraryImages();
    console.log("IMAGES: ", images)
    this.imagesArray = this.imagesArray.concat(images);
    this.mediaService.uploadImages(this.imagesArray, 'post-images');
  }


}
