import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInvisibleButton from '../components/CustomInvisibleButton';
import Logo from '../components/Logo';
import CustomInput from '@/components/CustomInput';
import { useState } from 'react';

export default function SignUp({navigation}) {
  const [id, setID] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = React.useContext(AuthContext);
  
  return (
    <>
      <View style={styles.container}>
        
        <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={120} height={120} />

        <CustomInput Title='ID Number' placeholder='Enter your ID number' value={id} onChange={text => setID(text)}/>
        <CustomInput Title='Username' placeholder='Enter your username' value={username} onChange={text => setUsername(text)}/>
        <CustomInput Title='Phone Number' placeholder='Enter your phone number' value={phoneNumber} onChange={text => setPhoneNumber(text)} />
        <CustomInput Title='New Password' placeholder='Enter your password' value={password} onChange={text => setPassword(text)}/>
        <CustomInput Title='Confirm Your Password' placeholder='Enter your password again' value={confirmPassword} onChange={text => setConfirmPassword(text)}/>
               
        <CustomButton  buttonTitle='Sign up' ToWhere={() => SingleTouchInput({ id, phoneNumber, username, password})} />
        
        <CustomInvisibleButton buttonTitle="Have an account already? Login" ToWhere={() => navigation.navigate('Login')}/>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 60,
  }
});