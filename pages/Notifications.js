import { View } from 'react-native';
import { Divider } from '@rneui/themed';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import NotificationInfo from '../components/NotificationInfo';

const Notifications = () => {
    return (
        <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
            <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
            <View style={{ marginHorizontal: 30, marginTop: 20}}>
        
              <CustomHeading Title='Notifications'/>               
              <CustomSearchBar Title='Search Notifications'/>

              <NotificationInfo Notification='Odyssey Bank: Money in +R168.20. Ref: Mr H Mhlanga, 10:39 PM, Pretoria'/>
              <NotificationInfo Notification='Odyssey Bank: Money in +R168.20. Ref: Mr H Mhlanga, 10:39 PM, Pretoria'/>
              <NotificationInfo Notification='Odyssey Bank: Money in +R168.20. Ref: Mr H Mhlanga, 10:39 PM, Pretoria'/>
              <NotificationInfo Notification='Odyssey Bank: Money in +R168.20. Ref: Mr H Mhlanga, 10:39 PM, Pretoria'/>
              
            </View>

        </View>
    );
}

export default Notifications;