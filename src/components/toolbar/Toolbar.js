import { createToolbar } from "@/components/toolbar/toolbar.template";
import { $ } from "@core/dom";
import { ExcelStateComponent } from "@/core/ExcelStateComponent";
import { defaultStyles } from "@/constants";

export class Toolbar extends ExcelStateComponent {
  static className = "excel__toolbar";

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ["click"],
      subscribe: ["currentStyles"],
      ...options,
    });
  }

  // Стили по умолчанию, когда в state ничего не попадает
  prepare() {
    this.initState(defaultStyles);
  }

  // Когда запрашиваем шаблон, он всегда будет зависеть от state
  // и этот шаблон будет формироваться относительно state
  get template() {
    return createToolbar(this.state);
  }

  // Переписываем шаблон компонента ExcelComponents
  toHTML() {
    return this.template;
  }

  // Если что-то изменилось в store мы перерисовываем toolbar
  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === "button") {
      // Где value - это объект с ключом стиля и его значением
      const value = JSON.parse($target.data.value);
      this.$emit("toolbar:applyStyle", value);
    }
  }
}
