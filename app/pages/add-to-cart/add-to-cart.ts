import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Storage, LocalStorage } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/add-to-cart/add-to-cart.html',
})
export class AddToCartPage {

  global: any;
  sku: string;
  detail: any;
  qty: number = 1;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.global = this.navParams.get('global');
    this.sku = this.navParams.get('sku');
    this.detail = this.navParams.get('detail');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  updateQty(qty) {
    this.qty = Number(this.qty)+qty;
    if(this.qty == 0) {
      this.qty = 1;
    }
  }

  confirm() {
    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'cart_update',
        sku: this.sku,
        qty: this.qty
      });
    });
    this.viewCtrl.dismiss();
  }

}
