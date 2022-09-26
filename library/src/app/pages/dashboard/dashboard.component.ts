import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  booksData :  any = []; 
  private loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private BooksService: BooksService,
  ) { }

  ngOnInit(): void {
    this.getAllBooks();

  }

  getAllBooks(){
    this.BooksService.get_books()
    .pipe(first())
    .subscribe(
        data => {
          if(data['status']  ==1){
            this.booksData = data['data'];
          }
          
          
        },
        error => {
            // this.alertService.error(error);
            this.loading = false;
        });
  }
}


