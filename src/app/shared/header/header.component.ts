import {
  Component,
  effect,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TaskService } from '../../core/services/task.service';
import confetti from 'canvas-confetti';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class HeaderComponent {
  @ViewChild('confettiCanvas', { static: true })
  private confettiCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(public taskService: TaskService) {
    // Le contexte d’injection existe dans le constructor
    effect(() => {
      const total = this.taskService.countTotalTasks();
      const done = this.taskService.countDoneTasks();
      if (total > 0 && total === done) {
        this.launchConfetti();
      }
    });
  }

  private launchConfetti(): void {
    if (!this.confettiCanvas) return; // si jamais le canvas n’est pas initialisé

    const myConfetti = confetti.create(this.confettiCanvas.nativeElement, {
      resize: true,
    });
    myConfetti({
      particleCount: 200,
      spread: 160,
      origin: { y: 0.6 },
    });
  }
}
