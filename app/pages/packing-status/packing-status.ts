import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, ActionSheetController, ModalController } from 'ionic-angular';
import { OrderDetailPage } from '../order-detail/order-detail';

@Component({
  templateUrl: 'build/pages/packing-status/packing-status.html',
})
export class PackingStatusPage {

  global: any;
  dataType: string;
  selectDate: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private actionSheetController: ActionSheetController, private modalCtrl: ModalController) {
    this.global = this.navParams.get('global');
    let now = new Date();
    this.selectDate = (new Date(now.getTime() - now.getTimezoneOffset() * 60000)).toISOString().slice(0, -1);

    let local = new Storage(LocalStorage);
    local.get('PackingStatusPage-dataType').then((dataType) => {
      if(dataType == undefined) {
        local.set('PackingStatusPage-dataType', 'queue');
        dataType = 'queue';
      }
      this.dataType = dataType;
    });
  }

  changeDataType($event, dataType){
    let local = new Storage(LocalStorage);
    local.set('PackingStatusPage-dataType', dataType);
  }

  viewDetail(){
    let modal = this.modalCtrl.create(OrderDetailPage);
    modal.present();
  }

  queueAssign() {
    let actionSheet = this.actionSheetController.create({
      title: 'ผู้รับผิดชอบ',
      buttons: [
        {
          text: 'นิ',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'เหมย',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'เหมียว',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'พี่นงค์',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'พี่ฉลอง',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  shipAssign() {
    let actionSheet = this.actionSheetController.create({
      title: 'ผู้รับผิดชอบ',
      buttons: [
        {
          text: 'เอก',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'ยุทธ',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'อั๋น',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'พี่จิน',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'เอก (เคลม)',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
