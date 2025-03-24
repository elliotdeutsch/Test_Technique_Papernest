import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TaskService } from '../../../core/services/task.service';

export interface DropdownItem {
  type: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-dropdown-button',
  templateUrl: './dropdown-button.component.html',
  styleUrls: ['./dropdown-button.component.scss'],
  standalone: true,
  imports: [CommonModule, MatMenuModule, MatBadgeModule, MatTooltipModule],
})
export class DropdownButtonComponent implements OnInit {
  @Input() buttonLabel: string = '';
  @Input() buttonIcon: string = '';
  @Input() items: DropdownItem[] = [];
  @Input() selectedType: string = 'all';
  @Input() activeCondition: boolean = false;
  @Input() badgeValue: string = '0';
  @Input() badgeHidden: boolean = true;

  @Output() select = new EventEmitter<string>();

  constructor(public taskService: TaskService) {}

  ngOnInit() {}

  public onSelect(type: string): void {
    this.select.emit(type);
  }
}
