import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';
import { Facebook } from 'ionic-native';


/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  test: any = 'test';

  constructor(private navCtrl: NavController, public platform: Platform) {
    //this.cordovaOauth = new CordovaOauth(new Facebook({ clientId: "337592559713793", appScope: ["email,public_profile"] }));
  }

  fblogin(){
      this.platform.ready().then(() => {
        /*Facebook.login(["public_profile","email"]).then((result) => {
          //result.accessToken;
          this.test = JSON.stringify(result);
          alert(JSON.stringify(result));
        })*/
        Facebook.login(["public_profile","email"]).then((result) => {
            //alert('Logged in');
            var userID = result.authResponse.userID;
            Facebook.api(result.authResponse.userID+"/?fields=id,email,birthday,picture,name,gender", ["public_profile","email","user_birthday"]).then((result) => {
              this.test = JSON.stringify(result);
                alert(JSON.stringify(result));
            }, function(error){
                alert('error '+error);
            })
            //alert(JSON.stringify(result));
            /*Facebook.getLoginStatus().then((result) => {
              this.test = JSON.stringify(result);
                alert(JSON.stringify(result));
            }, function(error){
                alert(error);
            })*/
        }, function(error){
            alert(error);
        })

        /*Facebook.getLoginStatus().then((result) => {
          this.test = JSON.stringify(result);
            alert(JSON.stringify(result));
        }, function(error){
            alert(error);
        })*/

      })
    }

}
