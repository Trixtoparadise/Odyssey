import { View, Text, Alert } from 'react-native';
import { Divider } from '@rneui/themed';
import ProfileHeading from '../components/ProfileHeading';
import CustomButton from '../components/CustomButton';
import React from 'react';

const ViewAccount = ({route, navigation}) => {
    const { Account_holder_Id, Account_holder, Account_number, Account_Type, Balance } = route.params;

    const createTwoButtonAlert = () =>
        Alert.alert('Close Account', 'Are you sure you want to close your account?', [
          {
            text: 'Cancel',
            onPress: () => {return;},
            style: 'cancel',
          },
          {text: 'OK', onPress: CloseAccount},
    ]);

    const CloseAccount = async () => {
        let headersList = {
            "Content-Type": "application/json"
           }
           
        let bodyContent = JSON.stringify({
            "accountNumber" : parseInt(Account_number) 
        });
        
        
        try {
        let response = await fetch("http://10.10.17.11:5000/api/closeAccount", { 
            method: "DELETE",
            body: bodyContent,
            headers: headersList
            });
            navigation.navigate('Accounts');
            let data = await response.text();
            console.log(data);
        } catch (e) {
        console.log(e);
        }

                      
    } 

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

                <Text style={{marginHorizontal: 30, fontSize: 18, marginVertical: 20, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                    Account holder : {Account_holder}{"\n"}
                    Account Number : {Account_number} {"\n"}
                    Account Type : {Account_Type}{"\n"}
                    Balance : R {Balance} 
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20, }}>
                    <CustomButton buttonTitle='Transfer Funds' ToWhere={() => navigation.navigate('AccountTransferDetails', {Account_holder_Id: Account_holder_Id, Account_holder: Account_holder, Account_number: Account_number, Account_Type: Account_Type, Balance: Balance})}/>
                    <CustomButton buttonTitle='Close Account' ToWhere={createTwoButtonAlert}/>
                </View>

                
            </View> 
    );
}

export default ViewAccount;
