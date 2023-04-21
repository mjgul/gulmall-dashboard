import { Icategory, Image } from 'api-package';
import { Category, ChildSubCategory, SubCategory } from 'api-package/lib/classes/generic/categoty';
import { Console } from 'console';

export class AddItem {
  private item_id: string = null;
  private price: number = null;
  private quantity: number = null;
  private available_color: string[] = [];
  private available_size: string[] = [];
  private size_chart: string = null;
  private gender: string = null;
  private category:Category;
  private sub_category: SubCategory;
  private item:ChildSubCategory;
  private currency: string = null;
  private name: string = null;
  //private status:string = "pending";
  private images: Image[] = [];

  public constructor() {
    console.log('ADDING ITEM');
  }

  /**
   * GET SUB CAT CHILD ID AND SET IT.
   * @param sub_cat_child_id
   */
  protected setItemId(sub_cat_child_id: string) {
    if (sub_cat_child_id != undefined || sub_cat_child_id != null) {
      this.item_id = sub_cat_child_id;
    } else {
      throw new Error('ITEM ID IS UNDEFINED **');
    }
  }

  /**
   * SET THE PRICE.
   * @param price
   */
  protected setPrice(price: number) {
    if (price > 0) {
      this.price = price;
    } else {
      throw new Error('PRICE IS UNDEFINED **');
    }
  }

  /**
   * PUSH THE SELECTED COLOR TO ARRAY.
   * @param colorId
   */
  protected setAvailableColor(colorId: string) {
    if (colorId != null || colorId != undefined) {
      this.available_color?.push(colorId);
    } else {
      throw new Error('COLOR ID IS NOT DEFINED **');
    }
  }

  /**
   * SET THE GENDER
   * @param gender
   */
  protected setGender(gender: string) {
    if (gender != null || gender != undefined) {
      this.gender = gender;
    } else {
      throw new Error('GENDER IS NOT DEFINED **');
    }
  }

  /**
   * TAKES THE CATEGORY ID AND SET AGAINST THE ITEM.
   * @param categoryId string
   */
  protected setCategory(category: Category) {
    console.log("CATEGORY: ", category)
    if (category != null || category != undefined) {
      this.category = category;
    } else {
      throw new Error('CATEGORY ID IS NOT DEFINED **');
    }
  }
  /**
   * TAKES THE SUB CATEGORY AND SET AGAINST ITEM
   * @param subCatId string
   */
  protected setSubCategory(subCat: SubCategory) {
    if (subCat != null || subCat != undefined) {
      this.sub_category = subCat;
    } else {
      throw new Error('SUB CATEGORY ID IS NULL **');
    }
  }

   /**
   * TAKES THE SUB CATEGORY ID AND SET AGAINST ITEM
   * @param subCatId string
   */
    protected setItem(item: ChildSubCategory) {
      if (item != null || item != undefined) {
        this.item = item;
      } else {
        throw new Error('ITEM CATEGORY IS NULL **');
      }
    }

  /**
   * TAKES THE SIZE ID AND SET AGAINST THE ITEM.
   * @param sizeId string
   */
  protected setAvailableSize(sizeId: string) {
    if (sizeId != null || sizeId != undefined) {
      this.available_size?.push(sizeId);
    } else {
      throw new Error('SIZE IS NOT DEFINED.**');
    }
  }

  /**
   * TAKES THE SIZE CHART ID AND SETS AGAINST ITEM
   * @param chartId string
   */
  protected setSizeChartId(chartId: string) {
    if (chartId != null || chartId != undefined) {
      this.size_chart = chartId;
    } else {
      throw new Error('CART CHILD ID IS NOT DEFINED. **');
    }
  }

  /**
   * TAKES CURRENCY AS STRING AND SETS AGAINS ITEM
   * @param currency string
   */
  protected setCurrency(currency: string) {
    if (currency != null || currency != undefined) {
      this.currency = currency;
    } else {
      throw new Error('CURRENCY IS NOT DEFINED. **');
    }
  }

  /**
   * TAKES THE QUANTITY AS NUMBER AND SETS AGAINST THE ITEM.
   * @param quantity number
   */
  protected setQuantity(quantity: number) {
    if (quantity > 0) {
      this.quantity = quantity;
    } else {
      throw new Error('QUANTITY CAN NOT BE ZERO ***');
    }
  }

  /**
   * TAKES ITEM TITLE AS STRING AND SETS AGAINST ITEM
   * @param name string
   */
  protected setName(name: string) {
    if (name != null || name != undefined) {
      this.name = name;
    } else {
      throw new Error('NAME IS EMPTY ***');
    }
  }

