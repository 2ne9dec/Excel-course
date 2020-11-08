export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({ ...initialState }, { type: "__INIT__" });
  let listeners = [];

  return {
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== fn);
        },
      };
    },
    // Где action - объект {type: "TABLE_RESIZE", data: {…}}
    // Где data - объект с ключами value и id колонки
    // Где value ширина колонки или высота строки
    dispatch(action) {
      // Переопределяем state, первым аргументом принимает старый state
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },
    getState() {
      // Делаем для того, чтобы это был совершенно другой объект
      // и он имел совершенно другое место в памяти
      // Этот способ работает только если мы не будем использовать сложные
      // структуры данных, например: new Date, map, set и тд.
      return JSON.parse(JSON.stringify(state));
    },
  };
}
