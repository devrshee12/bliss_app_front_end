import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import { useDashboardContext } from '../context/dashboard_context'
import DropdownCompany from '../components/DropdownCompany'
import DropdownGraph from '../components/DropdownGraph'
import DropdownTable from '../components/DropdownTable'

const Dashboard = () => {
    
  return (
    <View style={styles.container}>
      <DropdownCompany/>
      <DropdownGraph/>
      <DropdownTable/>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
  //  backgroundColor: "#474545"
  },
});