import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EmptyState from '../components/common/EmptyState';

describe('EmptyState', () => {
  it('renders the default title and subtitle', () => {
    render(<EmptyState />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your search or filters.')).toBeInTheDocument();
  });

  it('renders custom title and subtitle when provided', () => {
    render(<EmptyState title="Nothing here" subtitle="Add your first user" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.getByText('Add your first user')).toBeInTheDocument();
  });
});
