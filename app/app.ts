import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav, Storage, LocalStorage, MenuController, AlertController } from 'ionic-angular';
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

  constructor(private platform: Platform, private menu: MenuController, private global: Global, private alertCtrl: AlertController) {
    this.global = global;
    //global.menu = menu;
    this.platform.ready().then(() => {
      this.initializeApp(this.global, alertCtrl);
    });
  }

  initializeApp(global, alertCtrl) {
    let retryCount = 0;

    StatusBar.styleBlackTranslucent();

    global.socket = io('https://io-test.remaxthailand.co.th');
    let storage = new Storage(LocalStorage);

    storage.get('langCode').then((langCode) => {
      if (langCode == undefined)
        storage.set('langCode', 'th');
      else
        global.langCode = langCode;
    });

    global.isShowMenu = true;

    storage.get('page').then((page) => {
      if (page == undefined) page = 'shopping';
      let success = false;
      for (var menu in global.menuGroup) {
        let json = global.menuGroup[menu];
        for (var idx in json) {
          if (json[idx].title == page) {
            success = true;
            this.nav.setRoot(json[idx].component, {
              global: global
            });
            break;
          }
        }
        if (success) break;
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
      global.deviceToken = data.registrationId.toString();
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


    /*global.socket.on('online', function (data) {
        //this.isOnline = true;
        alert(data.count);
    });*/
    storage.get('token').then((token) => {
      if (token != undefined && token.trim() != '') {
        global.socket.emit('access', { token: token });
      }
      else {
        global.socket.emit('access', { token: '' });
      }
    });

    //global.socket.emit('access', { apiKey: global.apiKey });

    global.socket.on('access', function(data) {
      console.log(global.langCode);
      console.log(data);
      if (data.success) {
        storage.set('token', data.token);
        global.socket.emit('api', {
          token: data.token,
          module: 'system',
          action: 'language',
          system: 'mobile',
          langCode: global.langCode
        });
      }
      else {
        storage.remove('token');
        if(retryCount < 3){
          global.socket.emit('access', { token: '' });
          retryCount++;
        }
        else {
          alert(data.error+"\n"+data.errorMessage);
        }
      }
    });

    global.socket.on('api-system-language', function(data) {
      console.log(data);
      if (data.success) {
        global.message = {};
        for (let i = 0; i < data.result.length; i++) {
          global.message[data.result[i].messageKey] = data.result[i].message;
        }
      }
      else if ( data.error = 'APP0002'){
        if(retryCount < 3){
          global.socket.emit('access', { token: '' });
          retryCount++;
        }
        else {
          alert(data.error+"\n"+data.errorMessage);
        }
      }
    });


    global.socket.on('api-member-login', function(data) {
      console.log( data );
      if (data.success) {
        alert('Success');
      }
      else {

        let alert = alertCtrl.create({
          title: global.message.error,
          subTitle: global.message[data.error],
          buttons: [global.message.ok]
        });
        alert.present();

        //this.showAlert( data.error, data.errorMessage );
        //alert(data.error+"\n"+data.errorMessage);
      }
    });

    /*
    let storage = new Storage(SqlStorage);
    storage.get('isLogin').then((isLogin) => {
      global.isLogin = isLogin == undefined ? false : isLogin === '1';
      storage.get('isMember').then((isMember) => {
        global.isMember = isMember == undefined ? false : isMember === '1';
        if (global.isLogin) {
          global.isShowMenu = true;
          this.nav.setRoot(ProductPage)
          if (global.isMember)
            global.setShowHideMenu('|history|profile|logout|', '|login|');
          else
            global.setShowHideMenu('|login|', '|history|profile|logout|');
        }
        else {
          global.isShowMenu = false;
          this.nav.setRoot(LoginPage);
        }
      });
    });

    global.socket.emit('access', { apiKey: '41C38027-7953-4DA8-8BBE-399CAD6592D4' });

    global.socket.on('access', function(data) {
      if(data.success){
        storage.set('token', data.token)
      }
      else {
        alert(data.error);
      }
    });
    */

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
                global: this.global
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
          global: this.global
        });
      });
    }
  }

}

ionicBootstrap(RemaxApp);
