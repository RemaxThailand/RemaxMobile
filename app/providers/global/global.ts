import { Injectable } from '@angular/core';
import { MenuController, Storage, LocalStorage } from 'ionic-angular';
import * as io from "socket.io-client";

import { ShoppingPage } from '../../pages/shopping/shopping';
import { ProfilePage } from '../../pages/profile/profile';
import { CartPage } from '../../pages/cart/cart';
import { HistoryPage } from '../../pages/history/history';
import { OrderDetailPage } from '../../pages/order-detail/order-detail';
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
  public member: any;
  public deviceToken: string = '';
  public langCode: string = 'th';
  public message: any;
  public data: any;
  public subData: any = {};
  public summaryData: any = {};
  public bank: any = {};

  public memberScreen: any;
  public screen: any;
  public role: any;

  public storage: Storage;

  public constructor() {
    this.message = {}

    this.screen = {
      profile: { title: 'profile', component: ProfilePage },
      wallet: { title: 'wallet', component: WalletPage },
      rewardPoints: { title: 'rewardPoints', component: RewardPointsPage },
      signIn: { title: 'signIn', component: null },
      signOut: { title: 'signOut', component: null },
      shopping: { title: 'shopping', component: ShoppingPage },
      redemption: { title: 'redemption', component: RedemptionPage },
      cart: { title: 'cart', component: CartPage },
      orderHistory: { title: 'orderHistory', component: HistoryPage },
      orderDetail: { title: 'orderDetail', component: OrderDetailPage },
      purchaseOrder: { title: 'purchaseOrder', component: OrderPage },
      productBookings: { title: 'productBookings', component: ProductBookingPage },
      customerInformation: { title: 'customerInformation', component: CustomerPage },
      payments: { title: 'payments', component: PaymentsPage },
      packingStatus: { title: 'packingStatus', component: PackingStatusPage },
      transportation: { title: 'transportation', component: TransportationPage },
      memberManagement: { title: 'memberManagement', component: MemberPage },
      screenManagement: { title: 'screenManagement', component: ScreenPage },
      systemConfiguration: { title: 'systemConfiguration', component: SystemConfigPage },
      systemInformation: { title: 'systemInformation', component: SystemInfoPage },
      settings: { title: 'settings', component: SettingPage },
      updateChecking: { title: 'updateChecking', component: null },
      aboutSystem: { title: 'aboutSystem', component: AboutPage }
    };

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

  public capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  public numberMoney(x) {
    x = parseFloat(x).toFixed(2);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
  public numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

}
