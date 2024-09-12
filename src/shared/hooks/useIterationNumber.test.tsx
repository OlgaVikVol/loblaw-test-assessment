import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useIterationNumber } from '@/shared/hooks/useIterationNumber';

// Mock the PING_DELAY constant
vi.mock('@/shared/consts/api', () => ({
  PING_DELAY: 1000, 
}));

// Test component that uses the hook
const TestComponent = () => {
  const { iteration } = useIterationNumber();
  return <div data-testid="iteration">{iteration}</div>;
};

describe('useIterationNumber', () => {
  let clearIntervalSpy: ReturnType<typeof vi.spyOn>; 

  beforeEach(() => {
    vi.useFakeTimers(); 
    clearIntervalSpy = vi.spyOn(global, 'clearInterval'); 
  });

  afterEach(() => {
    vi.clearAllTimers(); 
    clearIntervalSpy.mockRestore(); 
  });

  it('should start with an iteration of 0', () => {
    const { getByTestId } = render(<TestComponent />);

    // Check initial iteration value
    expect(getByTestId('iteration').textContent).toBe('0');
  });

  it('should increment iteration after each PING_DELAY', async () => {
    const { getByTestId } = render(<TestComponent />);

    // Initially, iteration should be 0
    expect(getByTestId('iteration').textContent).toBe('0');

    // Fast-forward time by 1000ms (one PING_DELAY)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // After one interval, iteration should be 1
    expect(getByTestId('iteration').textContent).toBe('1');

    // Fast-forward time by another 1000ms (one more PING_DELAY)
    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // After two intervals, iteration should be 2
    expect(getByTestId('iteration').textContent).toBe('2');
  });

  it('should clear the interval when the component is unmounted', () => {
    const { unmount } = render(<TestComponent />);

    // Unmount the component
    unmount();

    // Check that clearInterval was called
    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});
