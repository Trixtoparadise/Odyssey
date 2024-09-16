import { Text, View, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
import CustomInvisibleButton from '../components/CustomInvisibleButton';
import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';

export default function Login({navigation}) {
  return (
    <>
      <View style={styles.container}>
        
        <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={120} height={120}/>

        <CustomInput Title='ID Number' placeholder='Enter your ID number' />

        <CustomInput Title='Password' placeholder='Enter your password' />
        
        <CustomButton  buttonTitle='Log in' ToWhere={() => navigation.navigate('HomeTabs')}/>
        
        <CustomInvisibleButton buttonTitle="Don't have an account yet? Sign up" ToWhere={() => navigation.navigate('Signup')} />
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 60,
  }
});
