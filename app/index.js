import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { Button, Icon } from '@rneui/themed';
import { ActivityIndicator, TouchableOpacity, StyleSheet, Alert, View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomInvisibleButton from '../components/CustomInvisibleButton';
import CustomInput from '../components/CustomInput';
import { Divider } from '@rneui/themed';
import ProfileHeading from '../components/ProfileHeading';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Logo from '@/components/Logo';
import Home from '@/pages/Home';
import Transfer from '@/pages/Transfer';
import Transactions from '@/pages/Transactions';
import Notifications from '@/pages/Notifications';
import Accounts from '@/pages/Accounts';
import Beneficiaries from '@/pages/Beneficiaries';
import AccountTransferDetails from '@/pages/AccountTransferDetails';
import BeneficiaryTransferDetails from '@/pages/BeneficiaryTransferDetails';
import TransactionDetails from '@/pages/TransactionDetails';
import PaymentSuccessful from '@/pages/PaymentSuccesful';
import ViewAccount from '@/pages/ViewAccount';
import ViewBeneficiary from '@/pages/ViewBeneficiary';
import AccountsToPay from '@/pages/AccountsToPay'
import BeneficiariesToPay from '@/pages/BeneficiariesToPay';
import OpenAccount from '@/pages/OpenAccount';
import CreateBeneficiary from '@/pages/CreateBeneficiary';
import { create } from 'react-test-renderer';

const AuthContext = React.createContext();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const TransferStack = createNativeStackNavigator();
const TransactionsStack = createNativeStackNavigator();
const NotificationsStack = createNativeStackNavigator();

class User {
  constructor(username, phoneNumber, id) {
    this.username = username;
    this.phoneNumber = phoneNumber;
    this.id = id;
  }
}

const NotificationsStackScreen = () => {
  return (
    <NotificationsStack.Navigator
            screenOptions={{
              header: ({ options, route, navigation}) => (
                <Header
                  {... options}
                  headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                  headerTitleAlign='center'
                  headerRight={() => (
                    <Button
                      icon={{
                          name: 'user',
                          type: 'feather',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.navigate('Profile')}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'right',
                      }}                
                    />
                  )}
                  headerLeft={() => (
                    <Button
                      icon={{
                          name: 'arrowleft',
                          type: 'antdesign',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.goBack()}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'left',
                      }}                
                    />
                  )}
                  headerStatusBarHeight={10}
                />
              ),
            }}
    >
        <NotificationsStack.Screen name="notifications" component={Notifications} />
    </NotificationsStack.Navigator>
  );
}

function SplashScreen() {
  return (
    <View style={styles.splashContainer}>
      <ActivityIndicator size="large" color="rgba(0, 44, 106, 255)" />
    </View>
  );
}

