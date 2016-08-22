import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/setting/setting.html',
})

export class SettingPage {

  global:any;
  langCode: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
    this.langCode = this.global.langCode;
  }

  changeLangCode($event, langCode){
    this.global.langCode = langCode;
  }

}
