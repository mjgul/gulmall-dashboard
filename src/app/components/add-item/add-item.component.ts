import { Component, OnInit } from '@angular/core';
import { CategoriesService, Icategory, IchildSubCat, IsubCategory,TypeSizeService } from 'api-package';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  public allCategories: Observable<Icategory[]> | undefined;
  public allSubCategories: Observable<IsubCategory[]> | undefined;
  public childSubCategories:Observable<IchildSubCat[]> | undefined;
  public itemAvailableSize:Observable<any>|undefined;

  constructor(private category:CategoriesService, private typeSize:TypeSizeService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories = async()=>  {
    this.allCategories = await this.category.getAllCategories();
    this.allCategories.subscribe((res:any)=>{
      console.log(res)
    })
  }

  getSubCategory = async (categoryId:string)=> {
    this.allSubCategories = await this.category.getSubCategoryByCategoryId(categoryId);
  }

  getSubCatChild = async (subCatId:string) => {
    this.childSubCategories = await this.category.getChildBySubCategoryId(subCatId);
  }

  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectCategory = (event:any):void => {
    let value:string = event.detail.value;
    // GETTING SUB CATEGORIES OF ITEM.
    this.getSubCategory(value);
  }
  /**
   * ON SELECTING CATEGORY THIS FUNCTION GETS CALLED
   * USING ID- MONGODB ID AND SETTING IT FOR CALLING SUB-CATEGORY.
   */
  onSelectSubCat(event:any):void{
    let value:string = event.detail.value;
    this.getSubCatChild(value);
  }

}
