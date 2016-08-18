import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';
import { Facebook, BarcodeScanner } from 'ionic-native';
import { Global } from '../../providers/global/global';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage {
  test: any = 'test';

  constructor(private navCtrl: NavController, public platform: Platform, public global: Global) {
    //this.cordovaOauth = new CordovaOauth(new Facebook({ clientId: "337592559713793", appScope: ["email,public_profile"] }));
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
          this.test = 'status : ' + result.status;
          this.getFacebokInfo(result.authResponse.userID);
        }
        //alert(JSON.stringify(result));
      }, function(error) {
        this.test = 'error : ' + error;
      })
    })
  }

  getFacebokInfo(userID) {
    Facebook.api(userID + "/?fields=id,email,birthday,picture,name,gender", ["public_profile", "email"]).then((result) => {
      this.test = 'result : ' + JSON.stringify(result);
    }, function(error) {
      this.test = 'error : ' + error;
    })
  }

  skipLogin(){
    this.global.isShowMenu = true;
    this.global.menu.swipeEnable(true);
    this.global.menu.enable(true);
    this.navCtrl.setRoot(this.global.productPage);
    let hide = '|login|';
    for(let i=0; i<this.global.pages.length; i++){
      if(this.global.pages[i].isShow && hide.indexOf('|'+this.global.pages[i].id+'|') != -1){
        this.global.pages[i].isShow = false;
      }
    }
  }

}
