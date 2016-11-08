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



    /*this.role = [
      { title: 'roleAdministrator', type: 'admin' },
      { title: 'roleOwner', type: 'owner' },
      { title: 'roleManager', type: 'manager' },
      { title: 'roleHeadSale', type: 'headSale' },
      { title: 'roleSale', type: 'sale' },
      { title: 'roleDealer', type: 'dealer' },
      { title: 'roleMember', type: 'member' },
      { title: 'roleDeveloper', type: 'developer' },
      { title: 'roleOfficer', type: 'officer' }
    ];

    var push = Push.init({
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
        // data.message,
        // data.title,
        // data.count,
        // data.sound,
        // data.image,
        // data.additionalData
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
          /*let local = new Storage(LocalStorage);
          local.set('memberType', type).then(() => {
            this.global.memberType = type;
            this.global.updateRoleMenu();
          });*/
          //console.log(role.type+' clicked');
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

  /*updateRoleMenu() {
    for (var menu in this.global.menuGroup) {
      let json = this.global.menuGroup[menu];
      let hasChild = false;
      for (var idx in json) {
        if(this.global.memberMenu[this.global.memberType].indexOf('|'+json[idx].title+'|') != -1){
          json[idx].isShow = true;
          hasChild = true;
        }
        else {
          json[idx].isShow = false;
        }
      }
      this.global.menuDividerShow[menu] = hasChild;
    }
  }*/

}
