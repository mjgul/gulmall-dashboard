import { Injectable } from '@angular/core';
import { AddItem } from 'src/app/classes/addItem';
import { Image } from 'api-package'
import { Snap } from '../classes/snap';
import { Category, ChildSubCategory, SubCategory } from 'api-package/lib/classes/generic/categoty';
import { FirebaseStorageService } from './firebase-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AddItemService extends AddItem {
  private imagesList:Snap[] = [];
  private country:string = 'OMAN';
  private userId:string = "1001";
  private userName:string = "Muhammad";
  private userPhone:string = "96897022005";
  private draftItemId:string = "2";
  constructor(private storageService:FirebaseStorageService) {
    super();
  }

  /**
   * TAKES THE CAT AND SETS TO ITEM
   * @param category string
   */
  setItemCategory=(category:Category):void=>{
    this.setCategory(category);
  }

   /**
   * TAKES THE SUB CAT ID AND SETS TO ITEM
   * @param subCategoryId string
   */
  setItemSubCategoryId=(subCat:SubCategory):void=>{
    this.setSubCategory(subCat)
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
   * 
   */
  uploadImages=()=>{
    this.imagesList.forEach((img)=>{
      console.log("PATH: ", img.path);
      this.storageService.uploadFile(img.file,img.path);
    })
    
  }

  setImageList=(images:Snap[])=>{
    this.imagesList = images;
    console.log("IMAGES has been set ++: ", this.imagesList)
  }

  setItemChild = (item:ChildSubCategory)=>{
    this.setItem(item);
  }

  setImagePath=()=>{
    console.log("PATH SETTING ")
    this.imagesList.forEach((img)=>{
      img.makeImagePath(this.country,
        this.userId,this.userName,
        this.userPhone,
        this.getItemCategory().getName(),
        this.getItemSubCategory().getName(),
        this.getItem().getName(),
        this.getItem().getId(),
        this.draftItemId
        )
    })
  }

  setItemTitle=(title:string)=>{
  this.setName(title);
  }

}
