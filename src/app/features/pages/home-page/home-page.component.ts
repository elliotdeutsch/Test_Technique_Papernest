import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskService } from '../../../core/services/task.service';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from '../../../shared/search-bar/search-bar.component';
import { HeaderComponent } from '../../../shared/header/header.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';
import { ResetButtonComponent } from '../../../shared/buttons/reset-button/reset-button.component';
import { AddTaskFieldComponent } from '../../../shared/add-task-field/add-task-field.component';
import { ColorModeButtonComponent } from '../../../shared/buttons/color-mode-button/color-mode-button.component';
import { DropdownButtonComponent } from '../../../shared/buttons/dropdown-button/dropdown-button.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatBadgeModule,
    MatTooltipModule,
    HeaderComponent,
    TaskListComponent,
    SearchBarComponent,
    ResetButtonComponent,
    AddTaskFieldComponent,
    DropdownButtonComponent,
    ColorModeButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public newTaskExpirationDate: Date | string = '';
  constructor(public taskService: TaskService) {}

  ngOnInit() {}

  // Filtre les tâches en fonction du type sélectionné
  public setFilterType(type: string): void {
    this.taskService.filterType.set(
      type as 'all' | 'done' | 'todo' | 'soonExpiring' | 'expired'
    );
  }

  // Trie les tâches en fonction du type sélectionné
  public setSortType(type: string): void {
    this.taskService.sortType.set(
      type as 'drag' | 'alphaAZ' | 'dateCreatedNewest' | 'expirySoonest'
    );
  }
}
