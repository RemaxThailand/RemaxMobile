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
    let storage = new Storage(LocalStorage);
    storage.set('langCode', langCode);
    this.global.langCode = langCode;

	storage.get('token').then((token) => {
	if(token != undefined) {
		this.global.socket.emit('api', {
			token: token,
			module:'system',
			action:'language',
			system: 'mobile',
			langCode: this.global.langCode
		});
	}
	else
	  alert( 'Token is undefined' );
	});
  }

}
