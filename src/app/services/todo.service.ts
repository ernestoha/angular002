import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Todo } from "../models/Todo";
import { Observable } from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private todosUrl: string = "https://jsonplaceholder.typicode.com/todos";
  private todosLimit = "?_limit=5";
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
    /*return [
      {
        id: 1,
        title: "Todo One",
        completed: false
      },
      {
        id: 2,
        title: "Todo Two",
        completed: true
      },
      {
        id: 1,
        title: "Todo Three",
        completed: false
      }
    ];*/
  }

  deleteTodo(todo: Todo): Observable<any> {
    console.log("deleteTodo Service...");
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.delete<Todo>(url, httpOptions);
  }

  toogleCompleted(todo: Todo): Observable<any> {
    const url = `${this.todosUrl}/${todo.id}`;
    return this.http.put(url, todo, httpOptions);
  }

  addTodo(todo: Todo): Observable<Todo> {
    console.log("AdTodo Service...");
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }
}
