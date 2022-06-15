import { Component, ViewChild } from '@angular/core';
import { Itens } from './itens';
import { ItemService } from './item.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public itens: Itens[] = [];
  
  title = 'ToDoList';
  list: any[] = [];
  placeholder = 'Escreva a tarefa';
  online = true;

  addTask(item: string) {
    if (window.navigator.onLine) {
      var tarefa = new Itens(this.itens.length + 1, item);
      this._itemService.postItens(tarefa).subscribe(Response => {
        this.listTasks();
      })
      this.list.push({ id: this.list.length + 1, item });
      console.log("online");
      //this.list.push({ id: this.list.length + 1, name: item });
      //console.warn(this.list);
    } else {
      /*this.list.push({ id: this.list.length + 1, item: item });*/
      this.online = false;
      console.log("offline");
    }
  }

  //addTaskOffline(item: string) {
  //  this.list.push({ id: this.list.length + 1, item: item })
  //}

  listTasks() {
    this._itemService.getItens().subscribe(
      retorno => {
        this.itens = retorno;
      }
    )
  }

  removeTask(id: number) {
    if (window.navigator.onLine) {
      var ItemId = new Itens(id, "");
      this._itemService.deleteItens(ItemId).subscribe(Response => {
        this.listTasks();
      })
      console.log("online remove");
    } else {
      this.list = this.list.filter(item => item.id !== id);
      console.log("offline remove");
    }
  }

  handleOffline() {
    if (window.navigator.onLine) {
      this.online = true;
    } else {
      this.online = false;
    }
  }

  //removeTaskOffline(id: number) {
  //  this.list = this.list.filter(item => item.id !== id);
  //}

  constructor(private _itemService: ItemService) { }
  

  ngOnInit() {
    this.listTasks();
    this.handleOffline();
  }

}

