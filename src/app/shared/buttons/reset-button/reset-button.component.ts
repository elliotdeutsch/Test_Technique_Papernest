import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss'],
  standalone: true,
  imports: [],
})
export class ResetButtonComponent implements OnInit {
  constructor(public taskService: TaskService) {}

  ngOnInit() {}

  public resetTasks() {
    this.taskService.filterType.set('all');
  }
}
