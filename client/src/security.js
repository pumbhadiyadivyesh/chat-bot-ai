// 🛡️ ChatBoat AI Client Protection & Anti-Inspect Security
export function initSecurityShield() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Block DevTools Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Opt+I (Inspect Element)
    // Ctrl+Shift+J / Cmd+Opt+J (Console)
    // Ctrl+Shift+C / Cmd+Opt+C (Select Element)
    if ((e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey) && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page HTML)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. Security Notice in Console
  try {
    console.clear();
    console.log(
      '%cChatBoat.AI - Protected Frontend',
      'color: #818cf8; font-size: 22px; font-weight: 800; text-shadow: 0 0 10px rgba(99, 102, 241, 0.5);'
    );
    console.log(
      '%cSource inspection and developer tools are restricted for security reasons.',
      'color: #94a3b8; font-size: 13px; font-weight: 600;'
    );
  } catch (err) {
    // Ignore in older environments
  }
}
