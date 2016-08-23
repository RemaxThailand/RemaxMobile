import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/system-info/system-info.html',
})
export class SystemInfoPage {

  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
  }

}
