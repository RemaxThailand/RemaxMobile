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

  constructor(private platform: Platform, private menu: MenuController, private global: Global) {
    this.global = global;
    global.menu = menu;
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      StatusBar.styleBlackTranslucent();

      this.global.socket = io('https://io-test.remaxthailand.co.th');
      let storage = new Storage(LocalStorage);

      storage.get('langCode').then((langCode) => {
        if(langCode == undefined)
          storage.set('langCode', 'th');
        else
          this.global.langCode = langCode;
      });

      this.global.isShowMenu = true;

      storage.get('page').then((page) => {
        if(page == undefined) page = 'shopping';
        let success = false;
        for (var menu in this.global.menuGroup) {
          let json = this.global.menuGroup[menu];
          for (var idx in json) {
            if(json[idx].title == page){
              success = true;
              this.nav.setRoot(json[idx].component, {
                global:this.global
              });
              break;
            }
          }
          if(success) break;
        }
      });

      /*LocalNotifications.schedule({
        id: 1,
        title: "หัวข้อหลัก",
        text: "Remax Thailand",
        //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
        data: { meetingId:"123#fg8" },
        icon: 'file://icon.png'
      });

      LocalNotifications.on("click", function (notification) {
        let data = notification.data;
        alert(data.id);
        alert(data.meetingId);
        alert(data['meetingId']);
        alert(data);
      });*/


      /*var push = Push.init({
        android: {
          senderID: "3066538051"
        },
        ios: {
          alert: "true",
          badge: true,
          sound: 'false'
        },
        windows: {}
      });
      push.on('registration', (data) => {
        console.log(data.registrationId);
        this.global.deviceToken = data.registrationId.toString();
        //alert(data.registrationId.toString());
      });
      push.on('notification', (data) => {
        console.log(data);
        alert("Hi, Am a push notification");
      });
      push.on('error', (e) => {
        console.log(e.message);
        alert(e.message);
      });*/


      /*this.global.socket.on('online', function (data) {
          //this.isOnline = true;
          alert(data.count);
      });*/
	  storage.get('token').then((token) => {
		  if (token != undefined && token.trim() != '') {
			  this.global.socket.emit('access', { token: token });
		  }
		  else {
			  this.global.socket.emit('access', { token: '' });
		  }
	  });

      //this.global.socket.emit('access', { apiKey: this.global.apiKey });

      this.global.socket.on('access', function(data) {
        if(data.success){
          storage.set('token', data.token);
		  console.log( data );
          //alert(data);
        }
        else {
			storage.remove('token');
			alert(data.error+"\n"+data.errorMessage);
        }
      });

      this.global.socket.on('api-member-login', function(data) {
        if(data.success){
          alert('Success');
        }
        else {
          alert(data.error+"\n"+data.errorMessage);
        }
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
      let local = new Storage(LocalStorage);
      local.set('page', page.title).then(() => {
        this.nav.setRoot(page.component, {
          global:this.global
        });
      });
    }
  }
}

ionicBootstrap(RemaxApp);
