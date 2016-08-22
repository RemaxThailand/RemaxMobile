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
  public langCode: string = 'th';
  public language: any;

  public pages: Array<{ id: string, title: string, component: any, icon: string, isShow: boolean }>;
  public menuGroup: any;

  public menu: any;

  public storage: Storage;
  public socket: any;

  public constructor() {
    //this.storage = new Storage(SqlStorage);
    this.socket = io('https://realtime-test.remaxthailand.co.th');

    this.language = {
      en:
        {
          language: 'Language',
          ok: 'OK',
          cancel: 'Cancel',
          help: 'Help',
          settings: 'Settings',
          updateChecking: 'Check for Update',
          aboutSystem: 'About'
        }
      ,
      th:
        {
          language: 'ภาษา',
          ok: 'ตกลง',
          cancel: 'ยกเลิก',
          help: 'ช่วยเหลือ',
          settings: 'การตั้งค่า',
          updateChecking: 'ตรวจสอบการอัพเดท',
          aboutSystem: 'ข้อมูลระบบ'
        }
      ,
      jp:
        {
          language: '言語',
          ok: 'はい',
          cancel: 'いいえ',
          help: '助けて',
          settings: '設定',
          updateChecking: '更新を確認',
          aboutSystem: 'システムについて'
        }
    }

    this.menuGroup = {
      member: [
        { id: 'profile', title: 'ข้อมูลส่วนตัว', component: ProfilePage, icon: 'fa-user', isShow: true },
        { id: 'profile', title: 'กระเป๋าเงิน', component: ProfilePage, icon: 'fa-credit-card', isShow: true },
        { id: 'profile', title: 'แต้มสะสม', component: ProfilePage, icon: 'fa-star', isShow: true },
        { id: 'login', title: 'เข้าสู่ระบบ', component: null, icon: 'fa-sign-in', isShow: false },
        { id: 'logout', title: 'ออกจากระบบ', component: null, icon: 'fa-sign-out', isShow: true },
      ],
      product: [
        { id: 'product', title: 'เลือกซื้อสินค้า', component: ProductPage, icon: 'fa-cubes', isShow: true },
        { id: 'product', title: 'แลกคะแนนสะสม', component: ProductPage, icon: 'fa-gift', isShow: true },
        { id: 'cart', title: 'ตะกร้าสินค้า', component: CartPage, icon: 'fa-shopping-basket', isShow: true },
        { id: 'history', title: 'ประวัติคำสั่งซื้อ', component: HistoryPage, icon: 'fa-clock-o', isShow: true }
      ],
      sales: [
        { id: 'order', title: 'คำสั่งซื้อสินค้า', component: ProfilePage, icon: 'fa-paper-plane-o', isShow: true },
        { id: 'order-booking', title: 'การจองสินค้า', component: ProfilePage, icon: 'fa-lock', isShow: true },
        { id: 'order', title: 'ข้อมูลลูกค้า', component: ProfilePage, icon: 'fa-github-alt', isShow: true }
      ],
      account: [
        { id: 'order', title: 'รายการชำระเงิน', component: ProfilePage, icon: 'fa-btc', isShow: true }
      ],
      warehouse: [
        { id: 'packing', title: 'ลำดับการจัดสินค้า', component: ProfilePage, icon: 'fa-hourglass-half', isShow: true },
        { id: 'logistic', title: 'การขนส่ง', component: ProfilePage, icon: 'fa-truck', isShow: true }
      ],
      admin: [
        { id: 'packing', title: 'ข้อมูลสมาชิก', component: ProfilePage, icon: 'fa-slideshare', isShow: true },
        { id: 'logistic', title: 'จัดการหน้าจอระบบ', component: ProfilePage, icon: 'fa-windows', isShow: true },
        { id: 'logistic', title: 'การตั้งค่าระบบ', component: ProfilePage, icon: 'fa-wrench', isShow: true },
        { id: 'logistic', title: 'สถานะต่างๆ ของระบบ', component: ProfilePage, icon: 'fa-plug', isShow: true }
      ],
      system: [
        { id: 'setting', title: 'settings', component: SettingPage, icon: 'fa-cog', isShow: true },
        { id: 'update', title: 'updateChecking', component: ProfilePage, icon: 'fa-refresh', isShow: true },
        { id: 'about', title: 'aboutSystem', component: ProfilePage, icon: 'fa-shield', isShow: true }
      ]
    };

    this.pages = [
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


  /*public message(message){
    return this.language[this.langCode][message] == undefined ? message : this.language[this.langCode][message];
  }*/

}
