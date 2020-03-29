import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer}  from '@react-navigation/native'
import Incidents from './pages/incidents'
import Datails from './pages/details'


const AppStack = createStackNavigator();

function Routes(){
    return(
         <NavigationContainer>
             <AppStack.Navigator screenOptions={{headerShown:false}}>
                 <AppStack.Screen name="Incidents" component={Incidents} />
                 <AppStack.Screen name="Details" component={Datails} />
             </AppStack.Navigator>
         </NavigationContainer>
    );
}

export default Routes;