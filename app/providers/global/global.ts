import { Injectable } from '@angular/core';
import { MenuController, Storage, LocalStorage } from 'ionic-angular';
//import * as io from "socket.io-client";

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
  public socket: any;

  public constructor() {
    //this.storage = new Storage(SqlStorage);
    //this.socket = io('https://realtime-test.remaxthailand.co.th');

    this.language = {
      en:
      {
        language: 'Language',
        ok: 'OK',
        cancel: 'Cancel',
        help: 'Help',
        settings: 'Settings',
        updateChecking: 'Check for Update',
        aboutSystem: 'About',
        memberInformation: 'Member Information',
        profile: 'Profile',
        wallet: 'Wallet',
        rewardPoints: 'Reward Points',
        signIn: 'Sign in',
        signOut: 'Sign out',
        salesInformation: 'Sales Information',
        purchaseOrder: 'Purchase Order',
        productBookings: 'Product Bookings',
        customerInformation: 'Customer',
        ordering: 'Ordering',
        shopping: 'Shopping',
        redemption: 'Redemption',
        cart: 'Shopping Cart',
        orderHistory: 'Order History',
        administrator: 'Administrator',
        memberManagement: 'Member Management',
        screenManagement: 'Screen Management',
        systemConfiguration: 'System Configuration',
        systemInformation: 'System Information',
        warehouse: 'Warehouse',
        packingStatus: 'Packing Status',
        transportation: 'Transportation',
        accounting: 'Accounting',
        payments: 'Payments',
        memberPosition: 'Member Position',
        roleAdministrator: 'Administrator',
        roleDealer: 'Dealer',
        roleDeveloper: 'Developer',
        roleOwner: 'Owner',
        roleGuest: 'Guest',
        roleHeadSale: 'Head Sale',
        roleManager: 'Manager',
        roleMember: 'Member',
        roleOfficer: 'Officer',
        roleSale: 'Sale'
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
        aboutSystem: 'ข้อมูลระบบ',
        memberInformation: 'ข้อมูลสมาชิก',
        profile: 'ข้อมูลส่วนตัว',
        wallet: 'กระเป๋าเงิน',
        rewardPoints: 'แต้มสะสม',
        signIn: 'เข้าสู่ระบบ',
        signOut: 'ออกจากระบบ',
        salesInformation: 'ข้อมูลการขาย',
        purchaseOrder: 'คำสั่งซื้อสินค้า',
        productBookings: 'การจองสินค้า',
        customerInformation: 'ข้อมูลลูกค้า',
        ordering: 'การสั่งซื้อ',
        shopping: 'เลือกซื้อสินค้า',
        redemption: 'แลกคะแนนสะสม',
        cart: 'ตะกร้าสินค้า',
        orderHistory: 'ประวัติคำสั่งซื้อ',
        administrator: 'ผู้ดูแลระบบ',
        memberManagement: 'ข้อมูลสมาชิก',
        screenManagement: 'หน้าจอระบบ',
        systemConfiguration: 'การตั้งค่าระบบ',
        systemInformation: 'สถานะต่างๆ ของระบบ',
        warehouse: 'คลังสินค้า',
        packingStatus: 'สถานะการจัดสินค้า',
        transportation: 'การขนส่ง',
        accounting: 'การบัญชี',
        payments: 'รายการชำระเงิน',
        memberPosition: 'ประเภทสมาชิก',
        roleAdministrator: 'ผู้ดูแลระบบ',
        roleDealer: 'ดีลเลอร์',
        roleDeveloper: 'ผู้พัฒนาระบบ',
        roleOwner: 'ผู้บริหาร',
        roleGuest: 'ผู้เยี่ยมชมทั่วไป',
        roleHeadSale: 'หัวหน้าเซลล์',
        roleManager: 'หัวหน้าทีม',
        roleMember: 'สมาชิก',
        roleOfficer: 'พนักงานบริษัท',
        roleSale: 'ฝ่ายขาย'
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
        aboutSystem: 'システムについて',
        memberInformation: '会員情報',
        profile: 'プロフィール',
        wallet: '財布',
        rewardPoints: '報酬ポイント',
        signIn: 'ログイン',
        signOut: 'ログアウト',
        salesInformation: '販売情報',
        purchaseOrder: '注文書',
        productBookings: '製品の予約',
        customerInformation: '顧客情報',
        ordering: '発注',
        shopping: 'ショッピング',
        redemption: '償還',
        cart: 'ショッピングカート',
        orderHistory: '注文履歴',
        administrator: '管理者',
        memberManagement: '会員管理',
        screenManagement: '画面管理',
        systemConfiguration: 'システム構成',
        systemInformation: 'システムインフォメーション',
        warehouse: '倉庫',
        packingStatus: 'パッキングステータス',
        transportation: '交通',
        accounting: '会計',
        payments: '支払い',
        memberPosition: '部材位置',
        roleAdministrator: '管理者',
        roleDealer: 'ディーラー',
        roleDeveloper: 'ディベロッパー',
        roleOwner: 'オーナー',
        roleGuest: 'ゲスト',
        roleHeadSale: 'ヘッドセール',
        roleManager: 'マネージャー',
        roleMember: 'メンバー',
        roleOfficer: '役員',
        roleSale: '販売'
      }
    }

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


  public test(){
    alert('ddd');
  }

}
