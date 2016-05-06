const OPEN = 'redux-example/popup/OPEN';
const CLOSE = 'redux-example/popup/CLOSE';

const initialState = {
  activate: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN:
      return {
        activate: true
      };
    case CLOSE:
      return {
        activate: false
      };
    default:
      return state;
  }
}

export function open() {
  return {
    type: OPEN
  };
}

export function close() {
  return {
    type: CLOSE
  };
}
