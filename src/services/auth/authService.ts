import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import Config from 'react-native-config';

export const GOOGLE_WEB_CLIENT_ID =
  Config.GOOGLE_WEB_CLIENT_ID ||
  '257018401641-lok39d25evhbk6jtle5lnchtsq4p82eq.apps.googleusercontent.com';

/**
 * Configures the Google Sign-In SDK with the Web Client ID.
 */
export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    scopes: ['profile', 'email'],
  });
};

/**
 * Triggers Google Sign-In flow and authenticates with Firebase.
 */
export const signInWithGoogle = async () => {
  try {
    // Ensure Play Services are available (on Android)
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Perform Google Sign-In
    const response = await GoogleSignin.signIn();

    // Support both new ({ data: { idToken } }) and older ({ idToken }) response structures
    const idToken = response.data?.idToken || (response as any).idToken;

    if (!idToken) {
      throw new Error('Google Sign-In failed: Could not retrieve ID Token.');
    }

    // Create Firebase Auth credential with the Google ID Token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken, idToken);

    // Sign in to Firebase with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);

    return userCredential.user;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('SIGN_IN_CANCELLED');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign in is already in progress.');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Google Play Services is not available or outdated.');
    } else {
      throw error;
    }
  }
};

/**
 * Signs in anonymously with Firebase Auth for Guest access.
 */
export const signInAsGuest = async () => {
  try {
    const userCredential = await auth().signInAnonymously();
    return userCredential.user;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Signs out from Firebase and Google Sign-In.
 */
export const signOutUser = async () => {
  try {
    await GoogleSignin.signOut().catch(() => { });
    await auth().signOut();
  } catch (error: any) {
    console.error('Error signing out:', error);
  }
};

/**
 * Gets the current authenticated Firebase user.
 */
export const getCurrentUser = () => {
  return auth().currentUser;
};
