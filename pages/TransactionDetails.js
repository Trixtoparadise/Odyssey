import { View, Text } from 'react-native';
import { Divider } from '@rneui/themed';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import CustomButton from '../components/CustomButton';
import React from 'react';

const html = `
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
    </head>
    <body style="text-align: center;">
        <img 
            src="https://i.ibb.co/895CsJY/Logo.png"
            style="width: 90px; height: 90px"
        >
        <h3 style="marginHorizontal: 15; fontSize: 18; marginVertical: 20; alignSelf: 'center'; color: 'rgba(0, 44, 106, 255);">
                    Date:                   2024-09-04<br>
                    Description:       Bill Payment : -R100<br>
                    Ref:                      Odyssey Bank<br>
                    Type:                   Fees  Monthly<br>
                    Time:                   10:39 am<br>
                    Balance:             R2618.75
        </h3>
    </body>
</html>
`;

const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
}

const TransactionDetails = ({navigation}) => {

    return (        
        
            <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
                <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
                <Text
                    style={{
                        alignSelf: 'center',
                        fontSize:25,
                        width: 228,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'rgba(0, 44, 106, 255)',
                        marginTop: 80
                    }}
                >
                    Transaction Details
                </Text>

                <Text style={{marginHorizontal: 15, fontSize: 18, marginVertical: 20, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                    Date:                   2024-09-04{"\n"}
                    Description:       Bill Payment : -R100{"\n"}
                    Ref:                      Odyssey Bank{"\n"}
                    Type:                   Fees  Monthly{"\n"}
                    Time:                   10:39 am{"\n"}
                    Balance:             R2618.75{"\n"}
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' }}>
                    <CustomButton buttonTitle='Save as PDF' ToWhere={printToFile}/>
                    <CustomButton buttonTitle='Back to Home' ToWhere={() => navigation.navigate('Home')} />
                </View>                
            </View> 
    );
}

export default TransactionDetails;
