// Navigation/Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../Components/Search'
import MovieDetail from '../Components/MovieDetail';

const Stack = createNativeStackNavigator()

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Search" component={Search} options={{title: 'Search'}}/>
                <Stack.Screen name="MovieDetail" component={MovieDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navigation;
