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

  //rootPage: any = LoginPage;

  constructor(public platform: Platform, menu: MenuController, public global: Global) {
    global.menu = menu;
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
        this.global.isLogin = isLogin == undefined ? false : isLogin === 'true';
        alert(this.global.isLogin);
        if (this.global.isLogin == true) {
          alert('ProductPage');
          this.global.isShowMenu = true;
          this.global.setShowHideMenu('|history|profile|logout|', '|login|');
          this.nav.setRoot(ProductPage);
          //this.global.menu.swipeEnable(true);
          //this.global.menu.enable(true);
        }
        else {
          alert('LoginPage');
          this.global.isShowMenu = false;
          this.nav.setRoot(LoginPage);
          //this.global.menu.swipeEnable(false);
          //this.global.menu.enable(false);
        }
      });

    });
  }

  openPage(page) {
    if (page.id == 'login' || page.id == 'logout') {
      this.global.menu.close().then(() => {
        let storage = new Storage(SqlStorage);
        storage.set('isLogin', false).then(() => {
          this.global.isLogin = false;
          this.global.isShowMenu = false;
          this.nav.setRoot(LoginPage);
        });
      });
      //this.global.menu.swipeEnable(false);
      //this.global.menu.enable(false);
      //this.nav.setRoot(LoginPage);
    }
    else {
      this.nav.setRoot(page.component);
    }
  }
}

ionicBootstrap(RemaxApp);
