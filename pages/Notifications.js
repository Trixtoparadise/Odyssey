import React from 'react';
import { Divider } from '@rneui/themed';
import { FlatList, Text, StatusBar, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import NotificationInfo from '../components/NotificationInfo';

const Item = ({title}) => (
    <View>
        <NotificationInfo Notification={title}/>
    </View>
);

const Notifications = () => {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        const handleAccounts = async () => {
            try{    
                let response = await fetch("http://10.10.17.11:5000/api/getnotifications", { 
                    method: "GET",
                });
                
                let data = await response.json();
                data.reverse();
                setData(data);
            } catch (e) {
                console.log(e);
            }
        }
        handleAccounts();
    }, );

    if (data.length == 0) {
        return (
            <View style={{backgroundColor: 'white', width: '100%', height: '100%' }}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <View style={styles.splashContainer}>
                    <Text style={{marginHorizontal: 30, fontSize: 22, marginBottom: 20, marginTop: 230, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                        Please Wait
                    </Text>
                <ActivityIndicator size="large" color="rgba(0, 44, 106, 255)" />
                </View>
            </View>
        );
    } else {
        return (
            <>
                <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                    <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                    <View style={{ marginHorizontal: 30, marginTop: 20, height: '80%'}}>
                        <CustomHeading Title='Notifications'/>
                        <CustomSearchBar Title="Search transaction"/>
                        <FlatList 
                            data={data}
                            renderItem={({item}) =>
                                <Item title={item.title}/>
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
    title: {
        fontSize: 15,
        color: 'rgba(0, 44, 106, 255)',
    },
})


export default Notifications;