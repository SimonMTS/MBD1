import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @Input() url: string;

  imgurl: string;

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {
    console.log(this.url);
    this.httpClient.get(this.url).subscribe(res => {
      console.log(res);
      this.imgurl = res["sprites"]["front_default"];
    });
  }

}
