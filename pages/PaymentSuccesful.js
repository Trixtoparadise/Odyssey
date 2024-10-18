import { Divider, Icon } from '@rneui/themed';
import { View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';

const PaymentSuccessful = ({navigation}) => {
    return (
        <>
            <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
               <View style={{marginHorizontal: 20}}> 
                <Text
                style={{
                    alignSelf: 'center',
                    fontSize:40,
                    width: 228,
                    height: 150,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: 'rgba(0, 44, 106, 255)',
                    marginTop: 80
                }}
                >
                    Payment{"\n"}Successful
                </Text>
                
                <Icon
                    name='check-circle'
                    type='feather'
                    color='rgba(0, 44, 106, 255)'
                    alignSelf= 'center'
                    size={50}
                />
                
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20}}>
                    <CustomButton buttonTitle='Make A Payment' ToWhere={() => navigation.navigate('Transfer')}/>
                    <CustomButton buttonTitle='Back to Home' ToWhere={() => navigation.navigate('Home')}/>
                </View> 

               </View>
            </View>
        </>
      
    );
} 

export default PaymentSuccessful; 