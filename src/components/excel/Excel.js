import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.emitter = new Emitter();
    }

    getRoot() {
        const $root = $.create('div', 'excel');
        const componentOptions = {
            emitter: this.emitter,
        };
        // this.components - массив из Классов в index.js
        this.components = this.components.map((Component) => {
            // Создаем 4 дива .excel__...
            const $el = $.create('div', Component.className);
            // component - instance Классов с 17 строчки
            const component = new Component($el, componentOptions);
            // При вызове toHTML получаем шаблоны компонентов
            $el.html(component.toHTML());
            $root.append($el);
            return component;
        });
        return $root;
    }

    render() {
        // Рендерим дом дерево
        this.$el.append(this.getRoot());
        // Для каждого компонента выполняем метод init()
        this.components.forEach((component) => component.init());
    }

    destroy() {
        this.components.forEach((component) => component.destroy());
    }
}
