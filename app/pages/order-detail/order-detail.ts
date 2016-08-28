import { Component } from '@angular/core';
import { NavController, ViewController, ActionSheetController, AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/order-detail/order-detail.html',
})
export class OrderDetailPage {

  viewType: string;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private actionSheetController: ActionSheetController, private alertCtrl: AlertController) {
    this.viewType = 'images';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  changeView(viewType){
    this.viewType = viewType;
  }

  checkConfirm() {
    let actionSheet = this.actionSheetController.create({
      title: 'สถานะ',
      buttons: [
        {
          text: 'ครบ',
	  icon: 'checkmark-circle',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'ขาด',
	  icon: 'warning',
          handler: () => {
		let actionSheetDismiss  = actionSheet.dismiss();
		actionSheetDismiss.then(() => {
			this.inputLostQty();
		});
          }
        },{
          text: 'ปิด',
	  icon: 'undo',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

	inputLostQty() {
		let prompt = this.alertCtrl.create({
			title: 'สินค้าขาด',
			message: "กรุณากรอกจำนวนสินค้าที่ขาด",
			inputs: [
				{
					name: 'title',
					type: 'number',
					placeholder: 'จำนวน'
				},
			],
			buttons: [
			{
				text: 'ยกเลิก',
				role: 'cancel'
			},
			{
				text: 'บันทึกข้อมูล',
				handler: data => {
					return true;
				}
			}
			]
		});
		prompt.present();
	}

}