  /**
   * TAKES IMAGES ARRAY AS IMAGE AND SETS AGAINS ITEM.
   * @param images Image
   */
  protected setImages(images: Image[]) {
    if (images.length > 0) {
      this.images = images;
    } else {
      throw new Error('IMAGES ARE EMPTY ***');
    }
  }

  public getItemImages = (): Image[] => {
    return this.images;
  };

  public getItemName = (): string => {
    return this.name;
  };

  public getItemCurrency = (): string => {
    return this.currency;
  };

  public getItemSubCategory = (): SubCategory => {
    return this.sub_category;
  };

  public getItemCategory = (): Category => {
    return this.category;
  };

  public getItemGender = (): string => {
    return this.gender;
  };

  public getItemSizeChart = (): string => {
    return this.size_chart;
  };

  public getItemAvailableSizeList = (): string[] => {
    return this.available_size;
  };

  public getItemAvailableColorList = (): string[] => {
    return this.available_color;
  };

  public getItemQuantity = (): number => {
    return this.quantity;
  };

  public getItemPrice = (): number => {
    return this.price;
  };

  public getItemId = (): string => {
    return this.item_id;
  };

  public getItem = ():ChildSubCategory=>{
    return this.item
  }

  public printItemObject = () => {
    console.log(`*********************************************`)
    console.log(`* Category ${this.getItemCategory()}        \t\t*`)
    console.log(`* SUB CATEGORY ${this.getItemSubCategory()} \t\t*`)
    console.log(`* SUB CATEGORY CHILD ${this.getItemId()}    \t\t*`)
    console.log(`* GENDER ${this.getItemGender()}            \t\t*`)
    console.log(`* SIZE ${this.getItemAvailableSizeList()}   \t\t*`)
    console.log(`* COLOR ${this.getItemAvailableColorList()} \t\t*`)
    console.log(`* TITLE ${this.getItemName()}               \t\t*`)
    console.log(`* Quantity ${this.getItemQuantity()}        \t\t*`)
    console.log(`* PRICE ${this.getItemPrice()}              \t\t*`)
    console.log(`* CURRENCY ${this.getItemCurrency()}        \t\t*`)
    console.log(`*********************************************`)
    // ALL STRING/NUMBER VALUES CHECK WILL BE IN THIS VARIABLE.
    let mandatoryFields = [
        {key:"Sub_CAT_CHILD_ID",value:this.item_id},
        {key:"PRICE",value:this.price},
        {key:"QUANTITY",value:this.quantity},
        {key:"SIZE_CHART_ID",value:this.size_chart},
        {key:"GENDER",value:this.gender},
        {key:"CATEGORY_ID",value:this.category},
        {key:"SUB_CATEGORY_ID",value:this.sub_category},
        {key:"CURRENCY",value:this.currency},
        {key:"TITLE",value:this.name}];
    
    let emptyFields = mandatoryFields.filter(x=>x.value == null || x.value == undefined);
        console.log("RESULT:" ,emptyFields);

    // ALL ARRAY TYPE VALUES CHECK WILL BE IN THIS VARIABLE.
    let arrayTypeFields =[{key:"AVAILABLE_COLOR", value:this.available_color},{key:"AVAILABLE_SIZE",value:this.available_size},{key:"IMAGES", value:this.images}];
    let emptyFieldsArray = arrayTypeFields.filter(x=> x.value.length === 0);
        console.log("RESULT:" ,emptyFieldsArray);
    
  }

  validataItemPayload=()=>{
    let mandatoryFields = [
        {key:"Sub_CAT_CHILD_ID",value:this.item_id},
        {key:"PRICE",value:this.price},
        {key:"QUANTITY",value:this.quantity},
        {key:"SIZE_CHART_ID",value:this.size_chart},
        {key:"GENDER",value:this.gender},
        {key:"CATEGORY_ID",value:this.category},
        {key:"SUB_CATEGORY_ID",value:this.sub_category},
        {key:"CURRENCY",value:this.currency},
        {key:"TITLE",value:this.name}];
        let emptyFields = mandatoryFields.filter(x=>x.value == null || x.value == undefined);
        console.log("RESULT:" ,emptyFields);
        let arrayTypeFields =[{key:"AVAILABLE_COLOR", value:this.available_color},{key:"AVAILABLE_SIZE",value:this.available_size},{key:"IMAGES", value:this.images}];
        let emptyFieldsArray = arrayTypeFields.filter(x=> x.value.length === 0);
    console.log("RESULT:" ,emptyFieldsArray);
    if(emptyFields.length === 0 && emptyFieldsArray.length === 0){
        return {status:true,message:"Validation Success"};
    } else {
        return {status:false};
    }
  }
}
