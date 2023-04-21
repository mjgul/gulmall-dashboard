import { ChangeDetectionStrategy,ChangeDetectorRef, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
import { MediaService } from 'src/app/services/media/media.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AddItemService } from 'src/app/services/add-item.service';
import { Color } from 'api-package';
import { Snap } from 'src/app/classes/snap';
@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss'],
  standalone:true,
  imports:[IonicModule,CommonModule],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AddImagesComponent implements OnInit {
  @Input() availableColors:Color[] = [];
  noImageTaken:boolean = false;
  imagesArray:Snap[] = []
  
  constructor(private popUpManager:PopUpManagerService,
    private addItem:AddItemService,
     private mediaService:MediaService,public sanitizer: DomSanitizer, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    console.log("AVAILABLE COLORS LIST", this.availableColors);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ON CHANGE OCCUR",changes)
    console.log("Available Colors",this.availableColors)
  }

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
   
    
    let imageObjects = await this.mediaService.uploadImages(images, 'post-images');
    imageObjects.forEach((img)=> this.imagesArray.push(img));
    console.log("IMAGES: ", imageObjects)
    this.changeDetectorRef.markForCheck();
    this.addItem.setImageList(this.imagesArray);
  }

  setImageColor(event:any,img:Snap){
      console.log(event.detail.value)
      img.setColor(event.detail.value);
  }


}
