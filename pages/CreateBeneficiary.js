import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
import CustomInput from '@/components/CustomInput';
import CustomHeading from '@/components/CustomHeading';
import DropDownPicker from 'react-native-dropdown-picker';

class User {
  constructor(username, phoneNumber, id) {
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.id = id;
  }
}

export default function CreateBeneficiary({navigation}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [items, setItems] = React.useState([
    {label: 'Odyssey Bank', value: 'Odyssey Bank'},
    {label: 'Selis Bank', value: 'Selis Bank'},
    {label: 'Lorem Bank', value: 'Lorem Bank'},
  ]);
  const [user, setUser] = React.useState(new User("", 0, 0));
  const [beneficiaryName, setBeneficiaryName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState(0);
 
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
      Alert.alert('Add beneficiary', 'Are you sure you want to add beneficiary?', [
        {
          text: 'Cancel',
          onPress: () => {return;},
          style: 'cancel',
        },
        {text: 'OK', onPress: CreateBeneficiary},
      ]);

  const CreateBeneficiary = async () => {
  
    let headersList = {
      "Content-Type": "application/json"
     }

     let bodyContent = JSON.stringify({ 
       "id": parseInt(user.id),
       "beneficiaryName": beneficiaryName,
       "accountNumber": parseInt(accountNumber),
       "bank": value,
     });
     
     let response = await fetch("http://10.10.17.11:5000/api/addbeneficiary", { 
       method: "POST",
       body: bodyContent,
       headers: headersList,
     });
     
     if (response.status == 200) {
      navigation.navigate('HomeTabs')
    }
     
  }
  
  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white'}}>
      <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
      <View style={styles.container}>
        <View style={{ marginVertical: 30}}>
          <CustomHeading Title='Add your beneficiary'/>
        </View>

        <CustomInput Title='Beneficiary Name' placeholder="Enter the name of your beneficiary" value={beneficiaryName} onChange={text => setBeneficiaryName(text)} />
        <CustomInput Title='Beneficiary account number' placeholder='Enter account number' value={accountNumber} onChange={text => setAccountNumber(text)} />
        <Text style={{ fontSize: 16,}}>Beneficiary bank</Text>
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
          placeholder='Select your bank'
        />

        <CustomButton  buttonTitle='Continue' ToWhere={createTwoButtonAlert}/>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 60,
  }
});