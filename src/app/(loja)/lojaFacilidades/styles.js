import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";

export const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 8,
    marginBottom:12,
    alignSelf:'flex-start'
  },
  containerPrincipal: {
    flex: 0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    marginBottom: 10,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerPicker: {
    alignSelf:'stretch',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: styleApp.color.tema10pSecundaria,
    borderRadius: 4
  },
  containerFacilidade: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex:1,
    gap: 4,
    height: 40,
  },
});