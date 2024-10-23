import { View, Text, Platform } from 'react-native';
import { Divider } from '@rneui/themed';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
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

const createAndSavePDF = async () => {
    const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions.granted) {
            return;
        } 

    try {
        await StorageAccessFramework.createFileAsync(permissions.directoryUri, 'file', 'application/pdf')
            .then(async(uri) => {
                await FileSystem.writeAsStringAsync(uri, html, { encoding: FileSystem.EncodingType.Base64 });
            })
            .catch((e) => {
                console.log(e);
            });
    } catch (e) {
        throw new Error(e);
    }
};

const TransactionDetails = ({route, navigation}) => {
    const {Member, Date, Description, Ref, Time, Balance} = route.params;
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
                    Account Holder:   {Member}{"\n"}
                    Date:                       {Date}{"\n"}
                    Amount:                 {Description}{"\n"}
                    Ref:                          {Ref}{"\n"}
                    Time:                       {Time}{"\n"}
                    Balance:                 R{Balance}{"\n"}
                </Text>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' }}>
                    <CustomButton buttonTitle='Save as PDF' ToWhere={() => createAndSavePDF(html)}/>
                    <CustomButton buttonTitle='Back to Home' ToWhere={() => navigation.navigate('Home')} />
                </View>                
            </View> 
    );
}

export default TransactionDetails;
