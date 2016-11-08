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
    this.platform.ready().then(() => {
      this.initializeApp(this.global, alertCtrl, this.nav);
    });
  }

  initializeApp(global, alertCtrl, navCtrl) {
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

    /*## ข้อมูล Token ##*/
    global.socket.on('access', function (data) {
      if (data.success) {
        storage.set('token', data.token);
        global.socket.emit('api', {
          token: data.token,
          module: 'system',
          action: 'language',
          system: 'mobile',
          langCode: global.langCode
        });

        global.socket.emit('api', {
          token: data.token,
          module: 'system',
          action: 'screen'
        });

      }
      else {
        storage.remove('token');
        if (retryCount < 3) {
          global.socket.emit('access', { token: '' });
          retryCount++;
        }
        else {
          alert(data.error + "\n" + data.errorMessage);
        }
      }
    });

    /*## ข้อมูลภาษา ##*/
    global.socket.on('api-system-language', function (data) {
      if (data.success) {
        global.message = {};
        for (let i = 0; i < data.result.length; i++) {
          global.message[data.result[i].messageKey] = data.result[i].message;
        }
      }
      else if (data.error = 'APP0002') {
        if (retryCount < 3) {
          global.socket.emit('access', { token: '' });
          retryCount++;
        }
        else {
          alert(data.error + "\n" + data.errorMessage);
        }
      }
    });

    /*## ผลตรวจสอบการ Login ##*/
    global.socket.on('api-member-login', function (data) {
      if (data.success) { // ถ้าเข้าระบบสำเร็จ
        storage.set('token', data.token);
        storage.get('page').then((page) => {
          if (page == 'signOut' || page == 'signIn') {
            storage.set('page', 'shopping');
            global.socket.emit('api', {
              token: data.token,
              module: 'system',
              action: 'screen'
            });
          }
        });
      }
      else { // ถ้ามี Error
        let alert = alertCtrl.create({
          title: global.message.error,
          subTitle: global.message['err' + data.error],
          buttons: [global.message.ok]
        });
        alert.present();
      }
    });


    /*## ข้อมูลส่วนตัว ##*/
    global.socket.on('api-member-info', function (data) {
      if (data.success) { // ถ้ามีข้อมูล
        global.member = data.result;
      }
    });

    /*## ข้อมูลหน้าจอระบบ ##*/
    global.socket.on('api-system-screen', function (data) {
      if (data.success) { // ถ้ามีข้อมูล
        global.memberScreen = data.result;

        global.isLogin = true;
        global.isMember = true;

        global.isShowMenu = true;
        storage.get('page').then((page) => {
          // Load หน้าจอที่เข้าล่าสุด
          if (page == undefined || page == 'signOut' || page == 'signIn') page = 'shopping';
          let success = false;
          for (let i=0; i<global.memberScreen.length; i++) {
            let screen = global.memberScreen[i].screen;
            for (let j=0; j<screen.length; j++) {
              if (screen[j].name == page) {
                success = true;
                navCtrl.setRoot(global.screen[screen[j].name].component, {
                  global: global
                });
                break;
              }
            }
            if (success) break;
          }
        });
      }
      else { // ถ้ามี Error
        let alert = alertCtrl.create({
          title: global.message.error,
          subTitle: global.message['err' + data.error],
          buttons: [global.message.ok]
        });
        alert.present();
      }
    });


    global.socket.on('api-member-profile', function (data) {
      if (data.success) { // ถ้ามีข้อมูล
        global.role = [];
        for (let i = 0; i < data.result.role.length; i++) {
          let msg = data.result.role[i].charAt(0).toUpperCase() + data.result.role[i].slice(1);
          let MemberType: any = { title: 'role' + msg, type: data.result.role[i] };
          global.role.push(MemberType);
        }
      }
    });

    // Update ประเภทสมาชิก
    global.socket.on('api-member-updateType', function (data) {
      if (data.success) { // ถ้ามีข้อมูล
        global.member.type = data.type;
        storage.get('token').then((token) => {
          global.socket.emit('api', {
            token: token,
            module: 'system',
            action: 'screen'
          });
        });
      }
    });

  }

  openPage(page) {
    let storage = new Storage(LocalStorage);
    if (page.title == 'signIn' || page.title == 'signOut') {
      this.global.socket.emit('access', { token: '' });
      //storage.remove('token');
      this.menu.close().then(() => {

        storage.set('page', page.title);
        /*try {
          storage.set('isLogin', '0').then(() => {
            storage.set('isMember', '0').then(() => {*/
        this.global.isLogin = false;
        this.global.isMember = false;
        this.global.isShowMenu = false;
        this.nav.setRoot(LoginPage, {
          global: this.global
        });
        /*});
      });
    } catch (e) {
      alert(e.message);
    }*/
      });
    }
    else {
      storage.set('page', page.title).then(() => {
        this.nav.setRoot(page.component, {
          global: this.global
        });
      });
    }
  }

}

ionicBootstrap(RemaxApp);
