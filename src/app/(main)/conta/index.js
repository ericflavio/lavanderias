import React, { useContext, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { router, useLocalSearchParams } from 'expo-router';
import { consultaExistenciaLojaEmCriacao } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaDadosMinimos } from '../../../schemas/lojaSchema';

//Tela principal HOME
export default function ViewConta() {
  const { user, logOut } = useContext(AuthContext);
  //Controles básicos
  const [cenario, setCenario] = useState(1);
  const [isProcessing, setProcessing] = useState(true);
  const [flagShowModal, setflagShowModal] = useState(false);
  //Outras declarações
  const [lojaDados, setLojaDados] = useState(null);

  var name = "Olá!";
  user.name ? name = user.name : name = user.idLogin;

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  cenario !== cenarioEditar || isProcessing ? isEditavel = false : isEditavel = true;

  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    //Verifica se existe loja sendo criada (status = criando)
    try {
      res = await consultaExistenciaLojaEmCriacao("n"); //Verifica se já possui alguma sendo criada
    } catch {
      res = null; //Erro na pesquisad de Loja em estágio de criação para continuar.
      ShowErrorMessage("lj008");
    };
    if (res !== null) {
      setLojaDados(res);
    };
    setProcessing(!isProcessing);
  }

  function adicionarLoja() {
    //Vai pro menu de edição, se existir loja já sendo criada, ou inicia um cadastro básico.
    if (lojaDados !== null) {
      router.navigate({
        pathname: "/lojaMenu",
        params: {
          navigateParmLoja: JSON.stringify(lojaDados)
        }
      })
    } else {
      router.navigate({
        pathname: "/lojaCadastroBasico",
        params: {
          navigateParmLoja: null
        }
      })
    }
  }
  function listarUnidades() {
    router.navigate('/lojaUnidades');
  }
  async function logoutApp() {
    Alert.alert('SAIR', 'Você deseja sair do aplicativo agora?', [
      {
        text: 'Ficar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Sair', onPress: () => logOut() },
    ]);
  }

  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <Text style={styleApp.textTitulo}>
            {name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.imageUser}
              source={require('../../../assets/icones/app_icon_02.png')}
            />
            {isProcessing ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
          </View>
        </View>

        <View style={styles.containerBasics}>
          <TouchableOpacity style={styleApp.buttonFlatV} disabled={!isEditavel} onPress={{}} >
            <MaterialIcons name="help-outline" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatV} disabled={!isEditavel} onPress={{}} >
            <MaterialIcons name="payment" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Pagamentos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerOthers}>
          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={adicionarLoja} >
            <MaterialIcons name="add-business" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Cadastrar uma loja que possuo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={listarUnidades} >
            <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Gerenciar minhas lojas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={{}} >
            <MaterialIcons name="business" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textRegular} />
            <Text style={styleApp.textButtonFlat}>Cadastrar uma franquia </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={{}} >
            <MaterialIcons name="business-center" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>Gerenciar minhas franquias</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={!isEditavel} onPress={logoutApp} >
          <MaterialIcons name="logout" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textButtonFlat} />
          <Text style={styleApp.textButtonFlat}>Sair do app</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}