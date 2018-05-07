import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';

import { ShoppingItem } from '../../models/shopping-item/shopping-item.interface';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private database: AngularFireDatabase,
              private actionSheetCtrl: ActionSheetController ) {
    this.shoppingListRef$ = this.database.list('shopping-list');
    // this.shoppingListRef$.subscribe(x => console.log(x));
  }

  selectShoppingItem(shoppingItem: ShoppingItem){
    this.actionSheetCtrl.create({
      title: `${shoppingItem.itemName}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.navCtrl.push('EditShoppingItemPage', { shoppingItemId: shoppingItem.$key });
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.shoppingListRef$.remove(shoppingItem.$key)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log("The user has selected cancel button");
          }
        }
      ]
    }).present();
  }

  navigateToAddShoppingPage(): void {
    this.navCtrl.push('AddShoppingPage');
  }

}
