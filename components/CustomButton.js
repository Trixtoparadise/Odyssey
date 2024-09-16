import { Button, ThemeProvider, createTheme } from '@rneui/themed'

const theme = createTheme({
    components: {
     Button : {
        titleStyle: {
          fontSize: 14
        },
        containerStyle: {
          alignSelf: 'center',
          height: 40,
          width: 146,
          marginBottom: 20,
          marginTop: 20,
          marginHorizontal: 15,
        },
        buttonStyle: {
          backgroundColor: 'rgba(0, 44, 106, 255)',
          borderRadius: 25,
        }
      }
    }
    
  });

const CustomButton = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <Button
            title={props.buttonTitle}
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            onPress={props.ToWhere}
            />
        </ThemeProvider> 
    );
}

export default CustomButton;