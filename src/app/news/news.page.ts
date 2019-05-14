import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  buttonText = "back";
  buttonIcon = "add";

  constructor() { }

  ngOnInit() {
  }

}
