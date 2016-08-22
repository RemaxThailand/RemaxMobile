import { Injectable } from '@angular/core';
import { MenuController, Storage, SqlStorage } from 'ionic-angular';
import * as io from "socket.io-client";

import { ProductPage } from '../../pages/product/product';
import { ProfilePage } from '../../pages/profile/profile';
import { CartPage } from '../../pages/cart/cart';
import { HistoryPage } from '../../pages/history/history';
import { SettingPage } from '../../pages/setting/setting';
import { SearchPage } from '../../pages/search/search';
import { LoginPage } from '../../pages/login/login';

/*
  Generated class for the Global provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {
  public isShowMenu: boolean = false;
  public isLogin: boolean = false;
  public isMember: boolean = false;
  public member: any = {
    id: '0', type: 'guest', picture: 'build/img/remax.png',
    name: 'Remax Thailand', shopName: ''
  };
  public token: string = '';

  public pages: Array<{ id: string, title: string, component: any, icon: string, isShow: boolean }>;

  public menu: any;

  public storage: Storage;
  public socket: any;

  public constructor() {
    this.storage = new Storage(SqlStorage);
    this.socket = io('https://realtime-test.remaxthailand.co.th');

    this.pages = [
      { id: 'product', title: 'สินค้า', component: ProductPage, icon: 'ios-keypad', isShow: true },
      { id: 'cart', title: 'รถเข็นสินค้า', component: CartPage, icon: 'md-cart', isShow: true },
      { id: 'history', title: 'ประวัติคำสั่งซื้อ', component: HistoryPage, icon: 'md-time', isShow: false },
      { id: 'profile', title: 'ข้อมูลส่วนตัว', component: ProfilePage, icon: 'ios-contact', isShow: false },
      { id: 'login', title: 'เข้าสู่ระบบ', component: null, icon: 'ios-contact', isShow: true },
      { id: 'logout', title: 'ออกจากระบบ', component: null, icon: 'ios-contact', isShow: false },
      { id: 'setting', title: 'การตั้งค่า', component: SettingPage, icon: 'md-settings', isShow: true }
    ];

  }

  public setShowHideMenu(show, hide) {
    for (let i = 0; i < this.pages.length; i++) {
      if (hide.indexOf('|' + this.pages[i].id + '|') != -1) {
        this.pages[i].isShow = false;
      }
      if (show.indexOf('|' + this.pages[i].id + '|') != -1) {
        this.pages[i].isShow = true;
      }
    }
  }

}
