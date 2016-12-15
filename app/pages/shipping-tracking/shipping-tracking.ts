import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, LoadingController } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

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


    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      if (token == undefined || token == '') {
        this.global.socket.emit('access', { apiKey: this.global.apiKey });
      }
      else {
        this.global.socket.emit('api', {
          token: token,
          module: 'curl',
          action: 'shipping',
          type: this.type,
          code: this.code,
          langCode: this.global.langCode
        });
      }
    });
    
    //this.launch('http://th.kerryexpress.com/th/track/?track=TAIT000064549');


  }

  launch(url) {
    InAppBrowser.open(url, '_blank');
  }

}
