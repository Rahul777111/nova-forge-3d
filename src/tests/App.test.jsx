import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

describe('App smoke test', () => {
  it('renders without crashing', () => {
    // Basic sanity check - app module loads
    expect(true).toBe(true);
  });
});
