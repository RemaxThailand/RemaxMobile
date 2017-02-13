import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { ProductPage } from '../../pages/product/product';
import { AddressPage } from '../../pages/address/address';

@Component({
  templateUrl: 'build/pages/cart/cart.html',
})
export class CartPage {

  global: any;
  viewType: string;
  product: any;
  total: any = {
    qty: 0,
    price: 0,
    selectedPrice: 0,
    selectedQty: 0,
    selectedItem: 0
  };
  shippingPrice = 100;
  discountPercent = 5.5;
  discountPrice = 100;
  discountSelectedPrice = 0;
  isUpdate = false;

  step = 0;

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private modalCtrl: ModalController) {
    this.global = this.navParams.get('global');
    
    this.global.data = {};
    this.global.isLoaded = false;
    let loader = this.loadingCtrl.create({
      content: this.global.message.pleaseWait + "...",
    });
    loader.present();

    var timer = setInterval(() => {
      if(this.global.isLoaded) {
        this.product = this.global.data;
        this.calculateTotal();
        clearInterval(timer);
        loader.dismiss();
      }
    }, 500);

    this.viewType = 'box';
    this.total.price = 0;
    this.total.qty = 0;

    let storage = new Storage(LocalStorage);
    storage.get('shopping-viewType').then((viewType) => {
      if(viewType == null) {
        storage.set('shopping-viewType', this.viewType);
      }
      else {
        this.viewType = viewType;
      }
    });

    storage.get('token').then((token) => {
      this.global.socket.emit('api', {
        token: token,
        module: 'cart',
        action: 'detail'
      });      
    });
    
  }

  changeView(viewType){
    this.viewType = viewType;
    let storage = new Storage(LocalStorage);
    storage.set('shopping-viewType', this.viewType);
  }

  viewDetail(sku, name){
    this.global.subData = {};
    this.navCtrl.push(ProductPage, {
      global: this.global,
      sku: sku,
      name: name
    });
  }

  updateQty(index, qty) {
    this.product[index].qty = Number(this.product[index].qty)+qty;
    
    if(this.product[index].qty == 0) {
      this.product[index].qty = 1;
    }

    if(this.product[index].qty > this.product[index].maxQty){
      this.product[index].qty = this.product[index].maxQty;
    }
    this.isUpdate = true;
    this.calculateTotal();
  }

  selectItem(index) {
    this.product[index].selected = !this.product[index].selected;
    this.calculateTotal();
  }

  calculateTotal(){
    this.total.price = 0;
    this.total.qty = 0;
    this.total.selectedPrice = 0;
    this.total.selectedQty = 0;
    this.total.selectedItem = 0;
    this.discountPrice = 0;
    for(let i=0; i<this.product.length; i++){
      this.total.qty += Number(this.product[i].qty);
      this.total.price += Number(this.product[i].qty)*Number(this.product[i].price);
      if(this.product[i].selected == undefined){
        this.product[i].selected = false;
      }
      if(this.product[i].selected){
        this.total.selectedPrice += Number(this.product[i].qty)*Number(this.product[i].price);
        this.total.selectedQty += Number(this.product[i].qty);
        this.total.selectedItem++;
      }
    }
    this.discountPrice = this.discountPercent*this.total.price/100;
    this.discountSelectedPrice = this.discountPercent*this.total.selectedPrice/100;
  }

  deleteItem(product){
    let confirm = this.alertCtrl.create({
      title: 'นำสินค้าออกจากตะกร้า',
      message: 'คุณต้องการนำ <b>' + product.name + '</b> ออกจากออกจากตะกร้าสินค้าหรือไม่ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  deleteSelectedItem(){
    let confirm = this.alertCtrl.create({
      title: 'นำสินค้าออกจากตะกร้า',
      message: 'คุณต้องการนำ<b>สินค้าที่เลือกทั้งหมด</b>ออกจากออกจากตะกร้าสินค้าหรือไม่ ?',
      buttons: [
        {
          text: 'ยกเลิก',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  cartConfirm(){
    /*this.global.isLoaded = false;
    let loader = this.loadingCtrl.create({
      content: this.global.message.pleaseWait + "...",
    });
    loader.present();

    var timer = setInterval(() => {
      if(this.global.isLoaded) {
        clearInterval(timer);
        loader.dismiss();
      }
    }, 500);

    this.step++;
    this.global.isLoaded = true;*/


    let modal = this.modalCtrl.create(AddressPage, {
      global: this.global,
      province: 25
    });
    modal.present();

  }

}
