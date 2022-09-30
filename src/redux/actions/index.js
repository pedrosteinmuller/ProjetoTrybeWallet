export const REQUEST_API = 'REQUEST_API';
export const GET_COINS = 'GET_COINS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const USER_EMAIL = 'USER_EMAIL';

export const getEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const saveExpensesGlobalState = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

export const requestAPI = () => ({ type: REQUEST_API });

const addCurrence = (coins) => ({
  type: GET_COINS,
  coins,
});

export const fetchApi = () => async (dispatch) => {
  dispatch(requestAPI());
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const coins = Object.keys(data).filter((e) => e !== 'USDT');
  dispatch(addCurrence(coins));
};

// dispatch(saveExpensesGlobalState(coins));
