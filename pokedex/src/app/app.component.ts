import { Component } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  alert = null;

  constructor(private network: Network, public alertController: AlertController) {

    this.alertController.create({
      cssClass: '',
      header: 'No internet',
      subHeader: 'Please reconnect to continue.',
      // message: 'No internet.',
      buttons: [],
      backdropDismiss: false
    }).then((a) => {
      this.alert = a;
      this.alert.present();
      this.alert.dismiss();
      this.alert = null;
    });

    // initializeApp() {
    // this.platform.ready().then(() => {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected.');
      this.alertController.create({
        cssClass: '',
        header: 'No internet',
        subHeader: 'Please reconnect to continue.',
        // message: 'No internet.',
        buttons: [],
        backdropDismiss: false
      }).then((a) => {
        this.alert = a;
        this.alert.present();
      });
    });

    let connectSubscription = this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        console.log('network connected.');
        this.alert.dismiss();
        this.alert = null;
      }, 1000);
    });
    // });
  }

}
