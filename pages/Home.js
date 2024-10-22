import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Divider, Button } from '@rneui/themed';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import AccountInfo from '../components/AccountInfo';
import ExpansionButton from '../components/ExpansionButton';

class User {
  constructor(username, phoneNumber, id) {
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.id = id;
  }
}

const Home = ({ navigation }) => {
  const [user, setUser] = React.useState(new User("", 0, 0));
  const [acc, setAcc] = React.useState();
  
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
    const handleAccountData = async () => {
      let headersList = {
        "Content-Type": "application/json"
      }
      
      let bodyContent = JSON.stringify({
        "id": user.id
      }
      );
      
      try {
        const response = await fetch("http://10.10.17.11:5000/api/gethome", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });

        let data = await response.text();
        
        setAcc(JSON.parse(data));
      } catch (e) {
        console.log(e);
      }
    } 

  handleAccountData();
  
  if (acc != undefined) {
    if (acc.accounts.length == 0 && acc.beneficiaries.length == 0){
      return (
        <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
          <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
          <View style={{ marginHorizontal: 30, marginTop: 180, height: '80%'}}>
            <CustomHeading Title={'Welcome to Odyssey Banking :)' + "\n" + 'Please click the button' + "\n" +'below to open a new account'}/>
            <ExpansionButton buttonTitle='Open new account' buttonWidth={180} ToWhere={() => navigation.navigate('OpenAccount') }/>
          </View>
        </View>
      );
    } else if (acc.accounts.length != 0 || acc.beneficiaries.length != 0) {
      let listAccounts;
      let listBeneficiaries;
      let exBenbutton;

      let mod = acc.accounts.slice(0,2);
      let mod2 = acc.beneficiaries.slice(0,2);
      
      if (mod.length != 0) {
        listAccounts = mod.map((account) =>
          <AccountInfo key={account.Account_number} Account={"Mr " + account.First_name + " " + account.Last_name + " (" + account.Account_Type + " Account) " + account.Account_number} ToWhere={() => navigation.navigate('ViewAccount', {Account_holder_Id: account.Account_holder_Id, Account_holder: "Mr " + account.First_name + " " + account.Last_name, Account_number: account.Account_number, Account_Type: account.Account_Type, Balance: account.Balance})}/>
        );
        exAccbutton = <ExpansionButton buttonTitle='All accounts' buttonWidth={120} ToWhere={() => navigation.navigate('Accounts') }/>;
      }
  
      if (mod2.length != 0) {
        listBeneficiaries = mod2.map((beneficiary) =>
          <AccountInfo key={beneficiary.Account_number} Account={beneficiary.Beneficiary_name + " (" +  beneficiary.Bank + ") " + '\n' + beneficiary.Account_number} ToWhere={() => navigation.navigate('ViewBeneficiary', {User_Id: beneficiary.User_ID, Account_holder: beneficiary.Beneficiary_name, Bank: beneficiary.Bank, Account_number: beneficiary.Account_number})}/>
        );
        exBenbutton = <ExpansionButton buttonTitle='All beneficiaries' buttonWidth={140} ToWhere={() => navigation.navigate('Beneficiaries') }/>;
      } else {
        listBeneficiaries = <Text style={{ marginHorizontal: 30, marginTop: 20, fontSize: 30, color: 'rgba(0, 44, 106, 255)', fontStyle: 'bold' }}>No Beneficiaries</Text>;
        exBenbutton = <Button 
                        title={"Add new beneficiary"}
                        icon={{
                        name: 'pluscircleo',
                        type: 'antdesign',
                        size: 12,
                        color: 'rgba(0, 44, 106, 255)',
                        }}
                        onPress={() => navigation.navigate('CreateBeneficiary')}
                        type="clear"
                        containerStyle={{
                        width: 150,
                        alignSelf: 'left',
                        paddingTop: 10,
                        marginLeft: 10,
                        }}
                        titleStyle={{ 
                        color: 'rgba(0, 44, 106, 255)', 
                        fontSize: 14 
                        }}
                    />
      }
      
      return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>  
  
          <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
          <View style={{ marginHorizontal: 30, marginTop: 20  }}>     
  
            <CustomHeading Title='Accounts'/>
            {listAccounts}
            {exAccbutton}
          </View>
  
          <View style={{ marginHorizontal: 30, marginTop: 20 }}>
            <CustomHeading Title='Beneficiaries' />
            {listBeneficiaries}
            {exBenbutton}
          </View>
          </View>
      );
    }
    } else {
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
    }
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

export default Home;