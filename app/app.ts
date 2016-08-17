import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, SqlStorage, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { Global } from './providers/global/global';
import { LoginPage } from './pages/login/login';

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
        if(this.isLogin){
          this.rootPage = this.global.productPage;
          this.global.menu.swipeEnable(true);
          this.global.menu.enable(true);
        }
        else {
          this.rootPage = this.global.loginPage;
          this.global.menu.swipeEnable(false);
          this.global.menu.enable(false);
        }
      });

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(RemaxApp);
