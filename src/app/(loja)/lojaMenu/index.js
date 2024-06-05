import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import LojaHandleStatus from '../../../componentes/lojaHandleStatus';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { consultaListaStatusLoja, consultaLojaEmEdicao } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';

console.log("ViewEdtMenuLoja <inicio>");

//Tela principal
export default function ViewEdtMenuLoja() {
  const { user } = useContext(AuthContext);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState({ status: "", nome: "" });
  const [disabledEndereco, setDisabledEndereco] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [showViewStatus, setShowViewStatus] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(""); //Quando novo status é selecionado para atualizar
  const [statusList, setStatusList] = useState(null); //Relação de todos os status
  const [statusListToChange, setStatusListToChange] = useState(null); //Status possíveis pelo DFS

  //Caso criação de nova loja: não chega parâmetro
  //Caso edição (loja selecionada na lista): chega parâmetro
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  useEffect(() => {
    console.log("useEffetc>>><1>")
    fetchLoja();
  }, [])

  async function fetchLoja() {
    let statusInicial = "";
    console.log("parm ", parmLoja)
    if (parmLoja !== null) {
      //Edição de loja: parametros de identificação recebidos
      statusInicial = parmLoja.status;
      setLojaDadosBasicos(parmLoja);
      setDisabled(false); // Libera edição das demais opções
    } else {
      //Inclusão de nova loja; parametro não recebido
      try {
        resLoja = await consultaLojaEmEdicao("n"); //Verifica se já possui alguma sendo criada
      } catch {
        resLoja = null; //Não encontrou uma Loja me estágio de criação para continuar.
      };
      if (resLoja !== null) {
        statusInicial = resLoja.status;
        setLojaDadosBasicos(resLoja);
        setDisabled(false); // Libera edição das demais opções
      }
    };
    setDisabledEndereco(false); // Libera edição do endereço

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

  function filtraNovosStatusPossiveis(resList, statusInicial) {
    let arrayPicker = null;
    if (resList !== null && Object.keys(resList).length > 0) {
      //Monta os possíveis novos status
      for (var i = 0; i < resList.length; i++) {
        if (resList[i].id.toUpperCase() === statusInicial.toUpperCase()) {
          console.log("achei no indice: ", i, " ", statusInicial)
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

  function goTo() {
    router.navigate({
      pathname: "/lojaEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
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
  function handleSelectNewStatus(statusPicker) {
    setSelectedStatus(statusPicker);
  }

  console.log("dadosBasicos :", lojaDadosBasicos)
  return (
    <SafeAreaView style={myStyleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScrollWB} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>
        <Image
          style={myStyles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {lojaDadosBasicos !== null && lojaDadosBasicos.nome !== "" ?
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoTituloPagina}>{lojaDadosBasicos.nome}</Text>
            <Text style={myStyleApp.textoRegular}>Status: <Text style={myStyles.textoStatus}>{lojaDadosBasicos.status}</Text></Text>
          </View>
          :
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoRegular}>Cadastre sua loja para que seus clientes possam favoritá-la. Começe pelo endereço, nas opções abaixo.</Text>
          </View>
        }

        <View style={{ backgroundColor: myStyleApp.color.cinzaClaro, minHeight: 24, paddingLeft: 12 }}>
          <Text style={myStyleApp.textoPequeno}>Ações de gerenciamento</Text>
        </View>

        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="delete-outline" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleApp.color.buttonTextFlat} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Desistir de cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="saved-search" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleApp.color.buttonTextFlat} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Aparecer nas buscas</Text>
          </TouchableOpacity>
{/*           <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="pause-presentation" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleApp.color.buttonTextFlat} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Omitir temporariamnte das buscas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="cancel-presentation" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleApp.color.buttonTextFlat} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Desativar permanentemente</Text>
          </TouchableOpacity> */}
        </View>


        <View style={{ backgroundColor: myStyleApp.color.cinzaClaro, minHeight: 24, paddingLeft: 12 }}>
          <Text style={myStyleApp.textoPequeno}>Opções de edição</Text>
        </View>


        <View style={myStyles.containerPrincipal}>
          <TouchableOpacity style={myStyleApp.buttonFlatHL_list} disabled={disabledEndereco} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonTextFlat} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Endereço</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.cinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL_list} disabled={disabled} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-on" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonTextFlat} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Localização</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.cinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL_list} disabled={disabled} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="access-time" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonTextFlat} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Horário de funcionamento</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.cinzaMedio} />
          </TouchableOpacity>

          <View style={{ backgroundColor: myStyleApp.color.cinzaClaro, minHeight: 24, paddingLeft: 12 }}>
            <Text style={myStyleApp.textoPequeno}>Opções de edição para assinantes</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}