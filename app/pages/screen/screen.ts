import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/screen/screen.html',
})
export class ScreenPage {

  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
  }

}
