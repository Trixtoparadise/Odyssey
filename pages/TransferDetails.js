import { useState } from 'react'
import { Divider } from '@rneui/themed';
import { View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInput from '@/components/CustomInput';
import DropDownPicker from 'react-native-dropdown-picker';

  


const TransferDetails = ({navigation}, props) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] =useState([
      {label: 'Mr H. Mhlanga (Savings Account) 023444321123', value: ' 023444321123'},
      {label: 'Mr H. Mhlanga (Savings Account) 023444321123', value: ' 023444321124'},
    ]);
  
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
                    Mr J. Doe{"\n"}
                    (Selis Bank){"\n"}
                    8965356335677
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
                  placeholder='Select an account'
                />
                <CustomInput Title='Amount' placeholder='Enter your amount' />
                <CustomInput Title='Reference' placeholder='Enter your reference' />
                
                <CustomButton buttonTitle='Confirm Payment' ToWhere={() => navigation.navigate('PaymentSuccessful')}/>
              </View> 
            </View>
          </>
      
    );
} 

export default TransferDetails; 