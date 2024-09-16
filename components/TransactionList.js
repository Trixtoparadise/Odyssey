import React from 'react';
import { FlatList, Text, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';

const Data=[
    {id: 1, title: 'Monthly instalment : INSURANCE -R205.65'},
    {id: 2, title: 'Bank deposit : Ref Mr H. Mhlanga +R110.'},
    {id: 3, title: 'Monthly instalment : CREDIT -R205.65'},
    {id: 4, title: 'Bill Payment : HOTEL -R560.40'},
    {id: 5, title: 'Bill Payment : Fees  Monthly -R100'},
    {id: 6, title: 'Bank deposit : Ref Mr J. Doe +R200.'},
    {id: 7, title: 'Bank withdrawal : 41 Lane St. JHB -R80.'},
    {id: 8, title: 'Bank deposit : Ref Mr H. Mhlanga +R140.'},
    {id: 9, title: 'Monthly instalment - Electronics -R205.65'},
    {id: 10, title: 'Bank withdrawal : 41 Lane St. JHB -R30.'},
    {id: 11, title: 'Bank deposit : Ref Mr H. Mhlanga +R120.'},
    {id: 12, title: 'Monthly instalment - Electronics -R215.65'},
    {id: 13, title: 'Bank deposit : Ref Mr J. Doe +R200.'},
    {id: 14, title: 'Bank withdrawal : 41 Lane St. JHB -R80.'},
    {id: 15, title: 'Bank deposit : Ref Mr H. Mhlanga +R140.'},
    {id: 16, title: 'Monthly instalment - Electronics -R205.65'},
    {id: 17, title: 'Bank withdrawal : 41 Lane St. JHB -R30.'},
    {id: 18, title: 'Bank deposit : Ref Mr H. Mhlanga +R120.'},
    {id: 19, title: 'Monthly instalment - Electronics -R215.65'},
    ];

const Item = ({title}, props) => (
    <View style={styles.item}>
            <TouchableOpacity>
                <Text 
                    style={styles.title}
                    onPress={props.ToWhere}
                >
                    {title}
                </Text>
            </TouchableOpacity>
    </View>
);

const TransactionList = () => {

    return ( 
            <FlatList 
                data={Data}
                renderItem={({item}) => <Item title={item.title}/>}
                keyExtractor={item => item.id}
            />

    );
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
        padding: 10,
    },
    title: {
        fontSize: 15,
        color: 'rgba(0, 44, 106, 255)',
    },
})

export default TransactionList;