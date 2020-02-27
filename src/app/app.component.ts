import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { Subscription } from '../../node_modules/rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Informacion Cuidadano';
  searchType = 'Cédula';
  results: any = [];
  subscription: Subscription;
  error: any = {
    title: '',
    exist: false
  };


  constructor(private service: ApiService) { }

  methodSearch(method, input) {
    if (this.searchType !== method) {
      this.searchType = method;
      input.value = '';
    }
  }


  getInfo(info: any) {
    let infoSearch = this.searchType === 'Nombre' ? info.value.toUpperCase() : info.value.toUpperCase();;
    this.subscription = this.service.getInfo(infoSearch).subscribe(
      (data: any) => {
        if (data.error) {
          this.error.title = data.error;
          this.error.exist = true;
          return;
        }
        if (this.error.exist) this.error.exist = false;
        this.results = data.results;


      },
      error => {
        this.error.title = 'Ingrese datos validos';
        this.error.exist = true;
      }
    );
    // this.subscription.unsubscribe();
  }
}

