import React from 'react';
import { Button, Icon } from '@rneui/themed';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import Profile from '@/pages/Profile';
import Logo from '@/components/Logo';
import Home from '@/pages/Home';
import Transfer from '@/pages/Transfer';
import Transactions from '@/pages/Transactions';
import Notifications from '@/pages/Notifications';
import Accounts from '@/pages/Accounts';
import Beneficiaries from '@/pages/Beneficiaries';
import TransferDetails from '@/pages/TransferDetails';
import TransactionDetails from '@/pages/TransactionDetails';
import PaymentSuccessful from '@/pages/PaymentSuccesful';
import ViewAccount from '@/pages/ViewAccount';
import ViewBeneficiary from '@/pages/ViewBeneficiary';
import AccountsToPay from '@/pages/AccountsToPay'
import BeneficiariesToPay from '@/pages/BeneficiariesToPay';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const TransferStack = createNativeStackNavigator();
const TransactionsStack = createNativeStackNavigator();
const NotificationsStack = createNativeStackNavigator();

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
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          headerShown: false,
          }}
      />
      <Stack.Screen 
        name="Signup" 
        component={SignUp} 
        options={{
          headerShown: false,
        }}
        />
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
        name="TransferDetails"
        component={TransferDetails} 
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
    </Stack.Navigator>
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
  
});

export default App;