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
  pairedList: pairedList;
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

  selectDevice(){
    let connectedDevice = this.pairedList[this.pairedDeviceID];
    if(!connectedDevice.address){
      this.showToast("Select paired device to connect");
      return;
    }
    let address = connectedDevice.address;
    let name = connectedDevice.name

    this.connect(address);
  }

  connect(address){
    this.bluetoothSerial.connect(address).subscribe(success =>{
      this.deviceConnected();
      this.showToast("Successfully connected");
      this.deviceConnected();
    }, error=>{
      this.showToast(error);
    });
  }

  deviceConnected(){
    this.bluetoothSerial.subscribe('ah\n').subscribe(success =>{
      this.showToast(success);
    }, error =>{
      this.showToast(error);
    });
  }

  getLastFile() {
    this.bluetoothSerial.write("get_previous\n").then(success =>{
      this.bluetoothSerial.read().then(success =>{
        this.showToast(success);
      }, error =>{
        this.showToast(error);
      });
    }, error =>{
      this.showToast(error);
    });

    /*return new Promise(resolve => {
      
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
    });*/
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
interface pairedList{
  "class": number,
  "id": string,
  "address": string,
  "name": string
}
