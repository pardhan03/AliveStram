import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

export type MainTabParamList = {
    Home: undefined;
    Party: undefined;
    GoLive: undefined;
    Chats: undefined;
    Profile: undefined;
};

export type RootStackParamList = {
    // Splash Screen
    SplashScreen: undefined;

    // Auth Stack Screens
    GoogleSignInScreen: undefined;

    // App Main Tabs Navigator
    MainTabs: undefined;

    // Additional Detail Screens
    HomeScreen: { userId?: string };
    UserProfileScreen: { userId?: string };
};

export type MainTabNavigationProp<T extends keyof MainTabParamList> = CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, T>,
    NativeStackNavigationProp<RootStackParamList>
>;

export type MainTabRouteProp<T extends keyof MainTabParamList> = RouteProp<MainTabParamList, T>;