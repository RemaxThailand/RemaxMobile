import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, LoadingController, ActionSheetController } from 'ionic-angular';
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
  count: number = 0;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private actionSheetController: ActionSheetController) {
    this.global = this.navParams.get('global');

    this.loadPage(this.page);

    //this.global.data = {};
    /*this.global.subData = {};

    this.global.isLoaded = false;
    let loader = this.loadingCtrl.create({
      content: this.global.message.pleaseWait+"...",
    });
    loader.present();

    var timer = setInterval(() => {
      if(this.global.isLoaded) {
        clearInterval(timer);
        loader.dismiss();
        this.count = this.global.subData;
      }
    }, 500);*/

    /*## ประวัติคำสั่งซื้อ ##*/
    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      /*this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'history',
        page: this.page,
        perPage: this.perPage
      });*/

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

  loadPage(page){
    this.page = page;

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
        if(this.count == 0) {
          this.count = this.global.subData;
        }
      }
    }, 500);

    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'order',
        action: 'history',
        page: this.page,
        perPage: this.perPage
      });
    });
  }

  showSelectPage(){
    let actionSheet = this.actionSheetController.create({
      title: "Page "
    });

    actionSheet.addButton({
      text: "Page 2",
      handler: () => {
        this.loadPage(2);
      }
    });

    actionSheet.addButton({
      text: this.global.message.cancel,
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });
    actionSheet.present();
  }

}
