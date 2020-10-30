const CODES = {
        A: 65,
        Z: 90,
    };

// Создаем ячейки
// col на самом деле наш index
function toCell(row) {
    return function(_, col) {
        return `
            <div
                class="cell"
                contenteditable
                data-col="${col}"
                data-type="cell"
                data-id="${row}:${col}"
            ></div>
        `;
    };
}

// Создаем строки
function createRow(index, content) {
    const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index ? index : ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
}

// Приводим число к символу
function toChar(_, index) {
    return String.fromCharCode(CODES.A + index);
}

// Создаем колонки, где col = контент колонок (A,B,C...т.д.)
function toColumn(col, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize"  data-resize="col"></div>
        </div>
    `;
}

// Функция, которая создает весь table_axcel
// Где rowsCount - кол-во строк
export function createTable(rowsCount) {
    // Где colsCount - кол-во колонок
    const colsCount = CODES.Z - CODES.A + 1;
    const rows = [];

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('');

        rows.push(createRow(null, cols));

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');

        rows.push(createRow(row + 1, cells));
    }
    return rows.join('');
}
