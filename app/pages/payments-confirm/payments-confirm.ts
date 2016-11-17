import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/payments-confirm/payments-confirm.html',
})
export class PaymentsConfirmPage {

  global: any;
  orderNo: string;
  public base64Image: string;
  public now: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.orderNo = this.navParams.get('orderNo');
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

}
