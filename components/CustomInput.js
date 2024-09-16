import { Input } from '@rneui/themed';
import { Text } from 'react-native';

const CustomInput = (props) => {
    return (
        <>
            <Text style={{ fontSize: 16,}}>{props.Title}</Text>
            <Input
                placeholder={props.placeholder}
                inputContainerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 15,
                    borderWidth: 1,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                    height: 40,
                    marginVertical: 5,
                    marginHorizontal: -8,
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                }}
                inputStyle={{
                    fontSize: 15,
                }}
            />
        </>
    );
}

export default CustomInput;
