import { Icon } from '@rneui/themed';
import { Text } from 'react-native';

const PaymentHeading = () => {
    return (
        <>
            <Text
              style={{
                alignSelf: 'center',
                fontSize:40,
                width: 228,
                height: 150,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'rgba(0, 44, 106, 255)',
                marginTop: 80
              }}
            >
              Who do you want to{"\n"}pay?
            </Text>
            
            <Icon
              name='users'
              type='feather'
              color='rgba(0, 44, 106, 255)'
              alignSelf= 'center'
              size={50}
              paddingTop={10}
            />
        </>
    );
}

export default PaymentHeading;