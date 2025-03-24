import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-task-field',
  templateUrl: './add-task-field.component.html',
  styleUrls: ['./add-task-field.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class AddTaskFieldComponent implements OnInit {
  public newTaskLabel = '';

  constructor(public taskService: TaskService) {}

  ngOnInit() {}

  public addNewTask() {
    this.taskService.addNewTask({
      id: new Date().getTime().toString(),
      label: this.newTaskLabel,
      done: false,
      order: 0,
      createdAt: new Date(),
      expirationDate: null,
    });
    this.newTaskLabel = '';
    // this.newTaskExpirationDate = '';
  }
}
