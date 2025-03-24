import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-color-mode-button',
  templateUrl: './color-mode-button.component.html',
  styleUrls: ['./color-mode-button.component.scss'],
  imports: [CommonModule, MatTooltipModule],
  standalone: true,
})
export class ColorModeButtonComponent implements OnInit {
  public isDarkMode = false;
  constructor() {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isDarkMode = localStorage.getItem('isDarkMode') === 'true';
      if (this.isDarkMode) {
        document.body.classList.add('dark');
      }
    }
  }

  public changeColorMode(): void {
    document.body.classList.toggle('dark');
    this.isDarkMode = !this.isDarkMode;
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isDarkMode', this.isDarkMode.toString());
    } else {
      return;
    }
  }
}
