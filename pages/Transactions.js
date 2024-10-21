import React from 'react';
import { Divider } from '@rneui/themed';
import { FlatList, Text, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';

const Item = ({title}) => (
    <View style={styles.item}>
        <Text style={styles.title}>
            {title}
        </Text>
    </View>
);

const Transactions = ({navigation}) => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const handleAccounts = async () => {
            try{    
                let response = await fetch("http://10.10.17.11:5000/api/gettransactions", { 
                    method: "GET",
                });
                
                let data = await response.json();
                setData(data);
            } catch (e) {
                console.log(e);
            }
        }
        handleAccounts();
    }, []);
    
    if (data.length == 0) {
        return (
            <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
              <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <Text style={{ alignSelf: 'center', marginTop: 230, fontSize: 25, color: 'rgba(0, 44, 106, 255)'}}>
                    There are no transactions {"\n"}
                    available at the moment.
                </Text>
            </View>
        );
    } else {
        return (
            <>
                <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                    <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                    <View style={{ marginHorizontal: 30, marginTop: 20, height: '80%'}}>
                        <CustomHeading Title='Transactions'/>
                        <CustomSearchBar Title="Search transaction"/>
                        <FlatList 
                            data={data}
                            renderItem={({item}) =>
                                <TouchableOpacity onPress={() => navigation.navigate('TransactionDetails', {Date: item.Date, Description: item.Description, Ref: Math.floor(Math.random() * 100000000), Time: item.Time, Balance: item.Balance})}> 
                                    <Item title={item.title}/>
                                </TouchableOpacity>
                            }
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </> 
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,

    },
    item: {
        borderRadius:10,  
        backgroundColor: '#E6E4ED', 
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
    },
    title: {
        fontSize: 15,
        color: 'rgba(0, 44, 106, 255)',
    },
})

export default Transactions;