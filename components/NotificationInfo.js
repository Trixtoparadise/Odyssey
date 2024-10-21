import { Text, Button } from '@rneui/themed';
import { View, TouchableOpacity, Alert } from 'react-native';

const NotificationInfo = (props) => {
    const createTwoButtonAlert = () =>
        Alert.alert('Delete Notification', 'Are you sure you want to delete your notification?', [
          {
            text: 'Cancel',
            onPress: () => {return;},
            style: 'cancel',
          },
          {text: 'OK', onPress: DeleteNotification},
        ]);
    
    const DeleteNotification = async () => {
        let headersList = {
            "Content-Type": "application/json"
           }
           
           let bodyContent = JSON.stringify({
             "message" : props.Notification
           });
           
           try {
               await fetch("http://10.10.17.11:5000/api/DeleteNotification", { 
                 method: "DELETE",
                 body: bodyContent,
                 headers: headersList
               });
           
           } catch (e) {
            console.log(e);
           }
    }
    
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'left '}}>
            <Text 
                style={{ 
                alignSelf: 'left', 
                fontSize: 15, 
                fontWeight: 'bold',
                color: 'rgba(0, 44, 106, 255)',
                borderWidth: 1, 
                borderStyle: 'solid',
                borderColor: 'rgba(0, 44, 106, 255)',
                borderRadius: 15,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: 'rgb(230, 228, 237)',
                marginTop: 20,
                width: 275,
                }}  
            >
            {props.Notification} 
            </Text>
            
            <>
                <Button
                    icon={{
                    name: 'trash',
                    type: 'evilicon',
                    size: 30,
                    color: 'rgba(0, 44, 106, 255)'
                    }}
                    TouchableComponent={TouchableOpacity}
                    type="clear"
                    onPress={createTwoButtonAlert}
                    containerStyle={{
                    width: 55,
                    alignSelf: 'left',
                    paddingVertical: 20,
                    backgroundColor: 'white'
                    }}                
                />
            </>

        </View>
    );
}

export default NotificationInfo;