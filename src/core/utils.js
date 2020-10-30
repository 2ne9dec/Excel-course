// Pure functions - реагирует только на входящие параметры и возвр. результат
// Функция для приведения 1ого символа к заглавной букве
export function capitalize(string) {
    if (typeof string !== 'string') {
        return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Функция для получения массива индексов выбранного диапазона
export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end];
    }
    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index);
}
