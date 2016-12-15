import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage } from 'ionic-angular';
import { PaymentsConfirmPage } from '../../pages/payments-confirm/payments-confirm';
import { PaymentsDetailPage } from '../../pages/payments-detail/payments-detail';
import { ShippingTrackingPage } from '../../pages/shipping-tracking/shipping-tracking';

@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {

  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');

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
