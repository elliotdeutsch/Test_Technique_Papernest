import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
})
export class ActionButtonsComponent implements OnInit {
  @Input() icon: string = '';
  @Input() tooltip: string = '';

  @Output() clicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {}

  handleClick(): void {
    this.clicked.emit();
  }
}
