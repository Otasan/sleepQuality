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
    });
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
    this.bluetoothSerial.write("get\n").then(success =>{
      this.bluetoothSerial.readUntil('\n').then(success =>{
        this.uploadRecords(success);

      }, error =>{
        this.showToast(error);
      });
    }, error =>{
      this.showToast(error);
    });
  }

  uploadRecords(rec:string){
    let data:bluetoothReturn;
    data=JSON.parse(rec);
    if(data.type === "file"){
      data.data.forEach(r=>{
        this.postProvider.postData(r, "RecordLight.php").subscribe(done =>{
          this.showToast(done);
        });
      });
    }
    else{
      this.showToast(data.data);
    }
  }

  async showToast(data){
    const toast = await this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  /*dummyPayload(){
    let rec = '{"type":"file","file":"dummy.txt","data":[{"r":"99","g":"99","b":"99","c":"99","time":"2019-11-05 11:55:20"},{"r":"99","g":"99","b":"99","c":"99","time":"2019-11-05 12:00:20"}]}';
    this.uploadRecords(rec);
  }*/

}
interface pairedList{
  "class": number,
  "id": string,
  "address": string,
  "name": string
}

interface lightRecord{
  "r":number,
  "g":number,
  "b":number,
  "c":number,
  "time":string
}

interface bluetoothReturn{
  "type":string,
  "file":string,
  "data":lightRecord[]
}
