import { StyleSheet } from "react-native";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flex:2,
    marginTop:"15%",
    justifyContent:"center",
    width: "86%",
    borderWidth:0
  },
  containerBody: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    borderWidth: 0,
    justifyContent: "flex-end",
    borderWidth:0
  },
  containerViewButton: {
    width:"60%"
  },
  containerButton: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  imgCenaBttom: {
    //width: "100%",
    height: 300, 
    overflow:"scroll",
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
});