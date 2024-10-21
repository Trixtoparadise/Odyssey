import React from 'react';
import { Divider } from '@rneui/themed';
import { FlatList, Text, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
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
                    There are no notifications {"\n"}
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
                        <CustomHeading Title='Notifications'/>
                        <CustomSearchBar Title="Search transaction"/>
                        <FlatList 
                            data={data}
                            renderItem={({item}) =>
                                <TouchableOpacity > 
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
    title: {
        fontSize: 15,
        color: 'rgba(0, 44, 106, 255)',
    },
})


export default Notifications;