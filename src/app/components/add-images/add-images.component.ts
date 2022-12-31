import { Component, OnInit } from '@angular/core';
import { PopUpManagerService } from '../../services/pop-up-manager.service';
@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss'],
})
export class AddImagesComponent implements OnInit {
  noImageTaken:boolean = false;
  imagesArray:any[] = ["../../../assets/test1.png","../../../assets/test2.png","../../../assets/test3.png"]
  
  constructor(private popUpManager:PopUpManagerService) { }

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


}
