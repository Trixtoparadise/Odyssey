import { Divider } from '@rneui/themed';
import { View, TouchableOpacity } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import AccountInfo from '../components/AccountInfo';

const AccountsToPay = ({navigation}) => {
    return (
        <>
            <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <View style={{ marginHorizontal: 30, marginTop: 20}}>
                    <CustomHeading Title='Select an account to pay'/>
                    <CustomSearchBar Title="Search account"/>

                    <AccountInfo Account='
                    ' ToWhere={() => navigation.navigate('TransferDetails')} />
                    <AccountInfo Account='Mr H. Mhlanga (Savings Account) 023444321123' ToWhere={() => navigation.navigate('TransferDetails')}/>

                </View>
            </View>
        </> 
    );
}

export default AccountsToPay;