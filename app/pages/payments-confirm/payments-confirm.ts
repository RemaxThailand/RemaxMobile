import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/payments-confirm/payments-confirm.html',
})
export class PaymentsConfirmPage {

  global: any;
  orderNo: string;
  base64Image: string;
  now: string;
  note: string;
  index: number;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.orderNo = this.navParams.get('orderNo');
    this.index = this.navParams.get('index');
    let now = new Date();
    this.now = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString();
  }

  takePicture(){
    console.log(this.now);
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1024,
        targetHeight: 768,
        correctOrientation: false,
        quality: 80
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }

  confirm() {
    let storage = new Storage(LocalStorage);

    storage.get('token').then((token) => {
      if (token == undefined || token == '') {
        this.global.socket.emit('access', { apiKey: this.global.apiKey });
      }
      else {
        this.global.socket.emit('api', {
          token: token,
          module: 'order',
          action: 'payment_confirm',
          orderNo: this.orderNo,
          bank: '123',
          date: this.now,
          note: this.note,
          photo: this.base64Image,
          index: this.index
        });
      }
    });

  }

}
