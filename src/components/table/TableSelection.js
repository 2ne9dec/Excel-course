export class TableSelection {
    static className = 'selected';
    constructor() {
        this.group = [];
        this.current = null;
    }

    // $el = Dom {$el: div.cell}
    select($el) {
        this.clear();
        $el.focus().addClass(TableSelection.className);
        this.group.push($el);
        this.current = $el;
    }

    // Проходимся по массиву и удаляем класс selected
    clear() {
        this.group.forEach(($el) => $el.removeClass(TableSelection.className));
        // Очищаем массив, чтобы всегда в нем был только 1 элемент
        this.group = [];
    }

    selectGroup($group = []) {
        this.clear();
        this.group = $group;
        this.group.forEach(($el) => $el.addClass(TableSelection.className));
    }
}
