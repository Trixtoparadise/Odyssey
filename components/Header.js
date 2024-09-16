import { Button, Divider } from '@rneui/themed';
import { View, TouchableOpacity } from 'react-native'
import Logo from './Logo';

const Header = (props) => {
    return (
        <>
            <View 
                style={{ 
                    flexDirection: 'row', 
                    flexWrap: 'wrap', 
                    alignSelf: 'center',
                    backgroundColor: 'white',
                }}
            >
                <Button
                icon={{
                    name: 'arrowleft',
                    type: 'antdesign',
                    size: 40,
                    color: 'rgba(0, 44, 106, 255)',
                }}
                type="clear"
                onPress={props.ToWhere1}
                TouchableComponent={TouchableOpacity}
                containerStyle={{
                    width: 80,
                    paddingVertical: 20,
                }}                
                />

                <Logo 
                imageURL='https://i.ibb.co/895CsJY/Logo.png' 
                width={70} 
                height={70} 
                />

                <Button
                icon={{
                    name: 'user',
                    type: 'feather',
                    size: 40,
                    color: 'rgba(0, 44, 106, 255)',
                }}
                onPress={props.ToWhere2}
                type="clear"
                TouchableComponent={TouchableOpacity}
                containerStyle={{
                    width: 80,
                    paddingVertical: 20,
                }}                
                />

            </View>

            <Divider width={0.6} />
        </>
    );
}

export default Header;