import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})

export class ProfilePage {

  global:any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private actionSheetController: ActionSheetController) {
    this.global = this.navParams.get('global');
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetController.create({
      title: 'เลือกตำแหน่ง',
      buttons: [
        {
          text: 'ผู้ดูแลระบบ',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'สมาชิก',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: this.global.language[this.global.langCode].cancel,
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
