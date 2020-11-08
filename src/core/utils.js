// Pure functions - реагирует только на входящие параметры и возвр. результат
// Функция для приведения 1ого символа к заглавной букве
export function capitalize(string) {
  if (typeof string !== "string") {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Функция для получения массива индексов выбранного диапазона
export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => start + index);
}

export function storage(key, data) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}

export function isEqual(a, b) {
  if (typeof a === "object" && typeof b === "object") {
    // С помощью JSON.stringify объект приводим к строке.
    // Этот способ работает только если мы не будем использовать сложные
    // структуры данных, например: new Date, map, set и тд.
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(";");
}

// Function высокого порядка, которая возвращает function
export function debounce(fn, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args);
      // fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
