const INCREMENT = 'redux-example/counter/INCREMENT';
const INCREMENT_DOUBLE = 'redux-example/counter/INCREMENT_DOUBLE';

const initialState = {
  count: 0
};

export default function reducer(state = initialState, action = {}) {
  const {count} = state;
  switch (action.type) {
    case INCREMENT:
      return {
        count: count + 1
      };
    case INCREMENT_DOUBLE:
      return {
        count: count + 2
      };
    default:
      return state;
  }
}

export function increment() {
  return {
    type: INCREMENT
  };
}

export function incrementDouble() {
  return {
    type: INCREMENT_DOUBLE
  };
}
