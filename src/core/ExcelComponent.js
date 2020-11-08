import { DomListener } from "@core/DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || "";
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribers = [];

    this.prepare();
  }

  // Настраивает наш компонент до init
  prepare() {}

  // Возвращает шаблон компонента
  toHTML() {
    return "";
  }

  // Уведомляем слушателей о событии event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // Подписываеся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  // Передаем события в store
  $dispatch(action) {
    this.store.dispatch(action);
  }

  // Приходят только изменения по тем полям, на которые мы подписались
  storeChanged() {}

  // В массиве subscribe находится список строк,
  // где обозначаем на какие поля нужно подписаться
  isWatching(key) {
    return this.subscribe.includes(key);
  }

  // Инициализируем компонент
  // Добавляем DOM слушатели
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент
  // Чистим DOM слушатели
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
  }
}
