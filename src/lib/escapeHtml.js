const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ENTITIES[c]);
}

// Escape first, then convert newlines, so user input can never inject markup.
export function escapeMultiline(value) {
  return escapeHtml(value).replace(/\r?\n/g, '<br>');
}
