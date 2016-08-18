import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Global } from './providers/global/global';
import { LoginPage } from './pages/login/login';
import { ProductPage } from './pages/product/product';

@Component({
  templateUrl: 'build/app.html',
  providers: [Global]
})
class RemaxApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  //showMenu: boolean = false;
  isLogin: boolean = false;

  constructor(public platform: Platform, menu: MenuController, public global: Global) {
    global.menu = menu
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*
      StatusBar.styleDefault();
      StatusBar.styleLightContent();
      StatusBar.styleBlackTranslucent();
      StatusBar.styleBlackOpaque();
      */
      StatusBar.styleBlackTranslucent();


      let storage = new Storage(SqlStorage);
      //storage.set('isLogin', true);
      storage.get('isLogin').then((isLogin) => {
        this.isLogin = isLogin;
        if (this.isLogin) {
          this.rootPage = ProductPage;
          //this.global.menu.swipeEnable(true);
          //this.global.menu.enable(true);
        }
        else {
          this.rootPage = LoginPage;
          //this.global.menu.swipeEnable(false);
          //this.global.menu.enable(false);
        }
      });

    });
  }

  openPage(page) {
    if (page.id == 'login') {
      this.global.isShowMenu = false;
      //this.global.menu.swipeEnable(false);
      //this.global.menu.enable(false);
      //this.nav.setRoot(LoginPage);
      this.nav.setRoot(LoginPage).then(() => {
        this.nav.popToRoot();
      });
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}

ionicBootstrap(RemaxApp);
