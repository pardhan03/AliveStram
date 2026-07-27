import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  StatusBar,
  Text,
  Dimensions,
  Easing,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { IMAGES } from '../../assets/images';

type Props = NativeStackScreenProps<RootStackParamList, 'SplashScreen'>;

const { width } = Dimensions.get('window');

export const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const logoScale = useRef(new Animated.Value(0.6)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Run enter animations in sequence & parallel
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
      ]),
    ]).start();

    // Automatically navigate to GoogleSignInScreen after 2.5s
    const timer = setTimeout(() => {
      navigation.replace('GoogleSignInScreen');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, logoOpacity, logoScale, textOpacity, textTranslateY]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FFFFFF" />

      {/* Main Animated Content */}
      <View style={styles.centerContainer}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          <Image
            source={IMAGES.appLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Subtitle & Tagline */}
        <Animated.View
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textTranslateY }],
            alignItems: 'center',
            marginTop: 24,
          }}
        >
          <Text style={styles.appName}>Alive</Text>
          <Text style={styles.tagline}>Live Stream & Connect World</Text>
        </Animated.View>
      </View>

      {/* Bottom Footer */}
      <Animated.View style={[styles.footer, { opacity: textOpacity }]}>
        <View style={styles.pulseDot} />
        <Text style={styles.footerText}>Powered by Alive Stream</Text>
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    width: width * 0.45,
    height: width * 0.45,
    shadowColor: '#68C700',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  logoImage: {
    width: '100%',
    height: '100%',
    borderRadius: 36,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    color: '#68C700',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888888',
    marginTop: 6,
    letterSpacing: 0.2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#68C700',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#AAAAAA',
  },
});
