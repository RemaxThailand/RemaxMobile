import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Storage, LocalStorage, LoadingController, ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/address/address.html',
})
export class AddressPage {

  global: any;
  step = 0;
  firstname = '';
  mobile = '';
  shopName = '';
  address = '';
  address2 = '';
  name = {
    province: 'xxx',
    district: 'yyy',
    subDistrict: 'zzz'
  };
  provinceList: any;
  province = '1';
  provinceTmp = '0';
  districtList: any;
  district = '1';
  districtTmp = '0';
  subDistrictList: any;
  subDistrict = '1';
  subDistrictTmp = '0';
  zipcode = '';

  constructor(private navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController, private loadingCtrl: LoadingController, private toastCtrl: ToastController) {
    this.global = this.navParams.get('global');
    this.province = this.navParams.get('province');

    this.provinceList = {};
    this.districtList = {};
    this.subDistrictList = {};

    let storage = new Storage(LocalStorage);
    storage.get('token').then((token) => {
      this.provinceList = {};
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
        this.setSelectedName('province');
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
    else if(type == 'district'){
      for(let data of this.districtList){
        if(data.id == this.district)
        this.name[type] = data.name;
      }
    }
    else if(type == 'subDistrict'){
      for(let data of this.subDistrictList){
        if(data.id == this.subDistrict) {
          this.name[type] = data.name;
          this.zipcode = data.zipcode;
        }
      }
    }
  }

  back() {
    this.step--;
  }

  next() {
    if(this.step == 0 && (this.firstname.trim() == '' || this.mobile.trim() == '')){
      if(this.firstname.trim() == ''){
        let toast = this.toastCtrl.create({
          message: 'กรุณากรอกข้อมูล ' + this.global.message.firstname + '-' + this.global.message.lastname + ' ด้วยค่ะ',
          duration: 3000
        });
        toast.present();
      }
      else if(this.mobile.trim() == ''){
        let toast = this.toastCtrl.create({
          message: 'กรุณากรอกข้อมูล ' + this.global.message.mobilePhoneNumber + ' ด้วยค่ะ',
          duration: 3000
        });
        toast.present();
      }
    }
    else if( this.step == 1 && this.province != this.provinceTmp){
      this.global.isLoaded = false;
      this.provinceTmp = this.province;
      let storage = new Storage(LocalStorage);
      this.setSelectedName('province');
      storage.get('token').then((token) => {
        this.districtList = {};
        this.global.socket.emit('api', {
          token: token,
          module: 'system',
          action: 'district',
          province: this.province,
          langCode: this.global.langCode
        });

        var timer = setInterval(() => {
          if(this.global.isLoaded) {
            this.districtList = this.global.subData;
            this.district = this.districtList[0].id;
            clearInterval(timer);
          }
        }, 500);

      });
      this.step++;
    }
    else if( this.step == 2 && this.district != this.districtTmp){
      this.global.isLoaded = false;
      this.districtTmp = this.district;
      this.setSelectedName('district');
      let storage = new Storage(LocalStorage);
      storage.get('token').then((token) => {
        this.subDistrictList = {};
        this.global.socket.emit('api', {
          token: token,
          module: 'system',
          action: 'sub_district',
          province: this.province,
          district: this.district,
          langCode: this.global.langCode
        });

        var timer = setInterval(() => {
          if(this.global.isLoaded) {
            this.subDistrictList = this.global.subData;
            this.subDistrict = this.subDistrictList[0].id;
            clearInterval(timer);
          }
        }, 500);

      });
      this.step++;
    }
    else if( this.step == 3 && this.subDistrict != this.subDistrictTmp){
      this.subDistrictTmp = this.subDistrict;
      this.setSelectedName('subDistrict');
      this.step++;
    }
    else if( this.step == 4 && this.address.trim() == ''){
      if(this.address.trim() == ''){
        let toast = this.toastCtrl.create({
          message: 'กรุณากรอกข้อมูล ' + this.global.message.address + ' ด้วยค่ะ',
          duration: 3000
        });
        toast.present();
      }
    }
    else {
      this.step++;
    }
  }

  save() {
    this.global.isLoaded = false;
    this.step++;
  }

}
