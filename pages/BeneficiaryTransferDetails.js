import { useState, useEffect } from 'react'
import { Divider } from '@rneui/themed';
import { View, Text, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '@/components/CustomInput';
import DropDownPicker from 'react-native-dropdown-picker';

const BeneficiaryTransferDetails = ({route, navigation}, props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [ref, setRef] = useState("");

    const { User_Id, Account_holder, Bank, Account_number} = route.params;
    
    useEffect(() => {
      const handleAccounts = async () => {
        let headersList = {
          "Content-Type": "application/json"
        }
        
        let bodyContent = JSON.stringify({
          "id": parseInt(User_Id)
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
        "bank": Bank,
        "recAccountNumber": Account_number,
        "accountNumber": value, 
        "amount": parseFloat(amount), 
        "balance": bal.balance, 
      });
      
      try {
        let response = await fetch("http://10.10.17.11:5000/api/makebeneficiarypayment", { 
          method: "PUT",
          body: bodyContent,
          headers: headersList
        });
        
        let data = await response.json();
        if ( response.status == 200 ) {
          if (Bank == "Odyssey Bank") {
            console.log(data.updatedBalance.Balance, data.updatedRecBalance.Balance, amount, bal.member, Account_holder, value, Account_number, ref)
            RecordAccountTransaction(data.updatedBalance.Balance, data.updatedRecBalance.Balance, amount, bal.member, Account_holder, value, Account_number, ref);
            createNotification(User_Id, amount, bal.member, Account_holder, ref);
          } else {
            RecordBeneficiaryTransaction(data.updatedBalance.Balance, amount, bal.member, value, ref);
            createNotification(User_Id, amount, bal.member, Account_holder, ref);
          }
          navigation.navigate('PaymentSuccessful');
        }  
      } catch (e) {
        console.log(e);
      }
    }

    const RecordBeneficiaryTransaction = async (balance, amount, member, accountNumber, reference) => {
      let headersList = {
        "Content-Type": "application/json"
      }
       
      let bodyContent = JSON.stringify({
        "balance": balance,
        "amount": amount, 
        "member": member,
        "accountNumber": accountNumber,
        "reference": reference
      });
       
      try {
        let response = await fetch("http://10.10.17.11:5000/api/recordbeneficiaryTransaction", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });
      } catch (e) {
        console.log(e);
      }
    }

    const RecordAccountTransaction = async (balance, recBalance, amount, member, accountHolder, accountNumber, recAccountNumber, reference) => {
      let headersList = {
        "Content-Type": "application/json"
      }
       
      let bodyContent = JSON.stringify({
        "balance": balance,
        "recBalance": recBalance,  
        "amount": amount, 
        "member": member, 
        "recMember": accountHolder, 
        "accountNumber": accountNumber, 
        "recAccountNumber": recAccountNumber, 
        "reference": reference
      });
       
      try {
        let response = await fetch("http://10.10.17.11:5000/api/recordAccountTransaction", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });

      } catch (e) {
        console.log(e);
      }
    }
  
    const createNotification = async (id, amount, member, recMember, reference) => {
      let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({
         "id": id,
         "recAccountNumber": Account_number,
         "amount": amount, 
         "member": member, 
         "recMember": recMember,
         "reference": reference
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
                fontSize:30,
                width: 228,
                height: 150,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'rgba(0, 44, 106, 255)',
                marginTop: 80
            }}
            >
                {Account_holder} {"\n"}
                ({Bank}){"\n"}
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

export default BeneficiaryTransferDetails; 