import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, LoadingController } from 'ionic-angular';
import { PaymentsConfirmPage } from '../../pages/payments-confirm/payments-confirm';
import { PaymentsDetailPage } from '../../pages/payments-detail/payments-detail';
import { ShippingTrackingPage } from '../../pages/shipping-tracking/shipping-tracking';

@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {

  global: any;
  page: number = 1;
  perPage: number = 25;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController) {
    this.global = this.navParams.get('global');

    //this.global.data = {};
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

    /*## ประวัติคำสั่งซื้อ ##*/
    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'history'
      });

      this.global.socket.emit('api', {
        token: token,
        module: 'bank',
        action: 'data'
      });
    });
  }

  viewDetail(orderNo) {
    this.navCtrl.push(this.global.screen.orderDetail.component, {
      global: this.global,
      orderNo: orderNo
    });
  }

  paymentsConfirm(orderNo, index) {
    this.navCtrl.push(PaymentsConfirmPage, {
      global: this.global,
      orderNo: orderNo,
      index: index
    });
  }

  paymentsData(orderNo) {
    this.global.subData = {};
    this.navCtrl.push(PaymentsDetailPage, {
      global: this.global,
      orderNo: orderNo
    });
  }

  shippingData(type, code) {
    if(type == 'KE'){
      this.navCtrl.push(ShippingTrackingPage, {
        global: this.global,
        type: type,
        code: code
      });
    }
    else {

    }
  }

}
