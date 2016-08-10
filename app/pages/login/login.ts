import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {CordovaOauth, Facebook} from 'ng2-cordova-oauth/core';

import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  cordovaOauth: any;

  constructor(private navCtrl: NavController, public platform: Platform, public http: Http) {
    this.cordovaOauth = new CordovaOauth(new Facebook({ clientId: "337592559713793", appScope: ["email,public_profile"] }));
  }

  login() {
    this.platform.ready().then(() => {
      this.cordovaOauth.login().then((success) => {
        //alert("RESULT: " + JSON.stringify(success));
        let url = 'https://graph.facebook.com/me/fql?q=select%20name,email%20from%20user%20where%20uid=me()&access_token='+success.access_token;
        alert('url='+url);
        //, {params: {access_token: access_token, fields: "name,gender,location,picture", format: "json" }}).then(function(result) {
        var response = this.http.get(url).map(res => res.json());
        alert("RESULT: " + JSON.stringify(response));
      }, (error) => {
        alert(error);
      });
    });
  }

}
