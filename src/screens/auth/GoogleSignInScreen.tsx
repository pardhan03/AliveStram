import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../navigation/types';
import { IMAGES } from '../../assets/images';
import {
  configureGoogleSignIn,
  signInWithGoogle,
  signInAsGuest,
} from '../../services/auth/authService';
import { useAppDispatch } from '../../store/hooks';
import { saveProfile } from '../../store/features/user/authSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'GoogleSignInScreen'>;

const { width } = Dimensions.get('window');

// Google Icon SVG
const GoogleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <Path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <Path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <Path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </Svg>
);

export const GoogleSignInScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    if (isLoadingGoogle || isLoadingGuest) return;

    setIsLoadingGoogle(true);
    try {
      const user = await signInWithGoogle();

      if (user) {
        dispatch(saveProfile({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
        }));
        navigation.replace('MainTabs');
      }
    } catch (error: any) {
      console.log(error);
      if (error.message !== 'SIGN_IN_CANCELLED') {
        Alert.alert(
          'Sign-In Error',
          error.message || 'An error occurred during Google Sign-In.',
        );
      }
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  const handleGuestSignIn = async () => {
    if (isLoadingGoogle || isLoadingGuest) return;

    setIsLoadingGuest(true);
    try {
      const user = await signInAsGuest();
      dispatch(saveProfile({
        uid: user.uid,
        displayName: user.displayName || 'Guest User',
        email: user.email,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
      }));
      navigation.replace('MainTabs');
    } catch (error: any) {
      // Even if anonymous auth fails on firebase backend, allow entering as guest
      console.warn('Guest sign-in fallback:', error);
      dispatch(saveProfile({
        uid: 'guest',
        displayName: 'Guest User',
        email: null,
        photoURL: null,
        isAnonymous: true,
      }));
      navigation.replace('MainTabs');
    } finally {
      setIsLoadingGuest(false);
    }
  };

  const isBusy = isLoadingGoogle || isLoadingGuest;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Top Header Logo */}
        <View style={styles.topSection}>
          <Image
            source={IMAGES.appLogo}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Alive</Text>
          <Text style={styles.subtitle}>
            Connect with millions of streamers and live video creators around the world.
          </Text>
        </View>

        {/* Action Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity
            style={[styles.googleButton, isBusy && styles.disabledButton]}
            onPress={handleGoogleSignIn}
            disabled={isBusy}
            activeOpacity={0.85}
          >
            {isLoadingGoogle ? (
              <ActivityIndicator color="#4285F4" size="small" />
            ) : (
              <>
                <GoogleIcon />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.guestButton, isBusy && styles.disabledButton]}
            onPress={handleGuestSignIn}
            disabled={isBusy}
            activeOpacity={0.7}
          >
            {isLoadingGuest ? (
              <ActivityIndicator color="#68C700" size="small" />
            ) : (
              <Text style={styles.guestButtonText}>Explore as Guest</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By signing in, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text> and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignInScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    paddingVertical: 36,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  googleButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E8ECE4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    gap: 12,
  },
  disabledButton: {
    opacity: 0.6,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
  guestButton: {
    paddingVertical: 10,
  },
  guestButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#68C700',
  },
  termsText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 18,
  },
  linkText: {
    color: '#68C700',
    fontWeight: '600',
  },
});