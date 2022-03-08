// Navigation/Navigation.js
import * as React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Search from '../Components/Search'
import MovieDetail from '../Components/MovieDetail';
import Favorites from '../Components/Favorites';

const SearchStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function NavigationSearch() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={Search}/>
            <SearchStack.Screen name="Favorites" component={Favorites}/>
            <SearchStack.Screen name="MovieDetail" component={MovieDetail}/>
        </SearchStack.Navigator>
    );
}

function NavigationFavorites() {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Favorites" component={Favorites}/>
            <SearchStack.Screen name="MovieDetail" component={MovieDetail}/>
        </SearchStack.Navigator>
    );
}

function NavigationTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    tabBarIcon: () => {
                        let iconName;
                        if (route.name === 'Movies') {
                            iconName = require('../Images/ic_search.png');
                        } else if (route.name == 'Favorites') {
                            iconName = require('../Images/ic_favorite.png');
                        }
                        return <Image source={iconName} style={styles.icons}/>;
                    },
                })}
            >
                <Tab.Screen name="Movies" component={NavigationSearch} options={{tabBarShowLabel: false, tabBarActiveBackgroundColor: '#DDDDDD'}}/>
                <Tab.Screen name="Favorites" component={NavigationFavorites} options={{tabBarShowLabel: false, tabBarActiveBackgroundColor: '#DDDDDD'}}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    icons: {
        width: 30,
        height: 30
    }
})

export default NavigationTabs;
