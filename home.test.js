const { formatTime } = require('./public/home.js');

describe('formatTime', () => {
  test('99カウントは00:00:99', () => {
    expect(formatTime(99)).toBe('00:00:99');
  });
  test('100カウントは00:01:00', () => {
    expect(formatTime(100)).toBe('00:01:00');
  });
  test('5999カウントは00:59:99', () => {
    expect(formatTime(5999)).toBe('00:59:99');
  });
  test('6000カウントは01:00:00', () => {
    expect(formatTime(6000)).toBe('01:00:00');
  });
  test('1時間（360000カウント）は60:00:00', () => {
    expect(formatTime(360000)).toBe('00:00:00');
  });
});
