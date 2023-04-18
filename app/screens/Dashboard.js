import { StatusBar } from "react-native";
809;
import React, { useEffect, useRef } from "react";
import withAuthentication from "../utils/withAuthentication";
import { TopHeader } from "../components";
import TopTabs from "../layout/TopTab";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={"#0E1825"} />

      <TopHeader />
      <TopTabs />
    </SafeAreaView>
  );
};

export default withAuthentication(Dashboard);
