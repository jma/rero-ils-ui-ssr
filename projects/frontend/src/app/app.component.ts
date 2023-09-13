import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  query = '*';
  results = [];
  items: MenuItem[] = [
    {
      label: 'Tools',
      icon: 'pi pi-shopping-cart',
      items: [
        {
          label: 'Help',
          icon: 'pi pi-question',
        },
      ],
    },
  ];
  constructor(private http: HttpClient) {
    this.search(this.query);
  }

  onEnter(event: Event) {
    this.search(this.query);
  }

  search(query: string) {
    this.http.get(`https://ilsdev.test.rero.ch/api/documents/?q=${query}`).subscribe((res: any) => {
      if (res?.hits?.hits) {
        this.results = res.hits.hits;
      }
    });
  }
}
