import { View, Text, TouchableOpacity } from 'react-native';

const AccountInfo = (props) => {
    return (
        
        <View
            style={
                { 
                borderWidth: 1, 
                borderStyle: 'solid',
                borderColor: 'rgba(0, 44, 106, 255)',
                borderRadius: 15,
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: 'rgb(230, 228, 237)',
                marginTop: 20,
                }
            }
            
        >
        <TouchableOpacity>    
            <Text
                style={{ 
                    alignSelf: 'left', 
                    fontSize: 15, 
                    fontWeight: 'bold',
                    color: 'rgba(0, 44, 106, 255)',
                }}
                onPress={props.ToWhere}
            >
             {props.Account}   
            </Text>
        </TouchableOpacity>
        </View>
    );
}

export default AccountInfo;