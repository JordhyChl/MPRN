import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, useEffect } from 'react-native';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import Login from './LoginScreen';
import NewContact from './NewContact';
import UpdateCatatan from './UpdateUser';
import ViewCatatan from './ViewUser';
import ViewAllCatatan from './ViewAllUser';
import DeleteCatatan from './DeleteUser';
import Mybutton from './components/Mybutton';
// import NewContact from './Pages/NewContact';



const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

// messaging().onMessage(async remoteMessage => {
//   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
// });

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#c24908',
        tabBarIcon: ({ color }) => (
          <Icon name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Notifications',
        tabBarColor: '#c24908',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-notifications" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarColor: '#694fad',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-person" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Explore"
      component={ExploreScreen}
      options={{
        tabBarLabel: 'Explore',
        tabBarColor: '#d02860',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-aperture" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => (
  <HomeStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#c24908',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <HomeStack.Screen name="Home" component={HomeScreen} options={{
      headerStyle: {
        backgroundColor: '#c24908', //Set Header color
      },
      // headerLeft: () => {
      //   return null;
      // },
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#c24908" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
    <Stack.Screen
      name="NewContact"
      component={NewContact}
      options={{
        title: 'Catatan Baru', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
    <Stack.Screen
      name="Update"
      component={UpdateCatatan}
      options={{
        title: 'Update Catatan', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
    <Stack.Screen
      name="View"
      component={ViewCatatan}
      options={{
        title: 'View Catatan', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
    <Stack.Screen
      name="ViewAll"
      component={ViewAllCatatan}
      options={{
        title: 'View All Catatan', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
    <Stack.Screen
      name="Delete"
      component={DeleteCatatan}
      options={{
        title: 'Hapus Catatan', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Login', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
    <Stack.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        title: 'Notification Screen', //Set Header Title
        headerStyle: {
          backgroundColor: '#c24908', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}
    />
  </HomeStack.Navigator>
);

const DetailsStackScreen = ({ navigation }) => (
  <DetailsStack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#c24908', //Set Header color
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <DetailsStack.Screen name="Notification" component={NotificationScreen} options={{
      // headerLeft: () => (
      //   <Mybutton name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Mybutton>
      // )
      headerLeft: () => (
        <Icon.Button name="ios-menu" size={25} backgroundColor="#c24908" onPress={() => navigation.openDrawer()}></Icon.Button>
      )
    }} />
  </DetailsStack.Navigator>
);
