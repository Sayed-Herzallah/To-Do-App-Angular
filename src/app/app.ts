import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports:[FormsModule,CommonModule]
})

export class App {
  todos: Todo[] = [
    { id: 1, text: 'task1', completed: true },
    { id: 2, text: 'task2', completed: false },
    { id: 3, text: 'task3', completed: false },
    { id: 4, text: 'task2', completed: false }
  ];

  newTodoText: string = '';
  currentFilter: string = 'all';

  addTodo(): void {
    if (this.newTodoText.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodoText,
        completed: false
      });
      this.newTodoText = '';
    }
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;
  }

  getFilteredTodos(): Todo[] {
    if (this.currentFilter === 'active') {
      return this.todos.filter(t => !t.completed);
    }
    if (this.currentFilter === 'completed') {
      return this.todos.filter(t => t.completed);
    }
    return this.todos;
  }

  getTotalCount(): number {
    return this.todos.length;
  }

  getActiveCount(): number {
    return this.todos.filter(t => !t.completed).length;
  }

  getCompletedCount(): number {
    return this.todos.filter(t => t.completed).length;
  }
}
