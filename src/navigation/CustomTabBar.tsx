import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon, PartyIcon, GoLiveSignalIcon, ChatsIcon, ProfileIcon } from '../components/Icons';

const { width } = Dimensions.get('window');

export const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View style={styles.outerContainer}>
      {/* Curved Background Container */}
      <View style={[styles.tabBarContainer, { paddingBottom: bottomPadding }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Center Go Live Tab
          if (route.name === 'GoLive') {
            return (
              <View key={route.key} style={styles.centerTabWrapper}>
                {/* Curved Notch Background ring */}
                <View style={styles.notchCutout} />

                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel || 'Go Live'}
                  testID={options.tabBarButtonTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  activeOpacity={0.88}
                  style={styles.goLiveButtonContainer}
                >
                  <View style={styles.goLiveCircle}>
                    <GoLiveSignalIcon size={26} color="#16B236" />
                  </View>
                  <Text style={styles.goLiveText}>
                    Go Live
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }

          // Standard Tabs (Home, Party, Chats, Profile)
          let icon = null;
          let label = route.name;

          if (route.name === 'Home') {
            icon = <HomeIcon size={24} color="#FFFFFF" focused={isFocused} />;
            label = 'Home';
          } else if (route.name === 'Party') {
            icon = <PartyIcon size={24} color="#FFFFFF" focused={isFocused} />;
            label = 'Party';
          } else if (route.name === 'Chats') {
            icon = <ChatsIcon size={24} color="#FFFFFF" focused={isFocused} />;
            label = 'Chats';
          } else if (route.name === 'Profile') {
            icon = <ProfileIcon size={24} color="#FFFFFF" focused={isFocused} />;
            label = 'Profile';
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              style={styles.tabItem}
            >
              <View style={[styles.iconContainer, isFocused && styles.focusedIconContainer]}>
                {icon}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelFocused : styles.tabLabelUnfocused,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: width,
    height: 72,
    backgroundColor: '#76D200', // Vibrant green color matching design
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  focusedIconContainer: {
    transform: [{ scale: 1.05 }],
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabLabelFocused: {
    color: '#FFFFFF',
    fontWeight: '700',
    opacity: 1,
  },
  tabLabelUnfocused: {
    color: '#FFFFFF',
    opacity: 0.82,
  },

  /* Center Elevated Go Live Button Styles */
  centerTabWrapper: {
    width: 76,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: -28,
  },
  notchCutout: {
    position: 'absolute',
    top: -2,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#76D200',
    zIndex: 1,
  },
  goLiveButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  goLiveCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E6F8CE',
  },
  goLiveText: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default CustomTabBar;
