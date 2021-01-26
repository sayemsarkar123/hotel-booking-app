import { createSlice } from '@reduxjs/toolkit';
import data from './../../data';

const initialState = {
  rooms: data,
  values: {
    type: 'all',
    capacity: 1,
    price: 600,
    minSize: 0,
    maxSize: 1000,
    breakfast: false,
    pets: false,
  },
  token: '',
  userId: '',
  error: '',
  success: '',
  bookList: [],
};

const roomsSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setValue(state, { payload }) {
      return {
        ...state,
        values: { ...state.values, ...payload },
      };
    },
    sortRooms(state, { payload }) {
      const rooms = data.filter((room) => {
        const roomSortCondition =
          room.capacity >= +state.values.capacity &&
          room.price <= +state.values.price &&
          room.size >= +state.values.minSize &&
          room.size <= +state.values.maxSize;
        if (state.values.type === 'all') {
          if (state.values.breakfast && state.values.pets)
            return roomSortCondition && room.breakfast && room.pets;
          if (state.values.breakfast)
            return roomSortCondition && room.breakfast;
          if (state.values.pets) return roomSortCondition && room.pets;
          return roomSortCondition;
        }
        if (state.values.breakfast && state.values.pets)
          return (
            roomSortCondition &&
            room.type === state.values.type &&
            room.breakfast &&
            room.pets
          );
        if (state.values.breakfast)
          return (
            roomSortCondition &&
            room.type === state.values.type &&
            room.breakfast
          );
        if (state.values.pets)
          return (
            roomSortCondition && room.type === state.values.type && room.pets
          );
        return roomSortCondition && room.type === state.values.type;
      });
      return {
        ...state,
        rooms,
      };
    },
    addAuthData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    addAuthMessage(state, { payload }) {
      return {
        ...state,
        error: payload.error || '',
        success: payload.success || '',
      };
    },
    addBookList(state, { payload }) {
      return {
        ...state,
        bookList: payload,
      };
    },
  },
});

export const {
  setValue,
  sortRooms,
  addAuthData,
  addAuthMessage,
  addBookList,
} = roomsSlice.actions;

export const userAuth = (data, cb) => async (dispatch) => {
  const { email, password, mode } = data;
  const apiKey = 'AIzaSyD801XYxZNcW6UEv7s9hXJ0ntXWjK2hkiM';
  if (mode === 'Login') {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { idToken: token, localId: userId, error } = await response.json();
    if (token) {
      localStorage.setItem(
        'data',
        JSON.stringify({
          token,
          userId,
          exp: new Date().getTime() + 60 * 60 * 1000,
        })
      );
      dispatch(addAuthData({ token, userId }));
      dispatch(addAuthMessage({ success: 'Login successfully' }));
      cb();
    }
    if (error) dispatch(addAuthMessage({ error: error.message }));
    setTimeout(() => dispatch(addAuthMessage({})), 3000);
  } else {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      {
        method: 'POST',
        body: JSON.stringify({ email, password, returnSecureToken: true }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { idToken: token, localId: userId, error } = await response.json();
    if (token) {
      localStorage.setItem(
        'data',
        JSON.stringify({
          token,
          userId,
          exp: new Date().getTime() + 60 * 60 * 1000,
        })
      );
      dispatch(addAuthData({ token, userId }));
      dispatch(addAuthMessage({ success: 'Account created successfully' }));
      cb();
    }
    if (error) dispatch(addAuthMessage({ error: error.message }));
    setTimeout(() => dispatch(addAuthMessage({})), 3000);
  }
};

export const userAuthStatus = () => async (dispatch) => {
  const { token, userId, exp } = JSON.parse(
    localStorage.getItem('data') || '{}'
  );
  if (new Date() < new Date(exp))
    return dispatch(addAuthData({ token, userId }));
  localStorage.removeItem('data');
  dispatch(addAuthData({ token: '', userId: '' }));
};

export const getUserBookList = (token, userId) => async (dispatch) => {
  const response = await fetch(
    `https://beach-resort-2021-default-rtdb.firebaseio.com/booked.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
  );
  const result = await response.json();
  if (!result.error) {
    const bookList = Object.entries(result).map(([key, value]) => {
      return { ...value, id: key, room: data[value.roomId - 1] };
    });
    dispatch(addBookList(bookList));
  }
};

export default roomsSlice.reducer;
