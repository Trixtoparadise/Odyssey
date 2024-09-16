import { Text, Button } from '@rneui/themed';
import { View, TouchableOpacity } from 'react-native';

const NotificationInfo = (props) => {
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