import React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Divider } from '@rneui/themed';
import { FlatList, Text, StatusBar, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import CustomHeading from '../components/CustomHeading';
import CustomSearchBar from '../components/CustomSearchBar';
import NotificationInfo from '../components/NotificationInfo';

class User {
    constructor(username, phoneNumber, id) {
      this.username = username;
      this.phoneNumber = phoneNumber;
      this.id = id;
    }
}

const Notifications = () => {
    const [data, setData] = React.useState([]);
    const [emp, setEmp] = React.useState("");
    const [searchText, setSearchText] = React.useState("");
    const [user, setUser] = React.useState(new User("", 0, 0));

    const Item = ({item}) => {
       if (!searchText || searchText.trim().length < 1) {
        return (
            <View>
                <NotificationInfo Notification={item.title}/>
            </View>
        );
       }
       
        const indx = item.title.indexOf(searchText);
        const length = searchText.length;
        let leftText = item.title.substr(0, indx);
        let keyWord = item.title.substr(indx, length);
        let rightText = item.title.substr(indx + length);

       if (indx < 0) return null;

        return (
            <View>
                <NotificationInfo Notification={leftText + keyWord + rightText}/>
            </View>
        );
    };
 
    React.useEffect(() => {
        async function handleUserData () {
            let userToken = null;
            let retToken;
            
            try {
                retToken = await SecureStore.getItemAsync('userToken');
                if (retToken != null){
                    userToken = "Bearer " + retToken.replace(/"/g, ''); 
                }
            } catch (e) {
                console.log(e);
            }
            let headersList = {
                "Authorization": userToken
            }
            
            try {
                const response = await fetch("http://10.10.17.11:5000/api/user", { 
                    method: "GET",
                    headers: headersList
                });
                
                const data = await response.json();
                setUser(data);
            } catch(e) {
                console.log(e)
            }
        }
        
        handleUserData();
    }, []);

    const handleAccounts = async () => {
        let headersList = {
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "id": user.id
           });
        
        try{    
            let response = await fetch("http://10.10.17.11:5000/api/getnotifications", { 
                method: "POST",
                body: bodyContent,
                headers: headersList
            });
            
            let data = await response.text();
            if (data == 'No notifications') {
                setEmp(data);
            } else if (data != 'No notifications') {
                data = JSON.parse(data);
                data.reverse();
                setData(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleAccounts();

    if (data.length == 0 && emp == "") {
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
    } else if (data.length !=0) {
        return (
            <>
                <View style={{backgroundColor: 'white', width: '100%', height: '100%'}}>
                    <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                    <View style={{ marginHorizontal: 30, marginTop: 20, height: '80%'}}>
                        <CustomHeading Title='Notifications'/>
                        <CustomSearchBar Title="Search transaction" value={searchText} onChangeText={setSearchText} />
                        <FlatList 
                            data={data}
                            renderItem={Item}
                            keyExtractor={Item.id}
                        />
                    </View>
                </View>
            </> 
        );
    } else if (data.length == 0 && emp == 'No notifications') {
        return (
            <View style={{backgroundColor: 'white', width: '100%', height: '100%' }}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <View style={styles.splashContainer}>
                    <Text style={{marginHorizontal: 30, fontSize: 22, marginBottom: 20, marginTop: 230, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                        No notifications
                    </Text>
                </View>
            </View>
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