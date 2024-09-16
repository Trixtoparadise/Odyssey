import { Button } from "@rneui/themed";

const ExpansionButton = (props) => {
    return (
        <Button 
            title={props.buttonTitle}
            icon={{
            name: 'caretright',
            type: 'antdesign',
            size: 12,
            color: 'rgba(0, 44, 106, 255)',
            }}
            onPress={props.ToWhere}
            type="clear"
            containerStyle={{
            width: props.buttonWidth,
            alignSelf: 'left',
            paddingTop: 10,
            }}
            titleStyle={{ 
            color: 'rgba(0, 44, 106, 255)', 
            fontSize: 14 
            }}
        />
    ); 
}

export default ExpansionButton;