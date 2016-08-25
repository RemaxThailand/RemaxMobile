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
  shipDate: any;
  bankName: string;
  priority: number;
  shipMethod: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.orderNo = this.navParams.get('orderNo');
    this.payStatus = 'cash';
    this.payType = 'transfer';
    this.bankName = 'kbank';
    this.priority = 0;
    this.shipMethod = 'kerry';

    let now = new Date();
    this.transferDate = (new Date(now.getTime() - now.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
    now.setDate(now.getDate() + 1);
    now.setHours(15);
    now.setMinutes(0);
    this.shipDate = (new Date(now.getTime() - now.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);
  }

  changePayStatus($event, payStatus) {
    this.shipMethod = (payStatus == 'cash') ? 'self' : 'kerry';
  }

  saveData(){
    this.navCtrl.pop();
  }

}
