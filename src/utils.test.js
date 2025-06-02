import { calculatePoints } from './utils';

describe('calculatePoints', () => {
  it('returns 0 for $50 or less', () => {
    expect(calculatePoints(50)).toBe(0);
    expect(calculatePoints(10)).toBe(0);
  });
  it('returns 1 point per dollar between $51 and $100', () => {
    expect(calculatePoints(60)).toBe(10);
    expect(calculatePoints(100)).toBe(50);
  });
  it('returns correct points for over $100', () => {
    // $120: (120-100)*2 + 50 = 90
    expect(calculatePoints(120)).toBe(90);
    // $150: (150-100)*2 + 50 = 150
    expect(calculatePoints(150)).toBe(150);
  });
});
