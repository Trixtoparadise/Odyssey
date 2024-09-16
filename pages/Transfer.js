import { Divider } from '@rneui/themed';
import { View } from 'react-native';
import CustomButton from '../components/CustomButton';
import PaymentHeading from '../components/PaymentHeading';

const Transfer = ({navigation}) => {
    return (
          <>

            <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
              <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
              <PaymentHeading />
              
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20}}>
                <CustomButton buttonTitle='My own account' ToWhere={() => navigation.navigate('AccountsToPay')}/>
                <CustomButton buttonTitle='Beneficiary' ToWhere={() => navigation.navigate('BeneficiariesToPay')}/>
              </View> 

            </View>
          </>
      
    );
} 

export default Transfer; 