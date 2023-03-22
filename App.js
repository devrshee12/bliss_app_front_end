import { StyleSheet, Text, View } from 'react-native';
import { UserProvider } from './context/user_context';
import Dashboard from './screens/Dashboard';
import { DashboardProvider } from './context/dashboard_context';
import Login from './screens/Login';

export default function App() {
  return (
    <UserProvider>
      <DashboardProvider>
        <View style={styles.container}>
          {/* <Login/> */}
          <Dashboard/>
        </View>
        
      </DashboardProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
