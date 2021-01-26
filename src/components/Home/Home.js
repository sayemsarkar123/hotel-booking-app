import React from 'react';
import Banner from '../Banner/Banner';
import Featured from '../Featured/Featured';
import Services from '../Services/Services';

const Home = () => {
  return (
    <>
      <Banner {...{ isRoomDetails: false, title: 'luxurious rooms', href: '/rooms', desc: 'deluxe rooms starting at $299', btnText: 'our rooms', imageURL: 'defaultBcg.jpeg' }} />
      <Services />
      <Featured />
    </>
  );
};

export default Home;
