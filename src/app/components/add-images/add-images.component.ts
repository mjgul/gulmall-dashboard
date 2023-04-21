import { ChangeDetectionStrategy,ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { MediaService } from 'src/app/services/media/media.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AddItemService } from 'src/app/services/add-item.service';
@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AddImagesComponent implements OnInit {
  noImageTaken:boolean = false;
  imagesArray:any[] = []
  
  constructor(private popUpManager:PopUpManagerService,
    private addItem:AddItemService,
     private mediaService:MediaService,public sanitizer: DomSanitizer, private changeDetectorRef:ChangeDetectorRef) { }

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
    this.changeDetectorRef.markForCheck();
  }

  // upload images form gallery as file
  uploadImages = async() => {
    // GALLERY PHOTOS WILL BE SAVED IN images VARIABLE.
    let images = await this.mediaService.getLibraryImages();
    this.imagesArray = this.imagesArray.concat(images);
    console.log("IMAGES: ", this.imagesArray)
    this.changeDetectorRef.markForCheck();
    
    let imageObjects = await this.mediaService.uploadImages(this.imagesArray, 'post-images');
    this.addItem.setImageList(imageObjects)
  }


}
