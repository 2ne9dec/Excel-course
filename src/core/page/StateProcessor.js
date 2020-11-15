import { debounce } from "@core/utils";

export class StateProcessor {
  // client - объект,у которого есть общий интерфейс.
  // Он может быть localStorage, асинхронным запросом на сервер и тд.
  constructor(client, delay = 300) {
    this.client = client;
    // Чтобы не терять контекст, ,bind-им его
    this.listen = debounce(this.listen.bind(this), delay);
  }

  // Метод, который что-то сохраняет
  listen(state) {
    this.client.save(state);
  }

  get() {
    return this.client.get();
  }
}
