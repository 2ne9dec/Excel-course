import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
    static className = 'excel__formula';
    constructor($root, options) {
        super($root, {
            name: 'Formula',
            listeners: ['input', 'keydown'],
            ...options,
        });
    }
// Переписываем шаблон компонента ExcelComponents
    toHTML() {
        return `
            <div class="info">fx</div>
            <div
                id="formula"
                class="input"
                contenteditable
                spellcheck="false"
            ></div>
        `;
    }

    init() {
        super.init();

        this.$formula = this.$root.find('#formula');

        this.$on('table:select', ($cell) => {
            this.$formula.text($cell.text());
        });

        // Связываем table c formula, набираем текст в table = formula
        this.$on('table:input', ($cell) => {
            this.$formula.text($cell.text());
        });
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text());
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab'];
        if (keys.includes(event.key)) {
            // Отменяем дефолтное поведение
            event.preventDefault();

            // Эмитем событие позволяющее сместить фокус на таблицу
            this.$emit('formula:done');
        }
    }
}
