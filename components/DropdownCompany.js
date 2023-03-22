import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDashboardContext } from "../context/dashboard_context";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import DropDownPicker from "react-native-dropdown-picker";
import RNPickerSelect from "react-native-picker-select";
import axios from "axios";
import { API_GET_ALL_COMPANIES } from "../constants/api";

export default function DropdownCompany() {
  const {
    ddValue1,
    ddValue2,
    ddFocus1,
    ddFocus2,
    companies,
    currCompany,
    currTypeOfGraph,
    typeOfGraph,
    setDdValue1,
    setDdValue2,
    setDdFocus1,
    setDdFocus2,
    setCompanies,
    setTypeOfGraph,
    setCurrCompany,
    setCurrTypeOfGraph,
  } = useDashboardContext();


  const renderLabel1 = () => {
    if (ddValue1 || ddFocus1) {
      return (
        <Text style={[styles.label, ddFocus1 && { color: "rgb(132,194,37)" }]}>
          Company
        </Text>
      );
    }
    return null;
  };

  const renderLabel2 = () => {
    if (ddValue2 || ddFocus2) {
      return (
        <Text style={[styles.label, ddFocus2 && { color: "rgb(132,194,37)" }]}>
          Type
        </Text>
      );
    }
    return null;
  };


  const getAllCompanies = async() => {
    try{
      const res = await axios.get(API_GET_ALL_COMPANIES);
      const newData = res.data.data.map((item, index) => {
        return {Label: item.c_name, value: index}
      })

      setCompanies(newData);
      setTypeOfGraph([
        { name: "intraDay", value: "1" },
        { name: "Daily", value: "2" },
      ]);
      
      
    }
    catch(err){
      console.log(err);
    }

  }


  useEffect(() => {
    getAllCompanies();

    

    
  }, []);

  // useEffect(() => {
  //   // console.log();
  // }, [companies])
  return (
    <>
    {
      companies?.length !== 0 && 
      <View style={styles.container}>
        
        
        {renderLabel1()}
        <Dropdown
          iconColor="white"
          style={[styles.dropdown, { borderColor: "rgb(132,194,37)" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={companies}
          // containerStyle={{ backgroundColor: "#706d6d" }}
          search
          maxHeight={300}
          labelField="Label"
          valueField="value"
          placeholder={!ddFocus1 ? "Select item" : "..."}
          searchPlaceholder="Search..."
          value={ddValue1}
          onFocus={() => setDdFocus1(true)}
          onBlur={() => setDdFocus1(false)}
          onChange={(item) => {
            setDdValue1(item.value);
            console.log(ddValue1);
            console.log(companies[parseInt(item.value)]?.Label?.toLowerCase());
            setCurrCompany(companies[parseInt(item.value)]?.Label?.toLowerCase());
            setDdFocus1(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={ddFocus1 ? "rgb(132,194,37)" : "white"}
              name="Safety"
              size={20}
            />
          )}
        />

        {/* {renderLabel2()} */}
        <Dropdown
          iconColor="white"
          style={[styles.dropdown, { borderColor: "rgb(132,194,37)" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={typeOfGraph}
          // containerStyle={{ backgroundColor: "#706d6d" }}
          search
          maxHeight={300}
          labelField="name"
          valueField="value"
          placeholder={!ddFocus2 ? "Select Type" : "..."}
          searchPlaceholder="Search..."
          value={ddValue2}
          onFocus={() => setDdFocus2(true)}
          onBlur={() => setDdFocus2(false)}
          onChange={(item) => {
            setDdValue2(item.value);
            console.log("here in type of graph changed");
            console.log(item.value);
            // console.log(typeOfGraph[(item.value) - 1].name);
            // console.log(typeOfGraph[typeOfGraph[toString(item.value) - 1]?.name]);
            setCurrTypeOfGraph(typeOfGraph[(item.value) - 1]?.name)
            setDdFocus2(false);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color={ddFocus2 ? "rgb(132,194,37)" : "white"}
              name="Safety"
              size={20}
            />
          )}
        /> 
      </View>
    }
    
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    flexDirection: "row",
    backgroundColor: "#3a3332",
    padding: 16,
  },
  dropdown: {
    flex: 1,
    borderColor: "white",
    height: 50,
    // borderColor: "#474545",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",

    color: "white",
    left: 22,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: "white",
    fontSize: 16,
  },
  selectedTextStyle: {
    color: "white",
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
