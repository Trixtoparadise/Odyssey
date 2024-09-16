import { Divider } from '@rneui/themed';
import { View } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import AccountInfo from '../components/AccountInfo';
import ExpansionButton from '../components/ExpansionButton';

const Home = ({ navigation }) => {

    return (
          <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>  

            <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
            <View style={{ marginHorizontal: 30, marginTop: 20 }}>     

              <CustomHeading Title='Accounts'/>

              <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('ViewAccount')}/>
              <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('ViewAccount')}/>

              <ExpansionButton buttonTitle='All accounts' buttonWidth={120} ToWhere={() => navigation.navigate('Accounts') }/>
              
              <CustomHeading Title='Beneficiaries' />

              <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('ViewBeneficiary')}/>
              <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('ViewBeneficiary')}/>

              <ExpansionButton buttonTitle='All beneficiaries' buttonWidth={140} ToWhere={() => navigation.navigate('Beneficiaries') }/>

            </View>
          </View>
    );
}

export default Home;