import { Component } from '@angular/core';
import { NavController, NavParams, LocalStorage, Storage, LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {

  global: any;
  sku: any;
  name: any;
  slideOptions: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController) {
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

  addCart(sku){
    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'cart_update',
        sku: this.sku,
        qty: 1
      });
    });
  }

}
