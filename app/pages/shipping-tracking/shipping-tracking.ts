import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, LoadingController } from 'ionic-angular';

/*
  Generated class for the ShippingTrackingPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/shipping-tracking/shipping-tracking.html',
})
export class ShippingTrackingPage {

  global: any;
  type: string;
  code: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController) {
    this.global = this.navParams.get('global');
    this.type = this.navParams.get('type');
    this.code = this.navParams.get('code');

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
        module: 'curl',
        action: 'shipping',
        type: this.type,
        code: this.code,
        langCode: this.global.langCode
      });
    });
  }

}
