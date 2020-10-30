import {capitalize} from "@core/utils";

export class DomListener {
    // $root кор-ой элемент на кот. будем вешать слушатели
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DomListener!');
        }
        this.$root = $root;
        this.listeners = listeners;
    }
// Добавить событие
    initDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            if (!this[method]) {
                const name = this.name || '';
                throw new Error(
                    `Method ${method} is not implemented in ${name} Component`
                );
            }
            // Переопределяем, this[method] => потеря контекста из-за bind
            // Так как this[method] в init отличается от this[method] в remove
            this[method] = this[method].bind(this);
            // Аналог addEventListener
            this.$root.on(listener, this[method]);
        });
    }
// Удалить событие
    removeDOMListeners() {
        this.listeners.forEach((listener) => {
            const method = getMethodName(listener);
            this.$root.off(listener, this[method]);
        });
    }
}

function getMethodName(eventName) {
    return `on${capitalize(eventName)}`;
}
