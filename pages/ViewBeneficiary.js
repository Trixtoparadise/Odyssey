import { View, Text, Alert } from 'react-native';
import { Divider } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
import React from 'react';

const ViewBeneficiary = ({route, navigation}) => {
    const { User_Id, Account_holder, Bank, Account_number} = route.params;

    const createTwoButtonAlert = () =>
        Alert.alert('Delete Beneficiary', 'Are you sure you want to delete your beneficiary?', [
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
        let response = await fetch("http://10.10.17.11:5000/api/DeleteBeneficiary", { 
            method: "DELETE",
            body: bodyContent,
            headers: headersList
            });
            navigation.navigate('Beneficiaries');
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
                Beneficiary
            </Text>


            <Text style={{marginHorizontal: 30, fontSize: 22, marginVertical: 20, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                Account holder :  {Account_holder} {"\n"}
                Bank : {Bank} {"\n"}
                Account Number : {Account_number}
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20, }}>
                <CustomButton buttonTitle='Pay Beneficiary' ToWhere={() => navigation.navigate('BeneficiaryTransferDetails', {User_Id: User_Id, Account_holder: Account_holder, Bank: Bank, Account_number: Account_number})}/>
                <CustomButton buttonTitle='Delete Beneficiary' ToWhere={createTwoButtonAlert}/>
            </View>
            
        </View> 
    );
}

export default ViewBeneficiary;
