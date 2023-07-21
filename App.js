import React from "react";
import AppNavigation from "./src/navigation/AppNavigation";
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);
import registerNNPushToken from 'native-notify';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    registerNNPushToken(9483, 'bqoXH6eT0xaUSZiecB9LHV');
    return (
        <AppNavigation/>
    )
}
