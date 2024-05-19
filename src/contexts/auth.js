import { React, createContext, useState, useEffect } from "react";
import { signInService, logInService, checkTokenService } from '../services/authService';
import { GetLocalDataLogin, SetLocalDataLogin, RemoveLocalDataLogin } from '../services/localStorageService';

export const AuthContext = createContext({}); // Inicializa contexto vazio

//É necessário criar o provedor do contexto
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  console.log("AuthProvider _ ", "isLoading: ", isLoading , " user: ", user !== null ? user.login : "[null]",  "isContaAtiva: ", user !== null && user.isContaAtiva !== undefined ? user.isContaAtiva : "[undefined]");

  useEffect(() => {
    //Toda vez que o app se iniciar/contexto for criado
    //Resgata, se houver, user na storage
    //TODO: remover a remoção
    //RemoveLocalDataLogin();
    loadUserFromLocalStorage();
  }, [])

  //Funções assíncronas para invocação das APIs
  async function signIn(email, senha) {
    if (!email || !senha) return null;

    try {
      const auth = await signInService(email, senha);
      await SetLocalDataLogin(auth) //Persiste o usuário localmente
      setUser(auth) //Rerender atualização dos dados do Contexto
      return auth;
    } catch (e) {
      throw e;
    }
  };

  async function signOut() {
    await RemoveLocalDataLogin() //Remove o usuário localmente
    setAuth(null); //limpar o state do objeto user
    return true;
  };

  async function logIn(email, senha) {
    if (!email || !senha) return null;

    try {
      const auth = await logInService(email, senha);
      await SetLocalDataLogin(auth) //Persiste o usuário localmente
      setUser(auth) //Rerender atualização dos dados do Contexto
      return auth;
    } catch (e) {
      throw e;
    }
  };

  async function checkToken(user, token) {
    if (!user || !token) return false;

    try {
      const isTokenValido = await checkTokenService(user, token);
      if (isTokenValido) {
        user.isContaAtiva = true;
        await SetLocalDataLogin(user) //Persiste o usuário localmente
        setUser(user) //Rerender atualização dos dados do Contexto
      }
      return true;
    } catch (e) {
      throw e;
    }
  };

  async function logOut() {
    await RemoveLocalDataLogin() //Remove o usuário localmente
    setAuth(null); //limpar o state do objeto user
    return true;
  };

  async function loadUserFromLocalStorage() {
    var auth = null;
    try {
      auth = await GetLocalDataLogin();
    } catch (e) {}
    
    if (auth && auth !== null) {
      setUser(auth) //Rerender e atualização dos dados do Contexto
    }
    setLoading(false);
  };

  //Como este Provider é invocado no componente _layout.js raiz dentro da
  //pasta scr/app, que é onde start a aplicação como um todo, as informações
  //do contexto serão compartilhadas em todos os lugares/componentes 
  return (
    <AuthContext.Provider value={{ isLoading, user, signIn, signOut, logIn, logOut, checkToken }}>
      {children}
    </AuthContext.Provider>
  )
}