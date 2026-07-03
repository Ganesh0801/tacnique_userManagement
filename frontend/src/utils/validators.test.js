import { describe, it, expect } from 'vitest';
import { validateUserForm } from '../utils/validators';

describe('validateUserForm', () => {
  it('returns no errors for a fully valid form', () => {
    const errors = validateUserForm({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      department: 'Engineering',
    });
    expect(errors).toEqual({});
  });

  it('flags an empty first name', () => {
    const errors = validateUserForm({
      firstName: '',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      department: 'Engineering',
    });
    expect(errors.firstName).toBeDefined();
  });

  it('flags an invalid email format', () => {
    const errors = validateUserForm({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'not-an-email',
      department: 'Engineering',
    });
    expect(errors.email).toBeDefined();
  });

  it('flags a first name shorter than 2 characters', () => {
    const errors = validateUserForm({
      firstName: 'A',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      department: 'Engineering',
    });
    expect(errors.firstName).toBeDefined();
  });

  it('flags a missing department', () => {
    const errors = validateUserForm({
      firstName: 'Ada',
      lastName: 'Lovelace',
      email: 'ada@example.com',
      department: '  ',
    });
    expect(errors.department).toBeDefined();
  });
});
