import { Divider } from '@rneui/themed';
import { View } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import TransactionList from '@/components/TransactionList'

const Transactions = ({navigation}) => {
    return (
        <>
            <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <View style={{ marginHorizontal: 30, marginTop: 20, height: '80%'}}>
                    <CustomHeading Title='Transactions'/>
                    <CustomSearchBar Title="Search transaction"/>
                    <TransactionList ToWhere={() => navigation.navigate('TransactionDetails')}/>
                </View>
            </View>
        </> 
    );
}

export default Transactions;