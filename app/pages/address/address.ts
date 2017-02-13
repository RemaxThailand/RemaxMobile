import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Storage, LocalStorage, LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/address/address.html',
})
export class AddressPage {

  global: any;
  step = 1;
  name = {
    province: 'xxx',
    district: 'yyy',
    subDistrict: 'zzz'
  };
  provinceList: any;
  province = '1';
  provinceTmp = '0';
  districtList = {};
  district = '1';
  districtTmp = '0';
  subDistrictList = {};
  subDistrict = '1';
  zipcode = '';

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private loadingCtrl: LoadingController) {
    this.global = this.navParams.get('global');
    this.province = this.navParams.get('province');

    this.provinceList = {};

    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'system',
        action: 'province',
        langCode: this.global.langCode
      });
    });

    /*let loader = this.loadingCtrl.create({
      content: this.global.message.pleaseWait + "...",
    });
    loader.present();*/

    this.global.isLoaded = false;

    var timer = setInterval(() => {
      if(this.global.isLoaded) {
        this.provinceList = this.global.subData;
        clearInterval(timer);
        //loader.dismiss();
      }
    }, 500);

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  setSelectedName(type){
    if(type == 'province'){
      for(let data of this.provinceList){
        if(data.id == this.province)
        this.name[type] = data.name;
      }
    }
    this.next();
  }

  back() {
    this.step--;
  }

  next() {
    this.step++;
    if( this.step == 2 && this.province != this.provinceTmp){
      this.provinceTmp = this.province;
      let storage = new Storage(LocalStorage);
      storage.get('token').then((token) => {
        this.global.socket.emit('api', {
          token: token,
          module: 'system',
          action: 'district',
          province: this.province,
          langCode: this.global.langCode
        });

        this.global.isLoaded = false;
        var timer = setInterval(() => {
          if(this.global.isLoaded) {
            this.districtList = this.global.subData;
            this.district = this.districtList[0].id;
            clearInterval(timer);
          }
        }, 500);

      });
    }
    else if( this.step == 3 && this.district != this.districtTmp){
      this.districtTmp = this.district;
      let storage = new Storage(LocalStorage);
      storage.get('token').then((token) => {
        this.global.socket.emit('api', {
          token: token,
          module: 'system',
          action: 'sub_district',
          province: this.province,
          district: this.district,
          langCode: this.global.langCode
        });

        this.global.isLoaded = false;
        var timer = setInterval(() => {
          if(this.global.isLoaded) {
            this.subDistrictList = this.global.subData;
            this.subDistrict = this.subDistrictList[0].id;
            clearInterval(timer);
          }
        }, 500);

      });
    }
  }

}
