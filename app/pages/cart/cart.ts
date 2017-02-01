import { Component } from '@angular/core';
import { NavController, NavParams, Storage, LocalStorage, LoadingController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/cart/cart.html',
})
export class CartPage {

  global: any;
  viewType: string;
  product: any;
  total: any = {
    qty: 0,
    price: 0
  };

  constructor(private navCtrl: NavController, private navParams: NavParams, private loadingCtrl: LoadingController) {
    this.global = this.navParams.get('global');
    
    this.global.data = {};    
    this.global.isLoaded = false;
    let loader = this.loadingCtrl.create({
      content: this.global.message.pleaseWait+"...",
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

  updateQty(index, qty) {
    this.product[index].qty = Number(this.product[index].qty)+qty;
    
    if(this.product[index].qty == 0) {
      this.product[index].qty = 1;
    }

    if(this.product[index].qty > this.product[index].stock){
      this.product[index].qty = this.product[index].stock;
    }

    this.calculateTotal();
  }

  calculateTotal(){
    this.total.price = 0;
    this.total.qty = 0;
    for(let i=0; i<this.product.length; i++){
      this.total.qty += Number(this.product[i].qty);
      this.total.price += Number(this.product[i].qty)*Number(this.product[i].price);
    }
  }

}
