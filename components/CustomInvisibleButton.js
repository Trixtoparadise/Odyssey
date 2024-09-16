import { Button, ThemeProvider, createTheme } from "@rneui/themed";

const theme = createTheme({
    components: {
     Button : {
        titleStyle: { 
            color: 'rgba(0, 44, 106, 255)', 
            fontSize: 14 
        },
        containerStyle: {
            width: 200,
            alignSelf: 'center',
            marginVertical: 0,
        }
      }
    }
  });

const CustomInvisibleButton = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Button
                title={props.buttonTitle}
                type="clear"
                onPress={props.ToWhere}
            />
        </ThemeProvider>
    );
} 

export default CustomInvisibleButton;