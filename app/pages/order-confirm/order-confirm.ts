import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/order-confirm/order-confirm.html',
})

export class OrderConfirmPage {

  global: any;
  orderNo: string;
  payStatus: string;
  payType: string;
  transferDate: any;
  bankName: string;
  priority: number;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.orderNo = this.navParams.get('orderNo');
    this.payStatus = 'cash';
    this.payType = 'transfer';
    this.bankName = 'kbank';
    this.priority = 0;

    this.transferDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().slice(0,-1);

  }

}
