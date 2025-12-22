type ThemeColors = {
  background: string;
  surface: string;
  primary: string;
  primary_soft: string;
  accent: string;
  text: string;
  text_muted: string;
  border: string;
};

export function applyTheme(theme: { mode: string }, colors: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty("color-scheme", theme.mode);
  root.style.setProperty("--bg", colors.background);
  root.style.setProperty("--surface", colors.surface);
  root.style.setProperty("--primary", colors.primary);
  root.style.setProperty("--primary-soft", colors.primary_soft);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--text", colors.text);
  root.style.setProperty("--text-muted", colors.text_muted);
  root.style.setProperty("--border", colors.border);
}
