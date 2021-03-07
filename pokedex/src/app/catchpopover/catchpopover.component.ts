import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-catchpopover',
  templateUrl: './catchpopover.component.html',
  styleUrls: ['./catchpopover.component.scss'],
})
export class CatchpopoverComponent implements OnInit {

  didClick = false;
  canClick = false;
  started = false;

  constructor(private vibration: Vibration, private popoverController: PopoverController) { }

  ngOnInit() {
    this.canClick = false;
    this.started = false;
    console.log(this.popoverController)
  }

  public startcatching(e) {
    let msToVibrate = Math.floor(Math.random() * 3000) + 500;
    let msToClick = Math.floor(Math.random() * 500) + 200;
    this.didClick = false;
    this.started = true;

    setTimeout(() => {
      this.canClick = true;
      this.vibration.vibrate(1000);
      setTimeout(() => {
        this.canClick = false;
        if (this.didClick) {
          this.didCatch();
        } else {
          this.didNotCatch();
        }
        this.didClick = false;
        this.started = false;
      }, msToClick);
    }, msToVibrate);
  }

  private didCatch() {
    this.popoverController.dismiss({
      "success": true
    });
  }

  private didNotCatch() {
    this.popoverController.dismiss({
      "success": false
    });
  }

  public catchbtn(e) {
    this.didClick = true;
  }

}
