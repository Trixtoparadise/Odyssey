import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Divider } from '@rneui/themed';
import { View, StyleSheet, Text, ActivityIndicator, FlatList } from 'react-native';
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
    const [searchText, setSearchText] = React.useState("");
    const [beneficiaries, setBeneficiaries] = React.useState([]);

    const Item = ({item}) => {
      let accInfo = item.Beneficiary_name + " (" +  item.Bank + ") " + '\n' + item.Account_number;

      if (!searchText || searchText.trim().length < 1) {
       return (
        <AccountInfo key={item.Account_number} Account={item.Beneficiary_name + " (" +  item.Bank + ") " + '\n' + item.Account_number} ToWhere={() => navigation.navigate('BeneficiaryTransferDetails', {User_Id: item.User_ID, Account_holder: item.Beneficiary_name, Bank: item.Bank, Account_number: item.Account_number})}/>
       );
      }
      
       const indx = accInfo.toLowerCase().indexOf(searchText.toLowerCase());
       const length = searchText.length;
       let leftText = accInfo.substr(0, indx);
       let keyWord = accInfo.substr(indx, length);
       let rightText = accInfo.substr(indx + length);

      if (indx < 0) return null;

       return (
        <AccountInfo key={item.Account_number} Account={leftText + keyWord + rightText} ToWhere={() => navigation.navigate('BeneficiaryTransferDetails', {User_Id: item.User_ID, Account_holder: item.Beneficiary_name, Bank: item.Bank, Account_number: item.Account_number})}/>
       );
    }

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
                        <CustomSearchBar Title="Search beneficiary" value={searchText} onChangeText={setSearchText}/>
                        <FlatList 
                            data={beneficiaries}
                            renderItem={Item}
                            keyExtractor={item => item.Account_number}
                        />
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