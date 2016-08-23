import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/packing-status/packing-status.html',
})
export class PackingStatusPage {

  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
  }

}
