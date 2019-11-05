import { Component } from '@angular/core';
import { PostProvider } from '../../providers/post-provider';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  day: string = "";
  bedTime: string = "";
  minutes: string = "";
  wakeUpTime: string = "";
  wakeUpNumber: number = 0;
  bathroom: boolean = false;
  missedAlarm: boolean = false;
  constructor(private postProvider: PostProvider,
              private toastCtrl:ToastController){}

  submitResult(){
    return new Promise(resolve => {
      let day = this.day.substr(0, 10);
      let bedTime = this.bedTime.substr(0, 16);
      let minutes = this.minutes.substr(14, 2);
      let wakeUpTime = this.wakeUpTime.substr(0, 16)
      let body = {
        day : day,
        bedTime: bedTime,
        minutes: minutes,
        wakeUpNumber: this.wakeUpNumber,
        wakeUpTime: wakeUpTime,
        bathroom: this.bathroom,
        missedAlarm: this.missedAlarm
      };
      this.postProvider.postData(body, 'PSQI.php').subscribe(async data => {
          const toast = await this.toastCtrl.create({
            message: data,
            duration: 3000,
            position: 'top'
          });
          toast.present();
      });
    });
  }
}