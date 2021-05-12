import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core'
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  searchValue(value: any){
    this.newItemEvent.emit(value)
    console.log(value);
  }
}
