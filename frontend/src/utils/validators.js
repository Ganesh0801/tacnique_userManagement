const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a user form payload and returns a field -> error message map.
 * An empty object means the form is valid.
 */
export const validateUserForm = (values) => {
  const errors = {};

  if (!values.firstName?.trim()) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!values.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  if (!values.email?.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.department?.trim()) {
    errors.department = 'Department is required';
  }

  return errors;
};
