import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/configureStore';
import Route from './src/navigation/Route';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Route />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
