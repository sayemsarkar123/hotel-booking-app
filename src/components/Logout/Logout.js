import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addAuthData } from '../../features/roomsSlice/roomsSlice';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem('data');
    dispatch(addAuthData({ token: '', userId: '' }));
  }, [dispatch]);
  return <Redirect to="/" />;
};

export default Logout;
