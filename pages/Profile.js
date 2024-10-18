import { useContext } from 'react';
import { View, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import ProfileHeading from '../components/ProfileHeading';
import CustomButton from '../components/CustomButton';
import React from 'react';

const Profile = ({navigation}) => {
    
    return (        
        
            <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <ProfileHeading />

                <Text style={{marginHorizontal: 30, fontSize: 22, marginVertical: 20, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                    Name : Mr John Doe {"\n"}
                    Phone number: +27 78 348 2171 {"\n"}
                    ID Number : 001234543567257
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20, }}>
                    <CustomButton buttonTitle='Edit Profile'/>
                    <CustomButton buttonTitle='Delete Profile' />
                </View>

                <CustomButton  buttonTitle='Log out'/>
                
            </View> 
    );
}

export default Profile;
