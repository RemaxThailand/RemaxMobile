import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/payments-confirm/payments-confirm.html',
})
export class PaymentsConfirmPage {

  global: any;
  orderNo: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.orderNo = this.navParams.get('orderNo');
  }

}
