import { Injectable } from '@angular/core';
import { AddItem } from 'src/app/classes/addItem';
import { Image } from 'api-package'
import { Snap } from '../classes/snap';
import { FirebaseStorageService } from 'src/app/services/firebase-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AddItemService extends AddItem {

  constructor(private storageService:FirebaseStorageService) {
    super();
  }

  /**
   * TAKES THE CAT ID AND SETS TO ITEM
   * @param categoryId string
   */
  setItemCategory=(categoryId:string):void=>{
    this.setCategory(categoryId);
  }

   /**
   * TAKES THE SUB CAT ID AND SETS TO ITEM
   * @param subCategoryId string
   */
  setItemSubCategoryId=(subCategoryId:string):void=>{
    this.setSubCategory(subCategoryId)
  }

  /**
   * TAKES THE SUB CAT CHILD ID AND SETS TO ITEM
   * @param subCategoryChildId string
   */
  setItemSubCategoryChildId=(subCategoryChildId:string):void=>{
    this.setItemId(subCategoryChildId);
  }

  /**
   * TAKES THE GENDER ID AND SET IN 
   * @param gender string
   */
  setItemGender=(gender:string):void=>{
    this.setGender(gender);
  }

  /**
   * TAKES THE SIZE ID OF THE SIZE AND PUSHES IN ARRAY
   * @param availableSize string
   */
  setItemAvailableSize=(availableSize:string):void =>{
    this.setAvailableSize(availableSize);
  }

  /**
   * TAKES THE COLOR ID OF THE COLOR AND PUSH IN ARRAY
   * @param availableColor string
   */
  setItemAvailableColor=(availableColor:string):void=>{
    this.setAvailableColor(availableColor);
  }

  /**
   * TAKE THE QUANTITY AS NUMBER MUST BE GREATER THAN 0
   * @param quantity number
   */
  setItemQuantity=(quantity:number):void=>{
    this.setQuantity(quantity);
  }

  /**
   * TAKE THE PRICE AS NUMBER MUST BE GREATER THAN 0
   * @param price number
   */
  setItemPrice=(price:number):void=>{
    this.setPrice(price);
  }

  /**
   * TAKES THE STRING TYPE OF CURRENCY
   * @param currency string
   */
  setItemCurrency=(currency:string):void=>{
    this.setCurrency(currency);
  }

  /**
   * SET IMAGE OBJECT FOR ADDING ITEM
   * @param images Image
   */
  setItemImages=(images:Image[]):void=>{
    this.setImages(images);
  }

  /**
   * UPLOADS IMAGES TO FIREBSE STORAGE.
   * @param images Snap[]
   */
  uploadImages=(images:Snap[])=>{
    images.forEach(x=>{
      this.storageService.uploadFile(x.file,x.path);
    })
    
  }

  setItemTitle=(title:string)=>{
  this.setName(title);
  }

}
