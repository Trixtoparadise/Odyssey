import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInvisibleButton from '../components/CustomInvisibleButton';
import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';

export default function Login({navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  

  return (
    <>
      <View style={styles.container}>
        
        <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={120} height={120}/>

        <CustomInput Title='Username' placeholder='Enter your username' value={username} onChange={text => setUsername(text)}/>
        <CustomInput Title='Password' placeholder='Enter your password' value={password} onChange={text => setPassword(text)}/>
        
        <CustomButton  buttonTitle='Log in' ToWhere={handleLogin}/>
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
