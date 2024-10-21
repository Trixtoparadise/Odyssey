import { useState, useEffect } from 'react';
import { Divider } from '@rneui/themed';
import { View, Text, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '@/components/CustomInput';
import DropDownPicker from 'react-native-dropdown-picker';

const AccountTransferDetails = ({route, navigation}, props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(0);
    const [ref, setRef] = useState("");
    
    const { Account_holder_Id, Account_holder, Account_number, Balance } = route.params;

    useEffect(() => {
      const handleAccounts = async () => {
        let headersList = {
          "Content-Type": "application/json"
        }
        
        let bodyContent = JSON.stringify({
          "id": parseInt(Account_holder_Id)
        }
        );
        
        try {
          let response = await fetch("http://10.10.17.11:5000/api/getuseraccountnumbers", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
          });

          let data = await response.json();
          let obj = data.find(o => o.value === Account_number);

          if (obj) {
            let index = data.indexOf(obj);
            data.splice(index, 1);
          }
        
          setItems(data);
        } catch (e) {
          console.log(e);
        }         
      }

      handleAccounts();
    }, []);

    const createTwoButtonAlert = () =>
      Alert.alert('Process Payment', 'Are you sure you want to proceed with your payment?', [
        {
          text: 'Cancel',
          onPress: () => {return;},
          style: 'cancel',
        },
        {text: 'OK', onPress: MakePayment},
      ]);

    const MakePayment = async () => {
      let bal = items.find(o => o.value === value)

      let headersList = {
        "Content-Type": "application/json"
      }

      let bodyContent = JSON.stringify({
        "accountNumber": value,
        "recAccountNumber": Account_number, 
        "amount": parseFloat(amount), 
        "balance": bal.balance, 
        "recBalance": Balance
      });
      
      try {
        let response = await fetch("http://10.10.17.11:5000/api/makeaccountpayment", { 
          method: "PUT",
          body: bodyContent,
          headers: headersList
        });

        let data = await response.json();
        
        if ( response.status == 200 ) {
          RecordTransaction(data.updatedBalance.Balance, data.updatedRecBalance.Balance ,bal.member);
          createNotification(Account_holder_Id, Account_holder_Id, amount, bal.member, Account_holder);
          navigation.navigate('PaymentSuccessful');
        }  
        
      } catch (e) {
        console.log(e);
      }
    }

    const RecordTransaction = async (balance, recBalance, member) => {
      let headersList = {
        "Content-Type": "application/json"
      }
       
      let bodyContent = JSON.stringify({
        "balance": balance,
        "recBalance": recBalance,
        "amount": amount, 
        "member": member,
        "recMember": Account_holder,
        "accountNumber": value,
        "recAccountNumber": Account_number,
        "reference": ref
      });
       
      try {
        await fetch("http://10.10.17.11:5000/api/recordAccountTransaction", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });
        
      } catch (e) {
        console.log(e);
      }
    }

    const createNotification = async (id, recId, amount, member, recMember) => {
      let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "id": id, 
         "recId": recId, 
         "amount": amount, 
         "member": member, 
         "recMember": recMember,
         "reference": ref
       });

       try {
        let response = await fetch("http://10.10.17.11:5000/api/createNotification", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });

       } catch (e) {
        console.log(e)
       }
    }

    return (
      <>
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
        <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
          <View style={{ marginHorizontal: 60, marginTop: 20}}>
            
            <Text
            style={{
                alignSelf: 'center',
                fontSize:25,
                width: 228,
                height: 150,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'rgba(0, 44, 106, 255)',
                marginTop: 80
            }}
            >
                {Account_holder}{"\n"}
                (Odyssey Bank){"\n"}
                {Account_number}
            </Text>
            
            <Text style={{ fontSize: 16,}}>Account</Text>
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
              placeholder='Select an account to pay with'
            />
            <CustomInput Title='Amount' placeholder='Enter your amount' value={amount} onChange={(text) => {setAmount(text)}}/>

            <CustomInput Title='Reference' placeholder='Enter your reference' value={ref} onChange={(text) => {setRef(text)}}/>
            
            <CustomButton buttonTitle='Confirm Payment' ToWhere={createTwoButtonAlert}/>
          </View> 
        </View>
      </>  
    );
} 

export default AccountTransferDetails; 