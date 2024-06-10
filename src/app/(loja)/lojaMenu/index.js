import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { consultaListaStatusLoja, consultaLojaEmEdicao } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaDadosMinimos } from '../../../schemas/lojaSchema';

//Tela principal
export default function ViewEdtMenuLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  //Sobre o parâmetro navigateParmLoja:
  //a) Sempre deve chegar preenchido: por seleção de loja na listagem, ou da tela de criação inicial de nova loja.
  //b) Se chegar <> null siginifica que houve algum erro prévio.

  const [lojaDados, setLojaDados] = useState(parmLoja);
  const [disabled, setDisabled] = useState(false);
  const [showViewStatus, setShowViewStatus] = useState(false);
  const [statusList, setStatusList] = useState(null); //Relação de todos os status
  const [statusListToChange, setStatusListToChange] = useState(null); //Status possíveis pelo DFS

  //Providências após a construção do objeto principal
  useEffect(() => {
    fetchLoja();
  }, [])

  async function fetchLoja() {
    let statusInicial = "";
    if (parmLoja !== null) {
      //Parametros de identificação recebidos
      statusInicial = parmLoja.status;
      setLojaDados(parmLoja);
      setDisabled(false); // Libera edição das demais opções
    } else {
      try {
        resLoja = await consultaLojaEmEdicao("s"); //Verifica se já possui alguma sendo criada
      } catch {
        resLoja = null; //Não encontrou uma Loja me estágio de criação para continuar.
      };
      if (resLoja !== null) {
        statusInicial = resLoja.status;
        setLojaDados(resLoja);
        setDisabled(false); // Libera edição das demais opções
      }
    };

    //Consulta a lista de status que podem ser atribuídos a uma loja
    if (statusList === null) { //Ainda não foi consultado
      resList = await fetchStatusList();
      filtraNovosStatusPossiveis(resList, statusInicial)
    }
  }

  async function fetchStatusList() {
    try {
      resList = await consultaListaStatusLoja();
    } catch (e) {
      ShowErrorMessage("lj001", "t");
      resList = null;
    }
    if (resList !== null) {
      setStatusList(resList);
    }
    return resList;
  }

  function verificaEdicaoHabilitada() {

  };

  function filtraNovosStatusPossiveis(resList, statusInicial) {
    let arrayPicker = null;
    if (resList !== null && Object.keys(resList).length > 0) {
      //Monta os possíveis novos status
      for (var i = 0; i < resList.length; i++) {
        if (resList[i].id.toUpperCase() === statusInicial.toUpperCase()) {
          arrayPicker = resList[i].dfs
          break;
        }
      }
    }
    //Atualiza os estados
    if (arrayPicker !== statusListToChange) {
      setStatusListToChange(arrayPicker);
    }
  }

  function goToEndereco() {
    router.navigate({
      pathname: '/lojaEndereco',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados)
      }
    })
  }
  function goToLocalizacao() {
    router.navigate({
      pathname: '/lojaLocalizacao',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados)
      }
    })
  }
  function goToDadosBasicos() {
    router.navigate({
      pathname: '/lojaCadastroBasico',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados), inMinimoOuCompleto: "completo"
      }
    })
  }

  function handleShowViewStatus() {
    if (statusListToChange === null || Object.keys(statusListToChange).length === 0) {
      Alert.alert("O status atual não pode ser alterado!");
      return;
    }
    setShowViewStatus(!showViewStatus);
  }

  console.log("dadosBasicos :", lojaDados)
  return (
    <SafeAreaView style={styleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScrollFull} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {parmLoja === null ?
          <View style={styles.containerDadosLoja}>
            <Text style={styleApp.textSubtitulo}>As informações da loja eram esperadas e não foram recebidas neste ponto.</Text>
            <Text style={styleApp.textSmall}>Tente novamante em instantes. Se o problema persistir, entre em contato com o nosso suporte.</Text>
          </View>
          :
          <>
            {lojaDados !== null && lojaDados.nome !== "" ?
              <View style={styles.containerDadosLoja}>
                <Animatable.Text animation="slideInLeft" style={styleApp.textSubtitulo}>{lojaDados.nome}</Animatable.Text>
                <Text style={styleApp.textSmall}>Status: <Text style={styles.textoStatus}>{lojaDados.status}</Text></Text>
                <Text style={styleApp.textSmall}>Apelido: {lojaDados.apelido}</Text>
              </View>
              :
              <View style={styles.containerDadosLoja}>
                <Text style={styleApp.textRegular}>Atualize os dados da loja.</Text>
              </View>
            }

            <View style={styles.containerSection}>
              <Text style={styleApp.textSmall}>Ações de gerenciamento</Text>
              <MaterialIcons name="settings" size={20} color={styleApp.color.cinzaMedio} />
            </View>

            <View style={styles.containerOthers}>
              <TouchableOpacity style={styleApp.buttonFlatHL} onPress={{}} >
                <MaterialIcons name="delete-outline" size={styleApp.size.iconSizeButtonRegular} color={styleApp.color.textButtonFlat} />
                <Text style={styleApp.textButtonFlat}>Desistir de cadastrar (excluir)</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styleApp.buttonFlatHL} onPress={{}} >
                <MaterialIcons name="saved-search" size={styleApp.size.iconSizeButtonRegular} color={styleApp.color.textButtonFlat} />
                <Text style={styleApp.textButtonFlat}>Aparecer nas buscas dos clientes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerSection}>
              <Text style={styleApp.textSmall}>Configuração da loja</Text>
              <MaterialIcons name="edit" size={20} color={styleApp.color.cinzaMedio} />
            </View>

            <View style={styles.containerPrincipal}>
              <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToEndereco} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="add-business" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                  <Text style={styleApp.textButtonFlat}>Endereço</Text>
                </View>
                <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
              </TouchableOpacity>
              <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToLocalizacao} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="location-on" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                  <Text style={styleApp.textButtonFlat}>Localização</Text>
                </View>
                <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
              </TouchableOpacity>
              <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToEndereco} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="access-time" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                  <Text style={styleApp.textButtonFlat}>Horário de funcionamento</Text>
                </View>
                <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
              </TouchableOpacity>
              <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToDadosBasicos} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="more-vert" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                  <Text style={styleApp.textButtonFlat}>Outras informações</Text>
                </View>
                <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
              </TouchableOpacity>

              <View style={styles.containerSection}>
                <Text style={styleApp.textSmall}>{styleApp.textFraseOpcaoDeAssinantes}</Text>
                <MaterialIcons name="edit" size={20} color={styleApp.color.cinzaMedio} />
              </View>
            </View>
          </>
        }

      </ScrollView>
    </SafeAreaView >
  )
}