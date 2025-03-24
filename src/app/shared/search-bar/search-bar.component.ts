import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
  public searchValue: string = '';
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  public searchTask(): void {
    this.taskService.searchQuery.set(this.searchValue);
  }
}
