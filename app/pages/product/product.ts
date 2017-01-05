import { Component } from '@angular/core';
import { NavController, NavParams, LocalStorage, Storage, LoadingController, ModalController } from 'ionic-angular';
import { AddToCartPage } from '../../pages/add-to-cart/add-to-cart';

@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {

  global: any;
  sku: any;
  name: any;
  slideOptions: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
    this.global = this.navParams.get('global');
    this.sku = this.navParams.get('sku');
    this.name = this.navParams.get('name');

    this.slideOptions = {
      autoplay: 2000,
      loop: true,
      pager: true
    };
    
    this.global.subData = {};    
    this.global.isLoaded = false;
    let loader = this.loadingCtrl.create({
      content: this.global.message.pleaseWait+"...",
    });
    loader.present();

    var timer = setInterval(() => {
      if(this.global.isLoaded) {
        clearInterval(timer);
        loader.dismiss();
      }
    }, 500);

    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'product',
        action: 'info',
        sku: this.sku
      });
    });

  }

  addCart(sku, detail){
    let modal = this.modalCtrl.create(AddToCartPage, {
      global: this.global,
      sku: sku,
      detail: detail
    });
    modal.present();
    /*let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'cart_update',
        sku: this.sku,
        qty: 1
      });
    });*/
  }

}
