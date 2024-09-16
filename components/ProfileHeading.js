import { Text } from 'react-native';

const ProfileHeading = () => {
    return (
        <>
            <Text
              style={{
                alignSelf: 'center',
                fontSize:30,
                width: 228,
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'rgba(0, 44, 106, 255)',
                marginTop: 80
              }}
            >
              Profile
            </Text>
        </>
    );
}

export default ProfileHeading;