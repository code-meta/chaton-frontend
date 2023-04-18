import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  ChatBoard,
  CreateAccount,
  Login,
  ProfilePhotoUpload,
  Dashboard,
} from "./app/screens";
import { loadAsync } from "expo-font";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useEffect, useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      await loadAsync({
        "Lobster-Regular": require("./assets/fonts/Lobster/Lobster-Regular.ttf"),
        "Jost-Medium": require("./assets/fonts/Jost/static/Jost-Medium.ttf"),
      });
      setLoaded(true);
    })();
  }, []);

  return (
    <SafeAreaProvider>
      {loaded && (
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Dashboard">
              <Stack.Group
                screenOptions={{
                  headerShown: false,
                  animation: "none",
                }}
              >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="CreateAccount" component={CreateAccount} />
                <Stack.Screen
                  name="ProfilePhotoUpload"
                  component={ProfilePhotoUpload}
                />
              </Stack.Group>

              <Stack.Group
                screenOptions={{
                  animation: "none",
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="ChatBoard" component={ChatBoard} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      )}
    </SafeAreaProvider>
  );
}
