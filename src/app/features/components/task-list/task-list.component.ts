import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { Task } from '../../../core/interfaces/task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../../core/services/task.service';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NoDataComponent } from '../../../shared/no-data/no-data.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  imports: [TaskItemComponent, CdkDrag, CdkDropList, NoDataComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent implements OnInit {
  public searchQuery: string = '';
  constructor(public taskService: TaskService) {}

  ngOnInit() {}

  public drop(event: CdkDragDrop<any>): void {
    this.taskService.tasks.update((currentTasks) => {
      const updatedTasks = [...currentTasks];
      moveItemInArray(updatedTasks, event.previousIndex, event.currentIndex);
      // On recalcule l'ordre de chaque tâche
      updatedTasks.forEach((task, index) => {
        task.order = index;
      });
      return updatedTasks;
    });
  }
}
