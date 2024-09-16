import { View, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import ProfileHeading from '../components/ProfileHeading';
import CustomButton from '../components/CustomButton';
import React from 'react';

const ViewAccount = ({navigation}) => {

    return (        
        
            <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize:30,
                        width: 228,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'rgba(0, 44, 106, 255)',
                        marginTop: 80
                    }}
                >
                    Account
                </Text>

                <Text style={{marginHorizontal: 30, fontSize: 22, marginVertical: 20, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                    Account holder : Mr H Mhlanga {"\n"}
                    Account Number : 8965356335677 {"\n"}
                    Account Type: Savings {"\n"}
                    Balance: R104.58
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20, }}>
                    <CustomButton buttonTitle='Transfer Funds' ToWhere={() => navigation.navigate('TransferDetails')}/>
                    <CustomButton buttonTitle='Close Account' />
                </View>

                
            </View> 
    );
}

export default ViewAccount;
