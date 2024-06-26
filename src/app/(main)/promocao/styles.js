import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";

export const styles = StyleSheet.create({
  containerHeader: {
    flex: 0,
    borderWidth: styleApp.size.containerBordaOnOff,
    marginBottom: 30
  },
  containerPromoCabecalho: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: styleApp.size.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerPromoPeriodo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: styleApp.size.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerPromoLista: {
    marginBottom: 86
  },

  //Textos
  textoTituloPromo: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: styleColor.azulEscuro,
    borderWidth: 0,
  },
  textoPromo: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 0,
    color: "#1f1f1fff",
    borderWidth: 0
  },

  //Cards
  buttonPromoVigente: {
    marginTop: 8,
    alignItems: 'flex-start',
    backgroundColor: "white",
    borderWidth: 6,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomWidth: 6,
    padding: 14,
    borderColor: "white",
    width: "100%",
    minHeight: 150,
    maxHeight: 200,
    alignSelf: "center",
    elevation: 0
  },
  buttonPromoEncerrada: {
    marginTop: 8,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 6,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomWidth: 6,
    padding: 14,
    borderColor: "white",
    width: "100%",
    minHeight: 150,
    maxHeight: 200,
    alignSelf: "center",
    elevation: 0
  },
  imageBkg: {
    flex: 1,
    width:"100%",
    position: 'absolute',
    bottom: 0,
    paddingVertical: 40,
    overflow: 'hidden' // prevent image overflow the container
  },


});