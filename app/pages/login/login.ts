import { Component } from '@angular/core';
import { ControlGroup, AbstractControl, FormBuilder } from '@angular/common';
import { NavController, Platform, Storage, SqlStorage } from 'ionic-angular';
//import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';
import { Facebook, BarcodeScanner } from 'ionic-native';
import { Global } from '../../providers/global/global';
import { ProductPage } from '../product/product';

@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  test: any = 'test';
  form: ControlGroup;
  username: AbstractControl;
  passwrd: AbstractControl;

  constructor(private navCtrl: NavController, public platform: Platform, public global: Global, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({username: [''], password: ['']});

    /*this.global.storage.get('token').then((token) => {
      this.global.token = token;
    });*/


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
    /*this.global.storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module:'member',
        action:'login',
        memberType: 'local',
        username: this.form.controls['username'].value,
        password: this.form.controls['password'].value
      });
    });*/
    this.loginSuccess();
  }

  loginSuccess() {
    this.global.storage.set('isLogin', '1').then(() => {
      this.global.storage.set('isMember', '1').then(() => {
        this.global.isLogin = true;
        this.global.isMember = true;
        this.global.isShowMenu = true;
        this.navCtrl.setRoot(ProductPage);
        this.global.setShowHideMenu('|history|profile|logout|', '|login|');
      });
    });
  }

  skipLogin() {
    this.global.storage.set('isLogin', '1').then(() => {
      this.global.storage.set('isMember', '0').then(() => {
        this.global.isLogin = true;
        this.global.isMember = false;
        this.global.isShowMenu = true;
        this.navCtrl.setRoot(ProductPage);
        this.global.setShowHideMenu('|login|', '|history|profile|logout|');
      });
    });
  }

  googleLogin() {
    this.platform.ready().then(() => {
      BarcodeScanner.scan().then((barcodeData) => {
        this.test = JSON.stringify(barcodeData);
      }, function(error) {
        this.test = 'error : ' + error;
      })
    })
  }

  facebooklogin() {
    this.platform.ready().then(() => {
      // ตรวจสอบว่า Login แล้วหรือยัง
      Facebook.getLoginStatus().then((result) => {
        this.test = JSON.stringify(result);
        if (result.status == 'unknown') {
          this.test = 'status : ' + result.status;
          Facebook.login(["public_profile", "email"]).then((result) => {
            this.test = 'result : ' + JSON.stringify(result);
            this.getFacebokInfo(result.authResponse.userID);
          }, function(error) {
            this.test = 'error : ' + error;
          })
        }
        else if (result.status == 'connected') {
          this.global.storage.get('member').then((member) => {
            let json = JSON.parse(member);
            if(member.type == 'facebook'){
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
      this.global.member.picture = 'http://graph.facebook.com/'+userID+'/picture?type=square';
      this.global.member.name = result.name;
      this.global.member.gender = result.gender;
      //this.test = 'result : ' + JSON.stringify(result);
      try{
        //let storage = new Storage(SqlStorage);
        this.global.storage.set('member', JSON.stringify(this.global.member)).then(() => {
          this.loginSuccess();
        });
      } catch(e){
        alert(e.message);
      }
    }, function(error) {
      this.test = 'error : ' + error;
    })
  }

}
