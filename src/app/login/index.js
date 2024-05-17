import React, { useState, useContext } from 'react';
import { Redirect, router } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "./styles";
import { myStylesComuns } from '../../styles/stylesComuns';
import { myStylesColors } from "../../styles/stylesColors";
import { InputText } from '../../componentes/inputText';
import { GradienteFill } from '../../componentes/gradienteFill';
import { AuthContext } from "../../contexts/auth";
import NewErrorMessage, { errorTextOops } from '../../errors/errorMessage';

//Tela principal
export default function ViewLogin() {
  const { user, logIn, signIn, checkToken } = useContext(AuthContext);
  console.log("ViewLogin <inicio> user: ", user);

  //Se eventualmente navegou até aqui mas já possui LOGIN realizado com sucesso
  if (user && user.isContaAtiva && user.isContaAtiva == true) {
    return <Redirect href="(main)" />;
  }

  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);
  const [email, setEmail] = useState("ericflavio@gmail.com");
  const [senhaUm, setSenhaUm] = useState("1234567890");
  const [senhaDois, setSenhaDois] = useState("1234567890");
  const [token, setToken] = useState("abcd");

  const cenarioEntrarEditar = 1; // Edita dados de login
  const cenarioEntrarValidar = 11; // Valida dados fornecidos para login
  const cenarioCadastrarEditar = 2; // Edita dados de cadastramento
  const cenarioCadastrarValidar = 21; // Valida dados de cadastramento
  const cenarioCadastrarEditarToken = 3; // Edita token enviado por email
  const cenarioCadastrarValidarToken = 31; // Valida token

  var textoRecepcionista = "";
  var flagEditavel = true;
  cenario > 10 ? flagEditavel = false : flagEditavel = true;

  //Monta texto da recepcionista
  switch (cenario) {
    case cenarioEntrarEditar:
      !flagErro
        ? textoRecepcionista = "Já tem cadastro? Informe os dados para entrar"
        : textoRecepcionista = "Verifique as informações e tente novamente";
      break;
    case cenarioEntrarValidar:
      textoRecepcionista = "validando...";
      break;
    case cenarioCadastrarEditar:
      !flagErro
        ? textoRecepcionista = "Informe os dados abaixo para se cadastrar"
        : textoRecepcionista = "Verifique as informações e tente novamente";
      break;
    case cenarioCadastrarValidar:
      textoRecepcionista = "cadastrando você...";
      break;
    case cenarioCadastrarEditarToken:
      !flagErro
        ? textoRecepcionista = "Ative sua conta com o código enviado para o seu e-mail"
        : textoRecepcionista = "Verifique o código e tente novamente";
      break;
    case cenarioCadastrarValidarToken:
      textoRecepcionista = "validando o código...";
      break;
  };

  function fluxoEntrar() {
    if (flagErro) setFlagErro(false);
    setCenario(cenarioEntrarEditar);
  }
  function fluxoCadastrar() {
    if (flagErro) setFlagErro(false);
    setCenario(cenarioCadastrarEditar);
  }
  function onChangeEmail(emailEdt) {
    //TODO: configurar Upercase -- automaticupscale = false
    //console.log("email: ", emailEdt)
    //if (emailEdt === undefined) emailEdt = "";
    //var emailEdtLC = emailEdt.toLowerCase();
    //console.log("emailEdtLC: ", emailEdtLC)
    setEmail(emailEdt);
  }
  function validarSintaxeEmail(email) {
    //const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@a-zA-Z0-9?(?:\.a-zA-Z0-9?)*$/;
    if (!email || email.length <= 5) return false;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    return regex.test(email);
  }
  function validarSintaxeSenha(senha) {
    if (!senha || senha.length < 8) return false;
    return true;
  }
  function onChangeToken(tokenEdt) {
    setToken(tokenEdt);
  }
  function validarSintaxeToken(token) {
    if (!token || token.length !== 4) return false;
    return true;
  }
  async function reenviarToken() {
    //TODO: Reenviar token
    Alert.alert('Tudo certo', 'Enviamos um novo código de confirmação para o seu e-mail', [
      {
        text: '',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'FECHAR', onPress: () => console.log('OK Pressed') },
    ]);
  }
  async function prosseguir() {
    //console.log("cenario: ", cenario)
    switch (cenario) {
      case cenarioEntrarEditar:
        if (!validarSintaxeEmail(email)) {
          const error = NewErrorMessage("ob101");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };
        if (!validarSintaxeSenha(senhaUm)) {
          const error = NewErrorMessage("ob102");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };

        setCenario(cenarioEntrarValidar); //Renderiza tela no modo aguardando realização do login

        try {
          //console.log("ViewLogin -- logIn");
          const user = await logIn(email, senhaUm);
          console.log("aqui----user: ", user);
          if (user.isContaAtiva && user.isContaAtiva == true) {
            router.replace('(main)'); //Conta ativa
          } else {
            if (flagErro) setFlagErro(false);
            setCenario(cenarioCadastrarEditarToken); //Conta não ativa
          }
        } catch (e) {
          const error = NewErrorMessage("ob104", e);
          Alert.alert(errorTextOops, error.message);
          setCenario(cenarioEntrarEditar);
          if (!flagErro) setFlagErro(true);
          return;
        }
        break;

      case cenarioCadastrarEditar:
        if (!validarSintaxeEmail(email)) {
          const error = NewErrorMessage("ob101");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };
        if (!validarSintaxeSenha(senhaUm)) {
          const error = NewErrorMessage("ob102");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };
        if (!validarSintaxeSenha(senhaDois)) {
          const error = NewErrorMessage("ob102");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };
        if (senhaUm !== senhaDois) {
          const error = NewErrorMessage("ob103");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };

        setCenario(cenarioCadastrarValidar); //Renderiza tela no modo aguardando realização do cadastramento

        try {
          console.log("ViewLogin/ Prosseguir -- sigIn");
          const auth = await signIn(email, senhaUm);
          console.log("Novo user sucesso!: ", auth);
          setCenario(cenarioCadastrarEditarToken);
          if (flagErro) setFlagErro(false);
        } catch (e) {
          console.log("Erro novo user: ", e.message);
          setCenario(cenarioCadastrarEditar);
          if (!flagErro) setFlagErro(true);
          return;
        }
        break;

      case cenarioCadastrarEditarToken:
        if (!validarSintaxeToken(token)) {
          const error = NewErrorMessage("ob105");
          Alert.alert(errorTextOops, error.message);
          if (!flagErro) setFlagErro(true);
          return;
        };

        setCenario(cenarioCadastrarValidarToken); //Renderiza tela no modo aguardando

        try {
          const isTokenValido = await checkToken(user, token);
          console.log("isTokenValido: ", isTokenValido);
          router.replace('(main)');
        } catch (e) {
          const error = NewErrorMessage("ob106");
          Alert.alert(errorTextOops, error.message);
          setCenario(cenarioCadastrarEditarToken);
          if (!flagErro) setFlagErro(true);
          return;
        }
        break;
    };
  }

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStylesComuns.textoTituloPagina}>
            Que bom você por aqui
          </Text>
        </View>

        <View style={myStyles.containerRecepcionista}>
          <View style={myStyles.containerAvatar}>
            <Image
              style={myStyles.imgAvatar}
              source={require('../../assets/outros/sheep_padrao.png')}
            />
            <MaterialIcons name="textsms" size={36} color={(flagErro ? myStylesColors.corErro : myStylesColors.corAzulClaro)} />
          </View>

          <View style={myStyles.conteinerTextoAvatar}>
            <Text style={myStylesComuns.textoComum}>
              {textoRecepcionista}
            </Text>
          </View>

          {cenario == cenarioCadastrarEditarToken || cenario == cenarioCadastrarValidarToken ?
            <View style={{ marginTop: 0 }}>
              {InputText(onChangeToken, "Código de confirmação", 1, 4, "default", flagEditavel, token, null, false)}
            </View>
            :
            <View style={{ marginTop: 18 }}>
              {InputText(onChangeEmail, "seu_email@", 1, 60, "email-address", flagEditavel, email, null, false)}
              {InputText(setSenhaUm, "sua senha", 1, 10, "default", flagEditavel, senhaUm, null, true)}
            </View>
          }

          {cenario == cenarioCadastrarEditar || cenario == cenarioCadastrarValidar ?
            <View style={{ marginTop: 0 }}>
              {InputText(setSenhaDois, "repita a mesma senha", 1, 10, "default", flagEditavel, senhaDois, null, true)}
            </View>
            : ""
          }

          <TouchableOpacity style={myStylesComuns.button} disabled={!flagEditavel} onPress={prosseguir} >
            <View style={{ flexDirection: "row" }}>
              <Text style={myStylesComuns.buttonTextoStyle}>Prosseguir</Text>
              {!flagEditavel ? <ActivityIndicator /> : ""}
            </View>
          </TouchableOpacity>
        </View>

        {cenario == cenarioEntrarEditar || cenario == cenarioEntrarValidar ?
          <View style={myStyles.containerFacilidades}>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={fluxoCadastrar}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Precisa de ajuda com a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={fluxoCadastrar}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Clique aqui para se cadastrar</Text>
            </TouchableOpacity>
          </View>
          : ""}

        {cenario == cenarioCadastrarEditar || cenario == cenarioCadastrarValidar ?
          <View style={myStyles.containerFacilidades}>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={fluxoEntrar}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Clique aqui se já tiver cadastro</Text>
            </TouchableOpacity>
          </View>
          : ""}

        {cenario == cenarioCadastrarEditarToken || cenario == cenarioCadastrarValidarToken ?
          <View style={myStyles.containerFacilidades}>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={reenviarToken}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Clique para receber novo código</Text>
            </TouchableOpacity>
          </View>
          : ""}
      </ScrollView>
    </SafeAreaView >
  )
}