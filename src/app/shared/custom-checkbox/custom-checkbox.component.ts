import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCheckboxComponent implements OnInit {
  @Input() isChecked: boolean = false;
  @Output() checked = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}

  public onCheckboxChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.checked.emit(inputElement.checked);
  }
}
