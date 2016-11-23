import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage } from 'ionic-angular';

/*
  Generated class for the PaymentsDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/payments-detail/payments-detail.html',
})
export class PaymentsDetailPage {

  global: any;
  orderNo: string;
  base64Image: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.orderNo = this.navParams.get('orderNo');

    console.log( this.orderNo );

    /*## รายละเอียดการชำระเงิน ##*/
    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'payment_data',
        orderNo: this.orderNo
      });
    });
  }

  back(){
    this.navCtrl.pop();
  }

}
