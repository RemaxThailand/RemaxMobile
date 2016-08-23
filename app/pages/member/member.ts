import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/member/member.html',
})
export class MemberPage {

  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.global = this.navParams.get('global');
  }

}
