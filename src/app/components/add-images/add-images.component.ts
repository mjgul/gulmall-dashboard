import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { ImageTakerService } from '../../services/image-taker.service';
@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss'],
})
export class AddImagesComponent implements OnInit {
  noImageTaken:boolean = false;
  imagesArray:any[] = []
  
  constructor(private popUpManager:PopUpManagerService, private imageTaker:ImageTakerService,public sanitizer: DomSanitizer) { }

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
    let images = await this.imageTaker.getLibraryImages();
    images.photos.forEach((x)=> this.imagesArray.push(this.sanitizer.bypassSecurityTrustUrl(x.webPath)));
    console.log(images.photos)
  }


}
