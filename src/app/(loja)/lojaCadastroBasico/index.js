import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { myStyles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { consultaLojaEmEdicao } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { InputText } from '../../../componentes/inputText';

console.log("ViewLojaCadastroBasico <inicio>");

//Tela principal
export default function ViewLojaCadastroBasico() {
  const { user } = useContext(AuthContext);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState({ status: "", nome: "" });
  const [flagEditavel, setFlagEditavel] = useState(false);
  const [isLoading, setIsloading] = useState(true);
  const [apelidoLoja, setApelidoLoja] = useState("");
  const [cnpj, setCnpj] = useState("");

  //Caso criação de nova loja: não chega parâmetro
  //Caso edição (loja selecionada na lista): chega parâmetro
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  useEffect(() => {
    fetchLoja();
  }, [])

  async function fetchLoja() {
    let statusInicial = "";
    try {
      resLoja = await consultaLojaEmEdicao("n"); //Verifica se já possui alguma sendo criada
    } catch {
      resLoja = null; //Não encontrou uma Loja me estágio de criação para continuar.
    };
    if (resLoja !== null) {
      statusInicial = resLoja.status;
      setLojaDadosBasicos(resLoja);
      console.log("resLoja<2>: ", resLoja)

      if (resLoja.apelido && resLoja.apelido !== null && resLoja.apelido !== "") {
        setApelidoLoja(resLoja.apelido)
      } else {
        setApelidoLoja(resLoja.nome)
      }
      if (resLoja.cnpj && resLoja.cnpj !== null && resLoja.cnpj !== "") {
        setCnpj(resLoja.cnpj)
      }
    }
    setFlagEditavel(true);
    setIsloading(false);
  }

  function goTo() {
    router.navigate({
      pathname: "/lojaMenu",
      params: {
        navigateParmLoja: JSON.stringify(lojaDadosBasicos)
      }
    })
  }

  function onChangeApelidoLoja() {
  }
  function onChangeCnpj() {
  }

  return (
    <SafeAreaView style={styleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScrollFull} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <Image
          style={myStyles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {isLoading ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor}/> :
          <>
            {lojaDadosBasicos !== null && lojaDadosBasicos.nome !== "" ?
              <View style={myStyles.containerDadosLoja}>
                <Text style={styleApp.textoRegular}>Você já iniciou o cadastramento de uma loja.</Text>
              </View>
              :
              <View style={myStyles.containerDadosLoja}>
                <Text style={styleApp.textoRegular}>Cadastre sua loja para que seus clientes possam receber avisos, alertas de promoções, orientações e muito mais.</Text>
              </View>
            }
          </>
        }

        <View style={{ marginLeft: 12, marginRight: 12 }}>
          {InputText("Apelido da loja (ninguém verá essa informação)", onChangeApelidoLoja, "Apelido", 1, 40, "default", flagEditavel, apelidoLoja, false)}
          {InputText("CNPJ da loja (opcional)", onChangeCnpj, "CNPJ", 1, 16, "default", flagEditavel, cnpj, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!flagEditavel} onPress={goTo}>
            <View style={myStyles.containerButton}>
              <Text style={styleApp.textButtonRegular}>Confirmar e prosseguir</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}