class Dom {
  // selector "#app"
  constructor(selector) {
    this.$el =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
  }

  // Если заново закинем шаблон, то получим перерисованный шаблон компонента
  html(html) {
    if (typeof html === "string") {
      this.$el.innerHTML = html;
      // Чтобы можно было вызвать, к примеру, метод clear - вернем this
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html("");
    return this;
  }

  text(text) {
    if (typeof text !== "undefined") {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === "input") {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  // Дублирует функционал addEventListener
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  // Дублирует функционал removeEventListener
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  // node instance класса Dom
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  findALl(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((key) => {
      this.$el.style[key] = styles[key];
    });
  }

  // Где res - результирующий объект
  // Где s - текущий стиль
  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(":");
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }
}
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = "") => {
  // 5 дивов(селекторов): 1 див .excel и 4 дива внутри .excel
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
