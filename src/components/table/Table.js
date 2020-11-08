import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";
import { createTable } from "@/components/table/table.template";
import { resizeHandler } from "@/components/table/table.resize";
import { isCell, matrix, nextSelector, shouldResize } from "./table.functions";
import { TableSelection } from "@/components/table/TableSelection";
import * as actions from "@/redux/actions";
import { defaultStyles } from "@/constants";
import { parse } from "@core/parse";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown", "keydown", "input"],
      ...options,
    });
  }
  // Переписываем шаблон компонента ExcelComponents
  toHTML() {
    return createTable(15, this.store.getState());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    // Выделяем по умолчанию первую ячейку таблицы
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on("formula:input", (value) => {
      this.selection.current
        .attr("data-value", value)
        .text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on("formula:done", () => {
      this.selection.current.focus();
    });

    // Применяем к группе ячеек стили из toolbar
    this.$on("toolbar:applyStyle", (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds,
        })
      );
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit("table:select", $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      // Где data - объект с ключами value и id колонки
      // Где value ширина колонки или высота строки
      const data = await resizeHandler(this.$root, event);
      // actions.tableResize(data) это {type: "TABLE_RESIZE", data: {…}}
      this.$dispatch(actions.tableResize(data));
    } catch (error) {
      console.warn("Resize error", error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
      // isCell - выбираем только cell в таблице
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp",
    ];

    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      // В id, по нажатию кнопок, которые есть в массиве,
      // получаем значение ячейки в виде {row: 5, col: 3}
      const id = this.selection.current.id(true);
      // Получаем саму ноду нужной ячейки
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
      actions.changeText({
        id: this.selection.current.id(),
        value,
      })
    );
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text());
  }
}
