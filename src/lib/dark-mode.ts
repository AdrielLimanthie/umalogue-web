/**
 * Anti-FOUC script — inlined synchronously in <head> before React renders.
 * Reads the persisted isDarkMode from localStorage and applies the .dark class
 * to <html> before the first paint to prevent a flash of incorrect theme.
 */
export const darkModeScript = `
(function() {
  try {
    var stored = localStorage.getItem('umalogue-ui');
    if (stored) {
      var parsed = JSON.parse(stored);
      if (parsed && parsed.state && parsed.state.isDarkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  } catch (e) {}
})();
`.trim();
