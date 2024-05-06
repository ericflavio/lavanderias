import { View, Image, ActivityIndicator } from "react-native";
import { Link } from "expo-router";
import React, { useContext, useEffect } from 'react';
import { AuthContext } from "../contexts/auth";
import { myStyles } from './styles';
import { GetLocalDataLogin, SetLocalDataLogin, RemoveLocalDataLogin} from '../services/localStorageService';

export default function ViewStart() {

  useEffect(() => {
    console.log("home renderizada")
    const userData = {
      login: "eric@gmail.com",
      id: "1001",
      token: "token09934-912934-12222"
    };
    SetLocalDataLogin(userData)
    //RemoveLocalDataLogin();
    handleStorageDataleLogin();
  }, []);

  async function handleStorageDataleLogin() {
    var userDataLogin = await GetLocalDataLogin();

    //Verifica se o token ainda é válido
    var d = new Date();
    var dataHora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

    if (userDataLogin == undefined || userDataLogin == null ||
      userDataLogin.timestamp == undefined) {
      console.log("timestamp invalido")
    } else {
      console.log("User: ",userDataLogin )
    }

  }

  //const { signIn } = useContext(AuthContext);
  //function logar() {
  // var user = signIn("eric@gmail.com", "12345678")
  // console.log("home-logar-user: ", user);
  //}

  return (
    <View style={myStyles.containerBody}>
      {/*<Text>HOME</Text>
      <Link href={"/principal"}>Ir para main</Link>
     <Link href={"/login"}>Ir para login</Link>*/}
      <View style={myStyles.containerSpiner}>
        <ActivityIndicator size="large" />
      </View>
      <Image
        style={myStyles.imgLogo}
        source={require('../assets/outros/ovelha_cena_01.png')}
      />
    </View>
  )
}