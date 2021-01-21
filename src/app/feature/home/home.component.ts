import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FilterDataService} from '../../shared/service/filter-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private filterDataService: FilterDataService
  ) { }

  ngOnInit(): void {
  }

  selectCategory(event: string){
    this.router.navigate(['shop']);
    localStorage.setItem('filterKey', event);
    localStorage.setItem('page', '1');
    this.filterDataService.setFilterOption(event,'all',1);
  }
}
