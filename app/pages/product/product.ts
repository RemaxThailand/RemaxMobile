import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {

  global: any;
  sku: any;
  name: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.sku = this.navParams.get('sku');
    this.name = this.navParams.get('name');
  }

}
