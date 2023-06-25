export function sumEvent(name: string) {
  window.__bl?.sum(name);
}

export function avgEvent(name: string) {
  window.__bl?.avg(name);
}
