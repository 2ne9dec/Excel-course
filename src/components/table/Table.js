import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';

export class Table extends ExcelComponent {
    static className = 'excel__table';

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options,
        });
    }
// Переписываем шаблон компонента ExcelComponents
    toHTML() {
        return createTable(15);
    }

    prepare() {
        this.selection = new TableSelection();
    }

    init() {
        super.init();

        // Выделяем по умолчанию первую ячейку таблицы
        const $cell = this.$root.find('[data-id="0:0"]');
        this.selectCell($cell);

        this.$on('formula:input', () => {
            this.selection.current.focus();
        });

        this.$on('formula:done', () => {
            this.selection.current.focus();
        });
    }

    selectCell($cell) {
        this.selection.select($cell);
        this.$emit('table:select', $cell);
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            resizeHandler(this.$root, event);
            // isCell - выбираем только cell в таблице
        } else if (isCell(event)) {
            const $target = $(event.target);
            if (event.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map((id) => this.$root.find(`[data-id="${id}"]`));
                this.selection.selectGroup($cells);
            } else {
                this.selection.select($target);
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp',
        ];

        const {key} = event;
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

    onInput(event) {
        this.$emit('table:input', $(event.target));
    }
}
