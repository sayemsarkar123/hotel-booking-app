import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Rooms from './components/Rooms/Rooms';
import RoomDetails from './components/RoomDetails/RoomDetails';
import Login from './components/Login/Login';
import { useDispatch } from 'react-redux';
import { userAuthStatus } from './features/roomsSlice/roomsSlice';
import BookRoom from './components/BookRoom/BookRoom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Logout from './components/Logout/Logout';
import BookList from './components/BookList/BookList';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userAuthStatus());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/rooms" component={Rooms} />
        <Route exact path="/room/:roomId" component={RoomDetails} />
        <PrivateRoute path="/book/:roomId">
          <BookRoom />
        </PrivateRoute>
        <PrivateRoute path="/booklist">
          <BookList />
        </PrivateRoute>
        <Route path="/logout" component={Logout} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
