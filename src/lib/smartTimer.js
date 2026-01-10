

export function createSmartTimer(totalSeconds) {
  const startAt = { current: Date.now() };
  const pausedAt = { current: null };

  return {
    getRemaining() {
      const now = Date.now();
      const elapsed = Math.floor((now - startAt.current) / 1000);
      return Math.max(0, totalSeconds - elapsed);
    },

    pause() {
      pausedAt.current = Date.now();
    },

    resume() {
      if (pausedAt.current) {
        startAt.current += Date.now() - pausedAt.current;
        pausedAt.current = null;
      }
    },

    reset() {
      startAt.current = Date.now();
      pausedAt.current = null;
    },
  };
}
