import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { book } from '@buyonline/shared/data-access/models';
import { BooksFacade } from '@buyonline/shared/data-access/state';

@Component({
  selector: 'buyonline-my-collection-layout',
  templateUrl: './my-collection-layout.component.html',
  styleUrls: ['./my-collection-layout.component.scss'],
})
export class MyCollectionLayoutComponent implements OnInit {
  myCollectionList: Array<book> = [];
  constructor(private booksFacade: BooksFacade, private router: Router) {}

  ngOnInit(): void {
    this.booksFacade.myCollection$.subscribe((data) => {
      this.myCollectionList = [...data];
    });
  }
}
