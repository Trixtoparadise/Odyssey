import { Text, View, StyleSheet } from 'react-native';
import { Input } from '@rneui/themed';
import CustomButton from '../components/CustomButton';
import CustomInvisibleButton from '../components/CustomInvisibleButton';
import Logo from '../components/Logo';
import CustomInput from '@/components/CustomInput';

export default function SignUp({navigation}) {
  return (
    <>
      <View style={styles.container}>
        
        <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={120} height={120} />

        <CustomInput Title='ID Number' placeholder='Enter your ID number' />
        <CustomInput Title='Phone Number' placeholder='Enter your phone number' />
        <CustomInput Title='New Password' placeholder='Enter your password' />
        <CustomInput Title='Confirm Your Password' placeholder='Enter your password again' />
               
        <CustomButton  buttonTitle='Sign up' ToWhere={() => navigation.navigate('HomeTabs')}/>
        
        <CustomInvisibleButton buttonTitle="Have an account already? Login" ToWhere={() => navigation.navigate('Login')}/>
        
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