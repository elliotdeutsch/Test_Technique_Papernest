import { computed, effect, Injectable, signal } from '@angular/core';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public tasks = signal<Task[]>([]);
  public searchQuery = signal<string>('');
  public filterType = signal<
    'all' | 'done' | 'todo' | 'expired' | 'soonExpiring'
  >('all');
  public sortType = signal<
    'drag' | 'alphaAZ' | 'dateCreatedNewest' | 'expirySoonest'
  >('drag');

  // Liste des tâches filtrées
  public filteredTasks = computed<Task[]>(() => {
    let filtered = this.tasks();

    switch (this.filterType()) {
      case 'done':
        filtered = filtered.filter((task) => task.done);
        break;
      case 'todo':
        filtered = filtered.filter((task) => !task.done);
        break;
      case 'expired':
        filtered = filtered.filter(
          (task) => task.expirationDate && task.expirationDate < new Date()
        );
        break;
      case 'soonExpiring':
        filtered = filtered.filter(
          (task) =>
            task.expirationDate &&
            task.expirationDate <
              new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) &&
            task.expirationDate > new Date()
        );
        break;
      case 'all':
      default:
        break;
    }

    if (this.searchQuery()) {
      filtered = filtered.filter((task) =>
        task.label.toLowerCase().includes(this.searchQuery().toLowerCase())
      );
    }

    return filtered;
  });

  public sortedTasks = computed<Task[]>(() => {
    let sorted = [...this.filteredTasks()];

    switch (this.sortType()) {
      case 'alphaAZ':
        sorted = sorted.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case 'dateCreatedNewest':
        sorted = sorted.sort(
          (a, b) =>
            (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
        );
        break;
      case 'expirySoonest':
        sorted = sorted.sort((a, b) => {
          if (!a.expirationDate && !b.expirationDate) {
            return 0;
          }
          if (!a.expirationDate) {
            return 1;
          }
          if (!b.expirationDate) {
            return -1;
          }
          return a.expirationDate.getTime() - b.expirationDate.getTime();
        });
        break;
      case 'drag':
      default:
        break;
    }
    return sorted;
  });

  constructor() {
    this.loadTasks();
    // Sauvegarde automatique des tâches à chaque modification
    effect(() => {
      this.saveTasks(this.tasks());
    });
  }

  // Récupération des tâches sauvegardées
  public loadTasks(): Task[] {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedTasks = localStorage.getItem('Saved Tasks');
      if (savedTasks) {
        const parsedTasks: Task[] = JSON.parse(savedTasks);
        parsedTasks.forEach((task) => {
          if (task.expirationDate) {
            task.expirationDate = new Date(task.expirationDate);
          }
          if (task.createdAt) {
            task.createdAt = new Date(task.createdAt);
          }
        });

        this.tasks.set(parsedTasks);
      }
    }
    return this.tasks();
  }

  // Sauvegarde des tâches
  public saveTasks(tasks: Task[]): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('Saved Tasks', JSON.stringify(tasks));
    }
  }

  // Ajout d'une nouvelle tâche
  public addNewTask(newTask: Task): void {
    const currentTasks = this.tasks();
    newTask.order = currentTasks.length;
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  // Suppression d'une tâche
  public removeTask(taskId: string): void {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== taskId));
  }

  // Marque une tâche comme terminée
  public markAsDone(taskId: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  }

  // Met à jour le titre d'une tâche
  public updateLabel(taskId: string, newLabel: string): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, label: newLabel } : task
      )
    );
  }

  // Met à jour la date d'expiration d'une tâche
  public updateExpirationDate(taskId: string, newDate: Date | null): void {
    this.tasks.update((tasks) =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, expirationDate: newDate } : task
      )
    );
  }

  // Compte le nombre total de tâches
  public countTotalTasks(): number {
    return this.tasks().length;
  }

  // Compte le nombre de tâches terminées
  public countDoneTasks(): number {
    return this.tasks().filter((task) => task.done).length;
  }
}
