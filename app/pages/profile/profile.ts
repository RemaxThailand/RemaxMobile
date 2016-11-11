import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Storage, LocalStorage } from 'ionic-angular';
import { LocalNotifications, Push } from 'ionic-native';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})

export class ProfilePage {

  global: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private actionSheetController: ActionSheetController) {
    this.global = this.navParams.get('global');


    /*## ข้อมูลส่วนตัว ##*/
    
    let storage = new Storage(LocalStorage);

    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'member',
        action: 'profile'
      });
    });

    /*var push = Push.init({
       android: {
           senderID: '3066538051'
       },
       ios: {
           alert: 'true',
           badge: true,
           sound: 'false'
       },
       windows: {}
    });

    push.on('registration', function(data) {
      alert('registration '+ JSON.stringify(data));
    });

    push.on('notification', function(data) {
      alert('notification '+ JSON.stringify(data) );
    });

    push.on('error', function(e) {
      alert(e.message);
        // e.message
    });*/

  }

  chengeMemberRole() {
    let actionSheet = this.actionSheetController.create({
      title: this.global.message.memberPosition
    });

    /*LocalNotifications.schedule({
        title: "Test Title",
        text: "Delayed Notification",
        at: new Date(new Date().getTime() + 5 * 1000),
        sound: null
    });*/

    for (let idx=0; idx<this.global.role.length; idx++) {
      let role = this.global.role[idx];
      actionSheet.addButton({
        text: this.global.message[role.title],
        handler: () => {
          let storage = new Storage(LocalStorage);
          storage.get('token').then((token) => {
            this.global.socket.emit('api', {
              token: token,
              module: 'member',
              action: 'updateType',
              type: role.type
            });
          });
        }
      });
    };

    actionSheet.addButton({
      text: this.global.message.cancel,
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    });
    actionSheet.present();
  }

}
