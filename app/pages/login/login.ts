import { Component } from '@angular/core';
import { ControlGroup, AbstractControl, FormBuilder } from '@angular/common';
import { NavController, NavParams, Platform, Storage, LocalStorage } from 'ionic-angular';
//import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';
import { Facebook, BarcodeScanner } from 'ionic-native';
import { ShoppingPage } from '../shopping/shopping';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class LoginPage {
  global: any;
  form: ControlGroup;
  username: AbstractControl;
  passwrd: AbstractControl;
  alertControl: any;

  constructor(private platform: Platform, private navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder) {
    this.global = this.navParams.get('global');
    //this.global.alertCtrl = alertCtrl;
    this.form = formBuilder.group({ username: [''], password: [''] });
		/*let alert = this.alertCtrl.create({
			title: 'title',
			subTitle: 'subTitle',
			buttons: [this.global.language.th.ok]
		});
		alert.present();*/


    //this.global.test();


    //this.cordovaOauth = new CordovaOauth(new Facebook({ clientId: "337592559713793", appScope: ["email,public_profile"] }));

    /*  this.global.socket.on('connect', function () {
        this.isOnline = true;
        alert('connect'+this.isOnline);
      });*/

    /*this.global.socket.on('disconnect', function () {
      this.isOnline = false;
      alert('disconnect'+this.isOnline);
    });*/

  }



  login() {
    let storage = new Storage(LocalStorage);

    storage.get('token').then((token) => {
      if (token == undefined || token == '') {
		  console.log('token undefined');
        this.global.socket.emit('access', { apiKey: this.global.apiKey });
      }
      else {
		  console.log('has token');
        this.global.socket.emit('api', {
          token: token,
          module: 'member',
          action: 'login',
          memberType: 'local',
          username: this.form.controls['username'].value,
          password: this.form.controls['password'].value
        });
      }
    });

  }

  loginSuccess() {
    let storage = new Storage(LocalStorage);
    storage.set('isLogin', '1').then(() => {
      storage.set('isMember', '1').then(() => {
        storage.set('memberType', 'member').then(() => {
          this.global.isLogin = true;
          this.global.isMember = true;
          this.global.isShowMenu = true;
          this.global.memberType = 'member';
          this.navCtrl.setRoot(ShoppingPage, {
            global: this.global
          });
          this.global.updateRoleMenu();
        });
      });
    });
  }

  skipLogin() {
    let storage = new Storage(LocalStorage);
    storage.set('isLogin', '1').then(() => {
      storage.set('isMember', '0').then(() => {
        storage.set('memberType', 'guest').then(() => {
          this.global.isLogin = true;
          this.global.isMember = false;
          this.global.isShowMenu = true;
          this.global.memberType = 'guest';
          this.navCtrl.setRoot(ShoppingPage, {
            global: this.global
          });
          this.global.updateRoleMenu();
        });
      });
    });
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

  googleLogin() {
    this.platform.ready().then(() => {
      BarcodeScanner.scan().then((barcodeData) => {
        //this.test = JSON.stringify(barcodeData);
      }, function(error) {
        //this.test = 'error : ' + error;
      })
    })
  }

  facebooklogin() {
    this.platform.ready().then(() => {
      // ตรวจสอบว่า Login แล้วหรือยัง
      Facebook.getLoginStatus().then((result) => {
        //this.test = JSON.stringify(result);
        if (result.status == 'unknown') {
          //this.test = 'status : ' + result.status;
          Facebook.login(["public_profile", "email"]).then((result) => {
            //this.test = 'result : ' + JSON.stringify(result);
            this.getFacebokInfo(result.authResponse.userID);
          }, function(error) {
            this.test = 'error : ' + error;
          })
        }
        else if (result.status == 'connected') {
          this.global.storage.get('member').then((member) => {
            let json = JSON.parse(member);
            if (member.type == 'facebook') {
              this.getFacebokInfo(member.id);
            }
            else {
              this.getFacebokInfo(result.authResponse.userID);
            }
          });
          //this.test = 'status : ' + result.status;
          //this.getFacebokInfo(result.authResponse.userID);
        }
        //alert(JSON.stringify(result));
      }, function(error) {
        this.test = 'error : ' + error;
      })
    })
  }

  getFacebokInfo(userID) {
    //this.loginSuccess();
    Facebook.api(userID + "/?fields=id,email,birthday,picture,name,gender", ["public_profile", "email"]).then((result) => {
      this.global.member.id = userID;
      this.global.member.type = 'facebook';
      this.global.member.email = result.email;
      this.global.member.birthday = result.birthday;
      this.global.member.picture = 'http://graph.facebook.com/' + userID + '/picture?type=square';
      this.global.member.name = result.name;
      this.global.member.gender = result.gender;
      //this.test = 'result : ' + JSON.stringify(result);
      try {
        //let storage = new Storage(SqlStorage);
        this.global.storage.set('member', JSON.stringify(this.global.member)).then(() => {
          this.loginSuccess();
        });
      } catch (e) {
        alert(e.message);
      }
    }, function(error) {
      this.test = 'error : ' + error;
    })
  }

}
