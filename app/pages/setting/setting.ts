import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage } from 'ionic-angular';

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
    let local = new Storage(LocalStorage);
    local.set('langCode', langCode);
    this.global.langCode = langCode;
  }

}
