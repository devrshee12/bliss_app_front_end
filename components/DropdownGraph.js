import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from "axios";
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
  VictoryTooltip,
  VictoryVoronoiContainer,
  VictoryZoomContainer,
  VictoryBrushContainer,
} from "victory-native";
import { useDashboardContext } from "../context/dashboard_context";
import { API } from "../constants/api";

export default function DropdownGraph() {
  const [zoomDomain, setZoomDomain] = useState(null);
  const { graphData, setGraphData, currCompany, currTypeOfGraph } =
    useDashboardContext();

  const getGraphData = async () => {
    console.log("here in get graph data");
    console.log(currCompany);
    console.log(currTypeOfGraph);
    const url =
      API +
      "/" +
      (currTypeOfGraph === "intraDay" ? "get_intraday_iv" : "get_daily_iv") +
      "/" +
      currCompany;
    try {
        console.log("here in url");
        console.log(url);
      const res = await axios.get(url);
      const tempData = res.data.iv_data.map((item, i) => {
        // console.log(item.date);
        const dateArray = item.date.split("-");
        console.log(dateArray[0] + " : " + dateArray[1] + " : " + dateArray[2]);
        return {
          x: new Date(
            parseInt(dateArray[0]),
            parseInt(dateArray[2]),
            parseInt(dateArray[1])
          ),
          y: item.ATM_vol,
        };
      });

      setGraphData(tempData);
    } catch (err) {
        console.log(err);
    }
  };

  useEffect(() => {
    getGraphData();
  }, [currCompany, currTypeOfGraph]);

  const handleZoom = (domain) => {
    setZoomDomain(domain);
  };
//   const handleBrush = (domain) => {
//     setSelectedDomain(domain);
//   };

  return (
    <View style={styles.container}>
      {graphData?.length !== 0 && (
        <View>
          <VictoryChart
            width={375}
            height={250}
            scale={{ x: "time", y: "linear" }}
            containerComponent={
              <VictoryZoomContainer
                responsive={false}
                zoomDimension="x"
                zoomDomain={zoomDomain}
                onZoomDomainChange={handleZoom}
              />
            }
          >
            <VictoryLine
              style={{
                data: { stroke: "rgb(132,194,37)" },
              }}
              data={graphData}
            />
            <VictoryArea
              data={graphData}
              style={{
                data: {
                  fill: "rgb(132,194,37)",
                  fillOpacity: 0.4,
                  stroke: "rgb(132,194,37)",
                },
              }}
            />
            <VictoryAxis
              style={{
                axis: { stroke: "white" },
                tickLabels: { fill: "white" },
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: { stroke: "white" },
                tickLabels: { fill: "white" },
              }}
            />
          </VictoryChart>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#474545",
    //   alignItems: 'center',
    //   justifyContent: "center",
    //   borderColor:"black",
    //   borderWidth: "2",
    },
  });
