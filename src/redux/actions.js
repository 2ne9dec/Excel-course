import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CHANGE_STYLES,
  APPLY_STYLE,
  CHANGE_TITLE,
  UPDATE_DATE,
} from "./types";

// Actions Creater
// Где data - объект с ключами value и id колонки
// Где value ширина колонки или высота строки
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}

// В data храним value, ids - массив из id к которым нужно приминять стиль
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}

export function updateDate() {
  return {
    type: UPDATE_DATE,
  };
}
