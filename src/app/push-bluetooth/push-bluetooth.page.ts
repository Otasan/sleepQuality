import { Component, OnInit } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { ToastController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { SubjectSubscriber } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-push-bluetooth',
  templateUrl: './push-bluetooth.page.html',
  styleUrls: ['./push-bluetooth.page.scss'],
})
export class PushBluetoothPage implements OnInit {
  pairedList: any;
  listToggle: boolean = false;
  pairedDeviceID : number = 0;

  constructor(private postProvider: PostProvider,
              private toastCtrl:ToastController,
              private bluetoothSerial:BluetoothSerial) {
    this.checkBluetoothEnabled();
  }

  ngOnInit() {
  }

  checkBluetoothEnabled(){
    this.bluetoothSerial.isEnabled().then(success => {
      this.listPairedDevices();
    }, error => {
      this.showToast("Please enable Bluetooth");
    });
  }

  listPairedDevices(){
    this.bluetoothSerial.list().then(success =>{
      this.pairedList = success;
      this.listToggle = true;
    })
  }

  getLastFile() {
    return new Promise(resolve => {
      //TODO: Connect to bluetooth and pull data
      let body = {
        r: 10,
        g: 10,
        b: 15,
        c: 12,
        temps: "2019-11-05"
      };
      this.postProvider.postData(body, "RecordLight.php").subscribe(data => {
        this.showToast(data);
      });
    });
  }

  async showToast(data){
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}
