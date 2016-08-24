import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OrderConfirmPage } from '../order-confirm/order-confirm';

@Component({
  templateUrl: 'build/pages/order/order.html',
})
export class OrderPage {

  global: any;
  dataType: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private alertController: AlertController) {
    this.global = this.navParams.get('global');
    this.dataType = 'waiting';
  }

  cancelOrder() {
    let prompt = this.alertController.create({
      title: 'ยกเลิกคำสั่งซื้อ ?',
      message: "เหตุผลในการยกเลิก",
      inputs: [
        {
          name: 'title',
          placeholder: 'เหตุผล'
        },
      ],
      buttons: [
        {
          text: 'ปิด',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  confirmOrder(){
    this.navCtrl.push(OrderConfirmPage, {global: this.global, orderNo: '1608B01082'});
  }

}
