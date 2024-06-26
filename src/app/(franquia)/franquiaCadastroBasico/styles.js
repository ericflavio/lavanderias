import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";
import { styleSize } from "../../../styles/styleSize";

export const styles = StyleSheet.create({
  containerHeader: {
    marginTop: 30,
    flexDirection: "row",
    gap: 8,
    paddingLeft: 8,
    marginLeft: styleApp.size.containerDistanciamentoHorizontalRegular,
    marginRight: styleApp.size.containerDistanciamentoHorizontalRegular,
  },
  containerDadosLoja: {
    flex: 0,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: styleApp.size.containerBordaOnOff,
    backgroundColor: styleColor.tema60pMedio,
  },
  containerPrincipal: {
    flex: 0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    marginLeft: styleApp.size.containerDistanciamentoHorizontalRegular,
    marginRight: styleApp.size.containerDistanciamentoHorizontalRegular,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  textoStatus: {
    fontFamily: 'Roboto-Bold',
    size: styleApp.size.textoSize3,
    color: styleColor.sucesso
  },
  imgNovaLoja: {
    //height: 252, 
    //width: 450,
    overflow: "hidden",
    resizeMode: "contain",
    //position: "relative"
  },
  containerOthers: {
    justifyContent: "center",
    alignItems: "stretch",
    gap: 8,
    borderWidth: styleApp.size.containerBordaOnOff,
    margin: 12,
    //width: "100%"
  },
  containerTogle: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%',
    flexShrink: 1
  },
});