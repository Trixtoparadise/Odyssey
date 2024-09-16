import { Divider } from '@rneui/themed';
import { View } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import AccountInfo from '../components/AccountInfo';
import CustomButton from '../components/CustomButton';

const Accounts = ({navigation}) => {
    return (
        <>
            <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <View style={{ marginHorizontal: 30, marginTop: 20}}>
                    <CustomHeading Title='Accounts'/>
                    <CustomSearchBar Title="Search accounts"/>

                    <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('ViewAccount')}/>
                    <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('ViewAccount')}/>

                    <CustomButton  buttonTitle='Open an account' ToWhere={() => console.log('Working')}/>
                </View>
            </View>
        </> 
    );
}

export default Accounts;