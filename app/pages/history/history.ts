import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage } from 'ionic-angular';

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
    });

  }

  viewDetail(orderNo) {
    this.navCtrl.push(this.global.screen.orderDetail.component, {
      global: this.global,
      orderNo: orderNo
    });
  }

}
