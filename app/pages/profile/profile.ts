import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, Storage, LocalStorage } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
})

export class ProfilePage {

  global: any;
  role: any;

  constructor(private navCtrl: NavController, private navParams: NavParams, private actionSheetController: ActionSheetController) {
    this.global = this.navParams.get('global');
    this.role = [
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
  }

  chengeMemberRole() {
    let actionSheet = this.actionSheetController.create({
      title: this.global.language[this.global.langCode].memberPosition
    });

    for (var idx in this.role) {
      let type = this.role[idx].type;
      actionSheet.addButton({
        text: this.global.language[this.global.langCode][this.role[idx].title],
        handler: () => {
          let local = new Storage(LocalStorage);
          local.set('memberType', type).then(() => {
            this.global.memberType = type;
            this.global.updateRoleMenu();
          });
        }
      });
    };

    actionSheet.addButton({
      text: this.global.language[this.global.langCode].cancel,
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