function Login({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = React.useContext(AuthContext);

  return (
    <>
      <View style={styles.loginContainer}>
        
        <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={120} height={120}/>

        <CustomInput Title='Username' placeholder='Enter your username' value={username} onChange={text => setUsername(text)}/>
        <CustomInput Title='Password' secureTextEntry={true} placeholder='Enter your password' value={password} onChange={text => setPassword(text)}/>
        
        <CustomButton  buttonTitle='Log in' ToWhere={() => signIn({ username, password })}/>
        <CustomInvisibleButton buttonTitle="Don't have an account yet? Sign up" ToWhere={() => navigation.navigate('Signup')} />
        
      </View>
    </>
  );
}

function SignUp({navigation}) {
  const [id, setID] = React.useState(0);
  const [phoneNumber, setPhoneNumber] = React.useState(0);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const { signUp } = React.useContext(AuthContext);
  
  return (
    <>
      <View style={styles.signupContainer}>
        
        <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={120} height={120} />

        <CustomInput Title='ID Number' placeholder='Enter your ID number' value={id} onChange={text => setID(text)}/>
        <CustomInput Title='Username' placeholder='Enter your username' value={username} onChange={text => setUsername(text)}/>
        <CustomInput Title='Phone Number' placeholder='Enter your phone number' value={phoneNumber} onChange={text => setPhoneNumber(text)} />
        <CustomInput Title='New Password' secureTextEntry={true} placeholder='Enter your password' value={password} onChange={text => setPassword(text)}/>
        <CustomInput Title='Confirm Your Password' secureTextEntry={true} placeholder='Enter your password again' value={confirmPassword} onChange={text => setConfirmPassword(text)}/>
               
        <CustomButton  buttonTitle='Sign up' ToWhere={() => signUp({ id, phoneNumber, username, password, confirmPassword})} />
        
        <CustomInvisibleButton buttonTitle="Have an account already? Login" ToWhere={() => navigation.navigate('Login')}/>
        
      </View>
    </>
  );
}

const Profile = ({navigation}) => {
  const [user, setUser] = React.useState(new User("", 0, 0));
  const { signOut } = React.useContext(AuthContext);

  const createTwoButtonAlert = () =>
    Alert.alert('Delete Profile', 'Are you sure you want to delete your profile?', [
      {
        text: 'Cancel',
        onPress: () => {return;},
        style: 'cancel',
      },
      {text: 'OK', onPress: CloseAccount},
    ]);

  const CloseAccount = async () => {
      let headersList = {
          "Content-Type": "application/json"
        }
        
      let bodyContent = JSON.stringify({
          "id" : parseInt(user.id) 
      });
      
      
      try {
      let response = await fetch("http://10.10.17.11:5000/api/DeleteProfile", { 
          method: "DELETE",
          body: bodyContent,
          headers: headersList
          });
          let data = await response.text();
          console.log(data);
          signOut
      } catch (e) {
      console.log(e);
      }                   
  } 
  
  React.useEffect(() => {
    async function handleUserData () {
      let userToken = null;
      let retToken;

      try {
        retToken = await SecureStore.getItemAsync('userToken');
        if (retToken != null){
          userToken = "Bearer " + retToken.replace(/"/g, ''); 
        }
      } catch (e) {
        console.log(e);
      }
      let headersList = {
        "Authorization": userToken
      }
      
      try {
        const response = await fetch("http://10.10.17.11:5000/api/user", { 
          method: "GET",
          headers: headersList
        });
        
        const data = await response.json();
        setUser(data);
      } catch {
        console.log(e)
      }
    }

    handleUserData();
  }, []);
  if ( user.id == 0 ) {
     return (
      <View style={{backgroundColor: 'white', width: '100%', height: '100%' }}>
        <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
        <View style={styles.splashContainer}>
            <Text style={{marginHorizontal: 30, fontSize: 22, marginBottom: 20, marginTop: -80, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                Please Wait
            </Text>
          <ActivityIndicator size="large" color="rgba(0, 44, 106, 255)" />
        </View>
      </View>
     )
  } else {
    return (        
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%'}}>
            <Divider width={1} style={{ marginTop: 12, opacity: 10}} />
            <ProfileHeading />

            <Text style={{marginHorizontal: 30, fontSize: 22, marginVertical: 20, alignSelf: 'center', color: 'rgba(0, 44, 106, 255)'}}>
                {"Username :           " + user.username}{"\n"}
                {"Phone number:    " +  user.phoneNumber}{"\n"}
                {"ID Number :          " + user.id}
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center', paddingTop: 20, }}>
                <CustomButton buttonTitle='Delete Profile' ToWhere={createTwoButtonAlert} />
                <CustomButton  buttonTitle='Log out' ToWhere={signOut}/>
            </View>
            
        </View> 
    );
  }
}

const HomeTabs = ({ navigation }) => {
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'rgba(0, 44, 106, 255)',
        tabBarActiveBackgroundColor: '#E6E4ED',
        tabBarInactiveTintColor: 'rgba(0, 44, 106, 255)',
        tabBarStyle: {...styles.tabContainer},
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }} 
    >
      <Tab.Screen 
        name="Home"
        options={{
          headerShown :  false,
          tabBarIcon: ({ color }) => (
            <Icon
              name='home'
              type='feather'
              color={color}
              alignSelf= 'center'
              size={35}
            />
          )
        }}
      >
        {() => (
          <HomeStack.Navigator
            screenOptions={{
              header: ({ options, route, navigation}) => (
                <Header
                  {... options}
                  headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                  headerTitleAlign='center'
                  headerRight={() => (
                    <Button
                      icon={{
                          name: 'user',
                          type: 'feather',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.navigate('Profile')}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'right',
                      }}                
                    />
                  )}
                  headerLeft={() => (
                    <Button
                      icon={{
                          name: 'arrowleft',
                          type: 'antdesign',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'left',
                      }}                
                    />
                  )}
                  headerStatusBarHeight={10}
                />
              ),
            }}     
          >
            <HomeStack.Screen name="home" component={Home} />
          </HomeStack.Navigator>    
        )}
      </Tab.Screen>
      
      <Tab.Screen 
        name="Transfer" 
        options={{
          headerShown :  false,
          tabBarIcon: ({ color }) => (
            <Icon
              name='send'
              type='feather'
              color={color}
              alignSelf= 'center'
              size={35}
            />
          )
        }}
      >
        {() => (
          <TransferStack.Navigator
            screenOptions={{
              header: ({ options, route, navigation}) => (
                <Header
                  {... options}
                  headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                  headerTitleAlign='center'
                  headerRight={() => (
                    <Button
                      icon={{
                          name: 'user',
                          type: 'feather',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.navigate('Profile')}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'right',
                      }}                
                    />
                  )}
                  headerLeft={() => (
                    <Button
                      icon={{
                          name: 'arrowleft',
                          type: 'antdesign',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.goBack()}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'left',
                      }}                
                    />
                  )}
                  headerStatusBarHeight={10}
                />
              ),
            }}
          >
            <TransferStack.Screen name="transfer" component={Transfer} />
          </TransferStack.Navigator>    
        )}
      </Tab.Screen>

      <Tab.Screen 
        name="Transactions" 
        options={{
          headerShown :  false,
          tabBarIcon: ({ color }) => (
            <Icon
              name='swap'
              type='antdesign'
              color={color}
              alignSelf= 'center'
              size={35}
            />
          )
        }}
      >
        {() => (
          <TransactionsStack.Navigator
            screenOptions={{
              header: ({ options, route, navigation}) => (
                <Header
                  {... options}
                  headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                  headerTitleAlign='center'
                  headerRight={() => (
                    <Button
                      icon={{
                          name: 'user',
                          type: 'feather',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.navigate('Profile')}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'right',
                      }}                
                    />
                  )}
                  headerLeft={() => (
                    <Button
                      icon={{
                          name: 'arrowleft',
                          type: 'antdesign',
                          size: 40,
                          color: 'rgba(0, 44, 106, 255)',
                      }}
                      onPress={() => navigation.goBack()}
                      type="clear"
                      TouchableComponent={TouchableOpacity}
                      containerStyle={{
                          width: 80,
                          alignSelf: 'left',
                      }}                
                    />
                  )}
                  headerStatusBarHeight={10}
                />
              ),
            }}
          >
            <TransactionsStack.Screen name="transactions" component={Transactions} />
          </TransactionsStack.Navigator>    
        )}
      </Tab.Screen>

      <Tab.Screen 
        name="Notifications" 
        component={NotificationsStackScreen}
        options={{
          headerShown :  false,
          tabBarIcon: ({ color }) => (
            <Icon
              name='bell'
              type='feather'
              color={color}
              alignSelf= 'center'
              size={35}
            />
          ),
        }}
      >

      </Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = null;
      let retToken;

      try {
        retToken = await SecureStore.getItemAsync('userToken');
        if (retToken != null){
          userToken = "Bearer " + retToken.replace(/"/g, ''); 
        }
      } catch (e) {
        console.log(e);
      }

      let headersList = {
        "Authorization": userToken
      }
      
      let response = await fetch("http://10.10.17.11:5000/api/user", { 
        method: "GET",
        headers: headersList
      });

      if (response.status != 200) {
        await SecureStore.deleteItemAsync('userToken');
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async ({ username, password }) => {
        let headersList = {
          "Content-Type": "application/json"
         }
         
        let bodyContent = JSON.stringify({
          "username": username,
          "password": password
        });
  
        let response = await fetch("http://10.10.17.11:5000/api/login", { 
          method: "POST",
          body: bodyContent,
          headers: headersList
        });
        
        let data = await response.text();
        
        if (response.status == 200) {
          await SecureStore.setItemAsync('userToken', data);
          dispatch({ type: 'SIGN_IN', token: data})
        } else {
          Alert.alert(data);
        }
      },
      signOut: async () => {
        Alert.alert('Log Out', 'Are you sure you want to log out?', [
          {
            text: 'Cancel',
            onPress: () => {return;},
            style: 'cancel',
          },
          {text: 'OK', onPress: async () => {
            dispatch({ type: 'SIGN_OUT' })
            await SecureStore.deleteItemAsync('userToken');  
          }},
        ]);
      },
      signUp: async ({ id, phoneNumber, username, password, confirmPassword }) => {
        if (password !== confirmPassword) {
          Alert.alert('Passwords do not match');
        } 
    
        let headersList = {
          "Content-Type": "application/json"
        }
         
        let bodyContent = JSON.stringify({
          "id": parseInt(id),
          "phoneNumber": parseInt(phoneNumber),
          "username": username,
          "password": password
        });
        
        let response;

        try {
          response = await fetch("http://10.10.17.11:5000/api/signup", { 
            method: "POST",
            body: bodyContent,
            headers: headersList
          })
        } catch (e) {
            Alert.alert(e);
        }
        
        let data = await response.text();
         
        if (response.status == 200) {
          await SecureStore.setItemAsync('userToken', data);
          dispatch({ type: 'SIGN_IN', token: data})
        } else {
          Alert.alert(data);
        }
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.isLoading ? (
          <Stack.Screen 
            name="Splash" 
            component={SplashScreen}
            options={{
              headerShown: false,
            }} 
          />
        ) : state.userToken == null ? (
          <>
            <Stack.Screen 
              name="Login" 
              component={Login} 
              options={{
                headerShown: false,
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
            <Stack.Screen 
              name="Signup" 
              component={SignUp} 
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
              <Stack.Screen 
                name="HomeTabs"
                component={HomeTabs} 
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="Profile"
                component={Profile} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="Accounts"
                component={Accounts} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="Beneficiaries"
                component={Beneficiaries} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="BeneficiaryTransferDetails"
                component={BeneficiaryTransferDetails} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="AccountTransferDetails"
                component={AccountTransferDetails} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="TransactionDetails"
                component={TransactionDetails} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="PaymentSuccessful"
                component={PaymentSuccessful} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="ViewAccount"
                component={ViewAccount} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="ViewBeneficiary"
                component={ViewBeneficiary} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="AccountsToPay"
                component={AccountsToPay} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="BeneficiariesToPay"
                component={BeneficiariesToPay} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="OpenAccount"
                component={OpenAccount} 
              />
              <Stack.Screen 
                options={{
                    header: ({ options, route, navigation}) => (
                      <Header
                        headerTitle={(props) => <Logo imageURL='https://i.ibb.co/895CsJY/Logo.png' width={70} height={70} {...props}/>}
                        headerTitleAlign='center'
                        headerRight={() => (
                          <Button
                            icon={{
                                name: 'user',
                                type: 'feather',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.navigate('Profile')}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'right',
                            }}                
                          />
                        )}
                        headerLeft={() => (
                          <Button
                            icon={{
                                name: 'arrowleft',
                                type: 'antdesign',
                                size: 40,
                                color: 'rgba(0, 44, 106, 255)',
                            }}
                            onPress={() => navigation.goBack()}
                            type="clear"
                            TouchableComponent={TouchableOpacity}
                            containerStyle={{
                                width: 80,
                                alignSelf: 'left',
                            }}                
                          />
                        )}
                        headerStatusBarHeight={10}
                      />
                    ),
                  }}
                name="CreateBeneficiary"
                component={CreateBeneficiary} 
              />
          </>
        )}
      </Stack.Navigator>
    </AuthContext.Provider>  
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    elevation: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 60,
  },
  signupContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 60,
  },splashContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    padding: 60,
  },
  
});

export default App;