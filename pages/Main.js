import { TabView, Divider } from '@rneui/themed';
import React from 'react';
import CustomTab from '../components/CustomTab'
import Home from '../pages/Home';
import Transfer from '../pages/Transfer';
import Transactions from '../pages/Transactions';
import Notifications from '../pages/Notifications';
import Header from '../components/Header';
import Profile from '../pages/Profile';

export default function Main({navigation, route}) {
  const [index, setIndex] = React.useState(0);

  return (
    <>      
      <TabView value={index} onChange={setIndex} animationType="spring">
        <Home />
        <Transfer />
        <Transactions />
        <Notifications />
      </TabView>

      <Divider width={1} />

      <CustomTab Index={index} SetIndex={setIndex}/>
    </>
  );
}