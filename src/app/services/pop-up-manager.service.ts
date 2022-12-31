import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopUpManagerService {

  constructor(private actionSheet:ActionSheetController) { }

  // DELETE ACTION SHEET
  async deleteItem(header:string,subHeader:string){
    const actionSheet = await this.actionSheet.create({
      header: header,
      subHeader: subHeader,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    return result;
  }


}
