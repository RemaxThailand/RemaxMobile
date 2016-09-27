import { Injectable } from '@angular/core';
import { MenuController, Storage, LocalStorage, AlertController } from 'ionic-angular';
import * as io from "socket.io-client";

import { ShoppingPage } from '../../pages/shopping/shopping';
import { ProfilePage } from '../../pages/profile/profile';
import { CartPage } from '../../pages/cart/cart';
import { HistoryPage } from '../../pages/history/history';
import { SettingPage } from '../../pages/setting/setting';
import { SearchPage } from '../../pages/search/search';
import { LoginPage } from '../../pages/login/login';
import { WalletPage } from '../../pages/wallet/wallet';
import { RewardPointsPage } from '../../pages/reward-points/reward-points';
import { RedemptionPage } from '../../pages/redemption/redemption';
import { OrderPage } from '../../pages/order/order';
import { ProductBookingPage } from '../../pages/product-booking/product-booking';
import { CustomerPage } from '../../pages/customer/customer';
import { PaymentsPage } from '../../pages/payments/payments';
import { PackingStatusPage } from '../../pages/packing-status/packing-status';
import { TransportationPage } from '../../pages/transportation/transportation';
import { MemberPage } from '../../pages/member/member';
import { ScreenPage } from '../../pages/screen/screen';
import { SystemConfigPage } from '../../pages/system-config/system-config';
import { SystemInfoPage } from '../../pages/system-info/system-info';
import { AboutPage } from '../../pages/about/about';

@Injectable()
export class Global {
  public apiKey: string = '41C38027-7953-4DA8-8BBE-399CAD6592D4';
  public socket: any;
  public isShowMenu: boolean = false;
  public isLogin: boolean = false;
  public isMember: boolean = false;
  public member: any = {
    id: '0', type: 'guest', picture: 'build/img/remax.png',
    name: 'Remax Thailand', shopName: ''
  };
  //public token: string = '';
  public deviceToken: string = '';
  public langCode: string = 'th';
  public message: any;
  public memberType: string = 'guest';
  public memberMenu: any = {
    admin: '|profile|signOut|memberManagement|screenManagement|systemConfiguration|systemInformation|settings|updateChecking|aboutSystem|',
    developer: '|profile|signOut|memberManagement|screenManagement|systemConfiguration|systemInformation|settings|updateChecking|aboutSystem|',
    guest: '|signIn|shopping|cart|settings|updateChecking|aboutSystem|',
    dealer: '|profile|wallet|rewardPoints|signOut|shopping|redemption|cart|orderHistory|settings|updateChecking|aboutSystem|',
    member: '|profile|wallet|rewardPoints|signOut|shopping|redemption|cart|orderHistory|settings|updateChecking|aboutSystem|',
    owner: '|profile|signOut|purchaseOrder|productBookings|customerInformation|payments|packingStatus|transportation|settings|updateChecking|aboutSystem|',
    headSale: '|profile|wallet|rewardPoints|signOut|purchaseOrder|productBookings|customerInformation|settings|updateChecking|aboutSystem|',
    sale: '|profile|wallet|rewardPoints|signOut|purchaseOrder|productBookings|customerInformation|settings|updateChecking|aboutSystem|',
    manager: '|profile|wallet|rewardPoints|signOut|purchaseOrder|productBookings|customerInformation|settings|updateChecking|aboutSystem|',
    officer: '|profile|wallet|rewardPoints|signOut|shopping|redemption|cart|orderHistory|purchaseOrder|productBookings|customerInformation|payments|packingStatus|transportation|settings|updateChecking|aboutSystem|'
  };

  public menuDividerShow: any =
  {
    member: true,
    product: true,
    sales: true,
    account: true,
    warehouse: true,
    admin: true,
    system: true
  };

  public pages: Array<{ id: string, title: string, component: any, icon: string, isShow: boolean }>;
  public menuGroup: any;

  public menu: any;

  public storage: Storage;
  public alertCtrl: AlertController;
  //public socket: any;

