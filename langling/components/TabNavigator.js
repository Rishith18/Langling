import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Cards from '../Screens/Cards';
import Create from '../Screens/Create';
import Speak from '../Screens/Speak';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';

var Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={styles.tabStyle}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            var iconName;
            if (route.name === 'Create') {
              iconName = focused ? 'create' : 'create-outline';
            } else if (route.name === 'Cards') {
              iconName = focused ? 'reader' : 'reader-outline';
            } else if (route.name === 'Speak') {
              iconName = focused ? 'mic-circle' : 'mic-circle-outline';
            }
            return <Icon name={iconName} size={RFValue(40)} color="white" />;
          },
        })}>
        <Tab.Screen name="Cards" component={Cards} />
        <Tab.Screen name="Create" component={Create} />
        <Tab.Screen name="Speak" component={Speak} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  tabStyle: {
    backgroundColor: '#ff6a00',
    height: '12%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    position: 'absolute',
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderColor: '#ff9100',
  },
});
