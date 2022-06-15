import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itens } from './itens';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private _httpClient: HttpClient) { }

  private url = "https://jsonplaceholder.typicode.com/todos";
  

  getItens() : Observable<Itens[]>{
    return this._httpClient.get<Itens[]>(this.url);
  }

  postItens(item: Itens) {
    return this._httpClient.post<Itens>(this.url, item);
  }

  deleteItens(item: Itens) {
    var id = item.id;
    return this._httpClient.delete<Itens>(this.url + "/" + id);
  }
}
