import { Text } from '@rneui/themed';

const CustomHeading = (props) => {
    return (
        <Text
            style={{ 
                alignSelf: 'left', 
                fontSize: 25, 
                fontWeight: 'bold',
                color: 'rgba(0, 44, 106, 255)',
            }}
        >
            {props.Title}
        </Text>
    );
}

export default CustomHeading;