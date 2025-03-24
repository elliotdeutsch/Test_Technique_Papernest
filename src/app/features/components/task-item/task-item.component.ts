import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Task } from '../../../core/interfaces/task';
import { CustomCheckboxComponent } from '../../../shared/custom-checkbox/custom-checkbox.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../core/services/task.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  normalizeDate,
  getDiffDaysFromToday,
} from '../../../core/utils/date-utils';
import { ActionButtonsComponent } from '../../../shared/buttons/action-buttons/action-buttons.component';

interface ExpirationInfo {
  cssClass: string;
  text: string;
}

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  standalone: true,
  imports: [
    CustomCheckboxComponent,
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatTooltipModule,
    ActionButtonsComponent,
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task = {
    id: '',
    label: 'Nouvelle tâche',
    done: false,
    order: 0,
    createdAt: new Date(),
  };

  public isChecked: boolean = false;
  public isEditMode: boolean = false;
  public isSetExpirationMode: boolean = false;
  public temporaryExpDate: Date | null = null;
  public todaysDate = normalizeDate(new Date())!;

  // Permet de récupérer l'élément input de l'édition
  @ViewChild('editInput') editInput!: ElementRef<HTMLInputElement>;

  constructor(public taskService: TaskService) {}

  ngOnInit() {
    this.isChecked = this.task.done;
  }

  // Modifie le statut de la tâche
  public changCheckboxState(event: boolean): void {
    this.isChecked = event;
    this.taskService.markAsDone(this.task.id);
  }

  // Active le mode édition
  public enableEditMode(): void {
    this.isEditMode = true;
    setTimeout(() => {
      this.editInput?.nativeElement.focus();
    });
  }

  // Enregistre le nouveau label
  public saveNewLabel(id: string, newLabel: string): void {
    this.taskService.updateLabel(id, newLabel);
    this.isEditMode = false;
  }

  // Active le mode d'édition de la date d'expiration
  public toggleExpirationMode(): void {
    this.isSetExpirationMode = !this.isSetExpirationMode;
  }

  // Enregistre la nouvelle date d'expiration
  public saveNewExpirationDate(id: string, newDate: Date | null): void {
    if (newDate) {
      newDate.setHours(23, 59, 59, 999);
    }
    this.taskService.updateExpirationDate(id, newDate || null);
    this.isSetExpirationMode = false;
  }

  // Supprime la date d'expiration
  public removeExpirationDate(id: string): void {
    this.taskService.updateExpirationDate(id, null);
    this.isSetExpirationMode = false;
  }

  // Renvoie la classe CSS et le libellé correspondant à la date d'expiration
  public getExpirationInfo(expirationDate: Date | null): ExpirationInfo {
    const diffDays = getDiffDaysFromToday(expirationDate);
    if (diffDays === null) {
      return { cssClass: '', text: '' };
    }

    let cssClass = '';
    let text = '';
    if (diffDays < 0) {
      cssClass = 'expired';
      text = `Expirée depuis ${Math.abs(diffDays)} jours`;
    } else if (diffDays === 0) {
      cssClass = 'today';
      text = "Expire aujourd'hui";
    } else if (diffDays === 1) {
      cssClass = '';
      text = 'Expire demain';
    } else {
      cssClass = '';
      text = `Expire dans ${diffDays} jours`;
    }
    return { cssClass, text };
  }
}
