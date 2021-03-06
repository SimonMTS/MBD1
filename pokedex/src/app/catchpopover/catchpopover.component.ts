import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-catchpopover',
  templateUrl: './catchpopover.component.html',
  styleUrls: ['./catchpopover.component.scss'],
})
export class CatchpopoverComponent implements OnInit {

  constructor(private vibration: Vibration) { }

  ngOnInit() { }

  public startcatching(e) {
    console.log("qeqeqeqweqweqeqeqweqeq");
    this.vibration.vibrate(1000);
  }

}
