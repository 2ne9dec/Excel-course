import { $ } from "@core/dom";
import { Emitter } from "@core/Emitter";
import { StoreSubscriber } from "@core/StoreSubscriber";
import { updateDate } from "@/redux/actions";
import { preventDefault } from "@core/utils";

export class Excel {
  constructor(options) {
    this.components = options.components || [];
    this.store = options.store;
    // Получаем и создание новый instance от Emitter
    this.emitter = new Emitter();
    // Получаем и создание новый instance от StoreSubscriber
    this.subscriber = new StoreSubscriber(this.store);
  }

  getRoot() {
    const $root = $.create("div", "excel");
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    };
    // this.components - массив из Классов в index.js
    this.components = this.components.map((Component) => {
      // Создаем 4 дива .excel__...
      const $el = $.create("div", Component.className);
      // component - instance Классов с 17 строчки
      const component = new Component($el, componentOptions);
      // При вызове toHTML получаем шаблоны компонентов
      $el.html(component.toHTML());
      $root.append($el);
      return component;
    });
    return $root;
  }

  init() {
    if (process.env.NODE_ENV === "production") {
      document.addEventListener("contextmenu", preventDefault);
    }
    this.store.dispatch(updateDate());
    this.subscriber.subscribeComponents(this.components);
    // Для каждого компонента выполняем метод init()
    this.components.forEach((component) => component.init());
  }

  destroy() {
    this.subscriber.unsubscribeFromStore();
    this.components.forEach((component) => component.destroy());
    document.removeEventListener("contextmenu", preventDefault);
  }
}
