import { View, StyleSheet, Text, Alert } from 'react-native';
import { Divider } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
import CustomInput from '@/components/CustomInput';
import CustomHeading from '@/components/CustomHeading';
import DropDownPicker from 'react-native-dropdown-picker';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { useState } from 'react';

class User {
  constructor(username, phoneNumber, id) {
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.id = id;
  }
}

export default function OpenAccount({navigation}) {
  const [user, setUser] = React.useState(new User("", 0, 0));
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pin, setPin] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Savings account', value: 'Savings'},
    {label: 'Cheque account', value: 'Cheque'},
    {label: 'Business account', value: 'Business'},
  ]);
  
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

  const createTwoButtonAlert = () =>
    Alert.alert('Open Account', 'Are you sure you want to open account?', [
      {
        text: 'Cancel',
        onPress: () => {return;},
        style: 'cancel',
      },
      {text: 'OK', onPress: OpenAccount},
    ]);

  const OpenAccount = async () => {

    let headersList = {
      "Content-Type": "application/json"
     }

     let bodyContent = JSON.stringify({ 
       "id": parseInt(user.id),
       "firstName": firstName,
       "lastName": lastName,
       "accountType": value,
       "pin": parseInt(pin)
     });
     
     let response = await fetch("http://10.10.17.11:5000/api/account", { 
       method: "POST",
       body: bodyContent,
       headers: headersList,
     });
     
     if (response.status == 200) {
      navigation.navigate('HomeTabs')
    } 
  }
  
  return (
    <>
      <View style={{ width: '100%', height: '100%', backgroundColor: 'white'}}>
        <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
        <View style={styles.container}>
          <View style={{marginVertical: 30}}>
            <CustomHeading Title='Open your account'/>
          </View>
          <CustomInput Title='First Name' placeholder='Enter your first name' value={firstName} onChange={text => setFirstName(text)} />
          <CustomInput Title='Last Name' placeholder='Enter your last name' value={lastName} onChange={text => setLastName(text)}/>
          <Text style={{ fontSize: 16,}}>Account type</Text>
          <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{ marginTop: 10, marginBottom: 20}}
                    placeholderStyle={{
                      color: 'grey',
                    }}
                    placeholder='Select an account type'
          />
          <CustomInput s433ecureTextEntry={true} Title='PIN code' placeholder='Enter your PIN code' value={pin} onChange={text => setPin(text)} />       
          <CustomButton  buttonTitle='Continue' ToWhere={createTwoButtonAlert}/>
          
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    paddingHorizontal: 60,
    paddingVertical: 30,
  }
});