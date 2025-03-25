import { TaskService } from './task.service';
import { TestBed } from '@angular/core/testing';

describe('TaskService', () => {
  let service: TaskService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskService],
    });
    service = TestBed.inject(TaskService);
    service.tasks.set([
      {
        id: 'alpha',
        label: 'Alpha',
        done: false,
        order: 0,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        expirationDate: null,
      },
      {
        id: 'charlie',
        label: 'Charlie',
        done: true,
        order: 1,
        createdAt: new Date('2025-01-03T00:00:00Z'),
        expirationDate: new Date('2025-02-02T00:00:00Z'),
      },
      {
        id: 'beta',
        label: 'Beta',
        done: false,
        order: 2,
        createdAt: new Date('2025-01-02T00:00:00Z'),
        // Date du jour + 2 jours
        expirationDate: new Date(
          new Date().getTime() + 2 * 24 * 60 * 60 * 1000
        ),
      },
    ]);
  });
  describe('CRUD on tasks', () => {
    it('should return two tasks when adding a new task', () => {
      service.addNewTask({
        id: 'gamma',
        label: 'Gamma',
        done: false,
        order: 3,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        expirationDate: null,
      });
      expect(service.tasks().length).toBe(4);
    });

    it('should return zero task when deleting a task', () => {
      service.removeTask('alpha');
      expect(service.tasks().length).toBe(2);
    });

    it('should return true when a task is checked', () => {
      service.markAsDone('alpha');
      expect(service.tasks()[0].done).toBe(true);
    });

    it('should return the new label when updating a task', () => {
      service.updateLabel('alpha', 'Zeta');
      expect(service.tasks()[0].label).toBe('Zeta');
    });

    it('should return the new expiration date when updating a task', () => {
      service.updateExpirationDate('alpha', new Date('2025-01-01T00:00:00Z'));
      expect(service.tasks()[0].expirationDate).toEqual(
        new Date('2025-01-01T00:00:00Z')
      );
    });

    it('should remove the expiration date when sending null', () => {
      service.updateExpirationDate('beta', null);
      expect(service.tasks()[2].expirationDate).toBeNull();
    });

    it('should retun the correct number of tasks', () => {
      expect(service.countTotalTasks()).toBe(3);
    });

    it('should return the correct number of done tasks', () => {
      expect(service.countDoneTasks()).toBe(1);
    });
  });

  describe('Filter tasks list', () => {
    it('should return only done tasks', () => {
      service.filterType.set('done');
      expect(service.filteredTasks().length).toBe(1);
    });

    it('should return only todo tasks (all that are not done)', () => {
      service.filterType.set('todo');
      expect(service.filteredTasks().length).toBe(2);
    });

    it('should return only tasks that are soon expiring (< 7days)', () => {
      service.filterType.set('soonExpiring');
      expect(service.filteredTasks().length).toBe(1);
    });

    it('should return only tasks that are expired', () => {
      service.filterType.set('expired');
      expect(service.filteredTasks().length).toBe(1);
    });
  });

  describe('Sort tasks list', () => {
    it('should return tasks sorted by default order', () => {
      service.sortType.set('drag');
      expect(service.sortedTasks()[0].id).toBe('alpha');
      expect(service.sortedTasks()[1].id).toBe('charlie');
      expect(service.sortedTasks()[2].id).toBe('beta');
    });
    it('should return tasks sorted by creation Date order', () => {
      service.sortType.set('dateCreatedNewest');
      expect(service.sortedTasks()[0].id).toBe('charlie');
      expect(service.sortedTasks()[1].id).toBe('beta');
      expect(service.sortedTasks()[2].id).toBe('alpha');
    });
    it('should return tasks sorted by alphetical order', () => {
      service.sortType.set('alphaAZ');
      expect(service.sortedTasks()[0].id).toBe('alpha');
      expect(service.sortedTasks()[1].id).toBe('beta');
      expect(service.sortedTasks()[2].id).toBe('charlie');
    });
    it('should return tasks sorted by expiration date order', () => {
      service.sortType.set('expirySoonest');
      expect(service.sortedTasks()[0].id).toBe('charlie');
      expect(service.sortedTasks()[1].id).toBe('beta');
      expect(service.sortedTasks()[2].id).toBe('alpha');
    });
  });

  describe('Search in tasks list', () => {
    it('should return only tasks that match the search query', () => {
      service.searchQuery.set('al');
      expect(service.filteredTasks().length).toBe(1);
    });
  });

  describe('Save/Load tasks to/from local storage', () => {
    it('should save and return tasks from local storage', () => {
      const tasks = service.tasks();
      service.saveTasks(service.tasks());
      service.loadTasks();
      expect(service.tasks()).toEqual(tasks);
    });
  });
});
