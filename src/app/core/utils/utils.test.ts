import {
  normalizeDate,
  getDifferenceDays,
  getDiffDaysFromToday,
} from './date-utils';

describe('Utils functions', () => {
  describe('normalizeDate', () => {
    it('should return null when passed null', () => {
      expect(normalizeDate(null)).toBeNull();
    });

    it('should normalize a date to midnight (local)', () => {
      const date = new Date('2025-12-15T13:45:30');
      const normalized = normalizeDate(date);
      // Vérifier que l'heure est 0:00:00.000
      expect(normalized?.getHours()).toBe(0);
      expect(normalized?.getMinutes()).toBe(0);
      expect(normalized?.getSeconds()).toBe(0);
      expect(normalized?.getMilliseconds()).toBe(0);
      // Vérifier que la date (année, mois, jour) est conservée
      expect(normalized?.getFullYear()).toBe(date.getFullYear());
      expect(normalized?.getMonth()).toBe(date.getMonth());
      expect(normalized?.getDate()).toBe(date.getDate());
    });
  });

  describe('getDifferenceDays', () => {
    it('should return 0 when both dates are the same', () => {
      const date1 = new Date('2025-01-01');
      const date2 = new Date('2025-01-01');
      expect(getDifferenceDays(date1, date2)).toBe(0);
    });

    it('should return -1 when the first date is one day before the second', () => {
      const date1 = new Date('2025-01-01');
      const date2 = new Date('2025-01-02');
      expect(getDifferenceDays(date1, date2)).toBe(-1);
    });

    it('should return 1 when the first date is one day after the second', () => {
      const date1 = new Date('2025-01-02');
      const date2 = new Date('2025-01-01');
      expect(getDifferenceDays(date1, date2)).toBe(1);
    });
  });

  describe('getDiffDaysFromToday', () => {
    // On fixe "aujourd'hui" pour des tests déterministes.
    beforeAll(() => {
      jest.useFakeTimers({ now: new Date('2025-01-01T12:00:00') });
      jest.setSystemTime(new Date('2025-01-01T12:00:00'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should return 0 when expiration date is today', () => {
      const expirationDate = new Date('2025-01-01T08:00:00');
      expect(getDiffDaysFromToday(expirationDate)).toBe(0);
    });

    it('should return 1 when expiration date is tomorrow', () => {
      const expirationDate = new Date('2025-01-02T00:00:00');
      expect(getDiffDaysFromToday(expirationDate)).toBe(1);
    });

    it('should return -1 when expiration date is yesterday', () => {
      const expirationDate = new Date('2024-12-31T23:00:00');
      expect(getDiffDaysFromToday(expirationDate)).toBe(-1);
    });

    it('should return null when expiration date is null', () => {
      expect(getDiffDaysFromToday(null)).toBeNull();
    });
  });
});
