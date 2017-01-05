import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/add-to-cart/add-to-cart.html',
})
export class AddToCartPage {

  global: any;
  sku: string;
  detail: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.global = this.navParams.get('global');
    this.sku = this.navParams.get('sku');
    this.detail = this.navParams.get('detail');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
