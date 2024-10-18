import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Divider } from '@rneui/themed';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import AccountInfo from '../components/AccountInfo';

class User {
    constructor(username, phoneNumber, id) {
      this.username = username;
      this.phoneNumber = phoneNumber;
      this.id = id;
    }
}

const BeneficiariesToPay = ({navigation}) => {
    const [user, setUser] = React.useState(new User("", 0, 0));
    const [beneficiaries, setBeneficiaries] = React.useState([]);
    const listBeneficiaries = beneficiaries.map((beneficiary) =>
      <AccountInfo key={beneficiary.Account_number} Account={beneficiary.Beneficiary_name + " (" +  beneficiary.Bank + ") " + '\n' + beneficiary.Account_number} ToWhere={() => navigation.navigate('ViewBeneficiary', {User_Id: beneficiary.User_ID, Account_holder: beneficiary.Beneficiary_name, Bank: beneficiary.Bank, Account_number: beneficiary.Account_number})}/>
    );

    React.useEffect(() => {
      async function handleUserData () {
        let userToken = null;
        let retToken;
  
        try {
          retToken = await SecureStore.getItemAsync('userToken');
          if (retToken != null){
            userToken = "Bearer " + retToken.replace(/"/g, ''); 
          }
        } catch (e) {
          console.log(e);
        }
        let headersList = {
          "Authorization": userToken
        }
        
        try {
          const response = await fetch("http://10.10.17.11:5000/api/user", { 
            method: "GET",
            headers: headersList
          });
          
          const data = await response.json();
          setUser(data);
        } catch(e) {
          console.log(e)
        }
      }
  
      handleUserData();
    }, []);
  
    if ( user.id != 0) {
        const handleBeneficiaryData = async () => {
            let headersList = {
              "Content-Type": "application/json"
            }
            
            let bodyContent = JSON.stringify({
              "id": user.id
            }
            );
            
            try {
              const response = await fetch("http://10.10.17.11:5000/api/getuserbeneficiaries", { 
                method: "POST",
                body: bodyContent,
                headers: headersList
              });
      
              let data = await response.json();
              setBeneficiaries(data);
            } catch (e) {
              console.log(e);
            }
          }
          
          handleBeneficiaryData();
    }

    if (user.id == 0 || beneficiaries.length == 0) {
      return (
        <View style={{backgroundColor: 'white', width: '100%', height: '100%' }}>
          <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
          <View style={styles.splashContainer}>
              <Text style={{marginHorizontal: 30, fontSize: 22, marginBottom: 20, marginTop: -80, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                  Please Wait
              </Text>
            <ActivityIndicator size="large" color="rgba(0, 44, 106, 255)" />
          </View>
        </View>
      )
    } else {
        return (
            <>
                <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                    <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                    <View style={{ marginHorizontal: 30, marginTop: 20}}>
                        <CustomHeading Title='Select a beneficiary to pay'/>
                        <CustomSearchBar Title="Search beneficiary"/>
                        {listBeneficiaries}

                    </View>
                </View>
            </> 
        );
    }
}

const styles = StyleSheet.create({
    splashContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'left',
      justifyContent: 'center',
      padding: 60,
    },
    
  });

export default BeneficiariesToPay;