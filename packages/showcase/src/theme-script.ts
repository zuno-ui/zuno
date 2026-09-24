// Runs in the head before paint; System is handled by the preset's media query.
export const themeScript = `try {
  const theme = localStorage.getItem("zuno-theme");
  document.documentElement.classList.remove("light", "dark");
  if (theme === "light" || theme === "dark") document.documentElement.classList.add(theme);
} catch {}`;
