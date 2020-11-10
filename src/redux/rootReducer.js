import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from "./types";

// Pure Function
export function rootReducer(state, action) {
  let field;
  let val;

  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === "col" ? "colState" : "rowState";
      // Нельзя мутировать старый state, всегда нужно возвращать новый
      return { ...state, [field]: value(state, field, action) };
    case CHANGE_TEXT:
      field = "dataState"; // на самом деле он не нужен
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action),
      };
    case CHANGE_STYLES:
      return { ...state, currentStyles: action.data };
    case APPLY_STYLE:
      field = "stylesState"; // на самом деле он не нужен
      val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    case CHANGE_TITLE:
      return { ...state, title: action.data };
    case UPDATE_DATE:
      return { ...state, openedDate: new Date().toJSON()};
    // Возвращаем state, т.к. reducer обязательно должен возвращать state
    default:
      return state;
  }
}

function value(state, field, action) {
  // Чтобы получить объект ключей и значений не одной col или row,
  // а нескольких, нужно получить прошлое состояние field
  // Получаем пред state, он зависит от state и от field
  // field - объект хранящий предыдущие значения col или row
  const prevState = state[field] || {};
  prevState[action.data.id] = action.data.value;
  return prevState;
}
