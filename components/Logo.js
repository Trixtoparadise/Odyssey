import { Image } from 'react-native';

const Logo = (props) => {
    return (
            <Image
                style={{
                    width: props.width,
                    height: props.height,
                    alignSelf: 'center',
                }}
                source={{
                    uri: props.imageURL
                }}
            />
    );
}

export default Logo;