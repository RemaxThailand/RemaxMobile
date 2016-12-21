import { Component } from '@angular/core';
import { NavController, NavParams, LocalStorage, Storage } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/shopping/shopping.html',
})
export class ShoppingPage {

  viewType: string;
  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');

    this.viewType = 'box';

    let storage = new Storage(LocalStorage);
    storage.get('shopping-viewType').then((viewType) => {
      if(viewType == null) {
        storage.set('shopping-viewType', this.viewType);
      }
      else {
        this.viewType = viewType;
      }
    });

    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'product',
        action: 'top_4_by_category'
      });
    });

  }

  changeView(viewType){
    this.viewType = viewType;
    let storage = new Storage(LocalStorage);
    storage.set('shopping-viewType', this.viewType);
  }

}
