import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "./screens/Home";
import { Records } from "./screens/Records";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function App() {
  return (

    <NavigationContainer>
      <Tab.Navigator
          initialRouteName="Home"
          component={Home}
          screenOptions={{
            tabBarActiveTintColor: '#45626e',
            tabBarStyle: { position: 'absolute', backgroundColor: 'white'},
          }}
        >
          <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: 'Inicio',
                tabBarIcon: ({ white, size }) => (
                  <MaterialCommunityIcons name="water-alert" color={white} size={size} />
                ),
              }}
            />

          <Tab.Screen
              name="Records"
              component={Records}
              options={{
                tabBarLabel: 'Registros',
                tabBarIcon: ({ white, size }) => (
                  <MaterialCommunityIcons name="water" color={white} size={size} />
                ),
              }}
            />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
export default App;
