export function scopeSheets({ placeholder = ':scope', revert = true, context = document, prefix = 'scope'} = {}) {
  const sheets = [...context.querySelectorAll('[scoped]')];
  sheets.forEach((sheet, i) => {
    sheet.parentNode.dataset[prefix] = i;
    const attr = `[data-${prefix}="${i}"]`;
    const translated = sheet.textContent.replace(new RegExp(placeholder, 'g'), attr);
    const preamble = revert ? `${attr}, ${attr} > * { all: revert }` : '';
    sheet.textContent = `${preamble} ${translated}`;
  });
}