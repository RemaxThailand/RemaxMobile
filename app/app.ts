import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, LocalStorage, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import * as io from "socket.io-client";

import { Global } from './providers/global/global';
import { LoginPage } from './pages/login/login';
import { ShoppingPage } from './pages/shopping/shopping';

@Component({
  templateUrl: 'build/app.html',
  providers: [Global]
})
class RemaxApp {
  @ViewChild(Nav) nav: Nav;
  public socket: any;

  //rootPage: any = LoginPage;

  constructor(private platform: Platform, private menu: MenuController, private global: Global) {
    global.menu = menu;

    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.global.socket = io('https://realtime-test.remaxthailand.co.th');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      /*
      StatusBar.styleDefault();
      StatusBar.styleLightContent();
      StatusBar.styleBlackTranslucent();
      StatusBar.styleBlackOpaque();
      */
      StatusBar.styleBlackTranslucent();

      let local = new Storage(LocalStorage);
      local.get('langCode').then((langCode) => {
        if(langCode == undefined)
          local.set('langCode', 'th');
        else
          this.global.langCode = langCode;
      });

      this.global.isShowMenu = true;
      this.nav.setRoot(ShoppingPage, {
        global:this.global
      });

      this.global.socket.on('online', function (data) {
          //this.isOnline = true;
          alert(data.count);
      });

      /*
      let storage = new Storage(SqlStorage);
      storage.get('isLogin').then((isLogin) => {
        this.global.isLogin = isLogin == undefined ? false : isLogin === '1';
        storage.get('isMember').then((isMember) => {
          this.global.isMember = isMember == undefined ? false : isMember === '1';
          if (this.global.isLogin) {
            this.global.isShowMenu = true;
            this.nav.setRoot(ProductPage)
            if (this.global.isMember)
              this.global.setShowHideMenu('|history|profile|logout|', '|login|');
            else
              this.global.setShowHideMenu('|login|', '|history|profile|logout|');
          }
          else {
            this.global.isShowMenu = false;
            this.nav.setRoot(LoginPage);
          }
        });
      });

      this.global.socket.emit('access', { apiKey: '41C38027-7953-4DA8-8BBE-399CAD6592D4' });

      this.global.socket.on('access', function(data) {
        if(data.success){
          storage.set('token', data.token)
        }
        else {
          alert(data.error);
        }
      });
      */

    });
  }

  openPage(page) {
    if (page.title == 'signIn' || page.title == 'signOut') {
      this.menu.close().then(() => {
        let local = new Storage(LocalStorage);
        try {
          local.set('isLogin', '0').then(() => {
            local.set('isMember', '0').then(() => {
              this.global.isLogin = false;
              this.global.isMember = false;
              this.global.isShowMenu = false;
              this.nav.setRoot(LoginPage, {
                global:this.global
              });
            });
          });
        } catch (e) {
          alert(e.message);
        }
      });
    }
    else {
      this.nav.setRoot(page.component, {
        global:this.global
      });
    }
  }
}

ionicBootstrap(RemaxApp);
