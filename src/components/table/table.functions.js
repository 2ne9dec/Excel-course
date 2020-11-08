import { range } from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === "cell";
}
// $current - текущая нажатая ячейка, $target - следующая нажатая ячейка
export function matrix($target, $current) {
  // Если true - выводим объект с номером строки и колонки {row: 5, col: 3}
  // Если false - string с номером строки и колонки 5:3
  const target = $target.id(true);
  const current = $current.id(true);
  // Получаем выделенный диапазон колонок и присваиваем cols
  const cols = range(current.col, target.col);
  // Получаем выделенный диапазон строк и присваиваем rows
  const rows = range(current.row, target.row);

  // Получаем массив координат выделенного диапазона ячеек в виде [0:0, 0:1]
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, { col, row }) {
  const MIN_VALUE = 0;
  switch (key) {
    case "Enter":
    case "ArrowDown":
      row++;
      break;
    case "Tab":
    case "ArrowRight":
      col++;
      break;
    case "ArrowLeft":
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
    case "ArrowUp":
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
  }

  return `[data-id="${row}:${col}"]`;
}
