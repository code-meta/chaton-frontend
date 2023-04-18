import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chats from "../screens/Chats";
import AddNew from "../screens/AddNew";
import colors from "../styles/colors";

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Group
        screenOptions={{
          tabBarLabelStyle: {
            textTransform: "capitalize",
            fontSize: 14,
            fontWeight: "500",
          },
          tabBarInactiveTintColor: colors.gray,
          tabBarActiveTintColor: colors.primaryBlue,
          tabBarIndicatorStyle: {
            backgroundColor: colors.primaryBlue,
          },
          swipeEnabled: true,
          tabBarPressColor: "transparent",

          tabBarStyle: {
            backgroundColor: colors.primaryDark,
          },
        }}
      >
        <Tab.Screen
          name="Chats"
          component={Chats}
          options={{ title: "chats" }}
        />
        <Tab.Screen
          name="AddNew"
          component={AddNew}
          options={{ title: "add new" }}
        />
      </Tab.Group>
    </Tab.Navigator>
  );
}