  public constructor() {
    //this.storage = new Storage(SqlStorage);
    //this.socket = io('https://realtime-test.remaxthailand.co.th');
    this.message = {}

    this.menuGroup = {
      member: [
        { title: 'profile', component: ProfilePage, icon: 'fa-user', isShow: true },
        { title: 'wallet', component: WalletPage, icon: 'fa-credit-card', isShow: true },
        { title: 'rewardPoints', component: RewardPointsPage, icon: 'fa-star', isShow: true },
        { title: 'signIn', component: null, icon: 'fa-sign-in', isShow: false },
        { title: 'signOut', component: null, icon: 'fa-sign-out', isShow: true },
      ],
      product: [
        { title: 'shopping', component: ShoppingPage, icon: 'fa-cubes', isShow: true },
        { title: 'redemption', component: RedemptionPage, icon: 'fa-gift', isShow: true },
        { title: 'cart', component: CartPage, icon: 'fa-shopping-basket', isShow: true },
        { title: 'orderHistory', component: HistoryPage, icon: 'fa-clock-o', isShow: true }
      ],
      sales: [
        { title: 'purchaseOrder', component: OrderPage, icon: 'fa-paper-plane-o', isShow: true },
        { title: 'productBookings', component: ProductBookingPage, icon: 'fa-lock', isShow: true },
        { title: 'customerInformation', component: CustomerPage, icon: 'fa-github-alt', isShow: true }
      ],
      account: [
        { title: 'payments', component: PaymentsPage, icon: 'fa-btc', isShow: true }
      ],
      warehouse: [
        { title: 'packingStatus', component: PackingStatusPage, icon: 'fa-hourglass-half', isShow: true },
        { title: 'transportation', component: TransportationPage, icon: 'fa-truck', isShow: true }
      ],
      admin: [
        { title: 'memberManagement', component: MemberPage, icon: 'fa-slideshare', isShow: true },
        { title: 'screenManagement', component: ScreenPage, icon: 'fa-windows', isShow: true },
        { title: 'systemConfiguration', component: SystemConfigPage, icon: 'fa-wrench', isShow: true },
        { title: 'systemInformation', component: SystemInfoPage, icon: 'fa-plug', isShow: true }
      ],
      system: [
        { title: 'settings', component: SettingPage, icon: 'fa-cog', isShow: true },
        { title: 'updateChecking', component: null, icon: 'fa-refresh', isShow: true },
        { title: 'aboutSystem', component: AboutPage, icon: 'fa-shield', isShow: true }
      ]
    };

    this.pages = [
      { id: 'setting', title: 'การตั้งค่า', component: SettingPage, icon: 'md-settings', isShow: true }
    ];

    this.updateRoleMenu();

  }

  /*public setShowHideMenu(show, hide) {
    for (let i = 0; i < this.pages.length; i++) {
      if (hide.indexOf('|' + this.pages[i].id + '|') != -1) {
        this.pages[i].isShow = false;
      }
      if (show.indexOf('|' + this.pages[i].id + '|') != -1) {
        this.pages[i].isShow = true;
      }
    }
  }*/


  public updateRoleMenu() {
    let local = new Storage(LocalStorage);
    local.get('memberType').then((memberType) => {
      if(memberType == undefined){
        local.set('memberType', 'guest');
      }
      else {
        this.memberType = memberType;

        for (var menu in this.menuGroup) {
          let json = this.menuGroup[menu];
          let hasChild = false;
          for (var idx in json) {
            if (this.memberMenu[this.memberType].indexOf('|' + json[idx].title + '|') != -1) {
              json[idx].isShow = true;
              hasChild = true;
            }
            else {
              json[idx].isShow = false;
            }
          }
          this.menuDividerShow[menu] = hasChild;
        }

      }
    });
  }

  public login() {
    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      storage.get('username').then((username) => {
        storage.get('password').then((password) => {
          this.socket.emit('api', {
            token: token,
            module:'member',
            action:'login',
            memberType: 'local',
            username: username,
            password: password
          });
        });
      });
    });
  }

	public showAlert( title, subTitle ) {
		let alert = this.alertCtrl.create({
			title: title,
			subTitle: subTitle,
			buttons: this.message.ok
		});
		alert.present();
	}


  public test(){
    alert('ddd');
  }

}
