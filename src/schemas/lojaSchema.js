//Schema das tabelas 

//TIPOS de visualização de maquinário
export var schemaTipoViewMaquinario = {
  conjunto: "conjunto", //Maquinas na forma de conjunto (lavadora embaixo)
  lista: "lista" //Maquinas na forma de listagem
};
//TIPOS de status das Máquinas
export var schemaStatusMaquinario = {
  //Status que o lojista imposta
  ativa: "Ativa",
  manutencao: "Manutenção", //Obs. Este faz override na telemetria
  //Status que a Telemetria informa
  disponivel: "Disponível", 
  indisponivel: "Indisponível",
  indeterminado: "Indeterminado",
};

//Facilidades
export var schemaLojaTiposFacilidades = {
  codigo: "",
  titulo: "",
  nomeIcone_MaterialIcons: "",
};
export var schemaLojaFacilidades = {
  codigo: "", //Cada registro significa que a facilidade está habilitada
};

//Franquia vinculada à loja
export var schemaLojaMaquinario = {
  //Obs: Sempre ler ordenado pelo nr do conjunto
  idMaquina: "",
  tipo: "", //"l", "s"
  nrConjunto: "", //Agrupador de lava e seca. Igual a soma dos labels. Ex: L+S --> "1"+"2" = 123; "3"+null = 33; "9"+"10"=91019
  numeroLabel: "",
  nomeLabel: "",
  status: "", //Obs: Este sobrescreve o status da telemetria
};

//Franquia vinculada à loja
export var schemaLojaFranquiaVinculada = {
  //Setado pelo franqueado
  idFranquia: "",
  dataVinculo: '', //Data que o franqueado criou o vinculo
  //Setado pelo franqueador
  dataInicioVinculoConfirmado: "",
  dataFimVinculoConfirmado: '',
  dataRegistroInicioVinculo: "",
  dataRegistroFimVinculo: '',
  idUsuarioConfirmacao: '',
  status: '', //[Solicitado, Aprovado, Reprovado, Removido]
};

//Horário de expediente
export var schemaLojaExpediente = {
  dia: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
  aberto: ["s", "s", "s", "s", "s", "s", "s"],
  hrInicio: ["", "", "", "", "", "", ""],
  hrFim: ["", "", "", "", "", "", ""],
  inPermanentementeAberto: true,
  inAtendeChamadosForaDoExpediente: false,
};

//Dados mínimos e complementares
export var schemaLojaDadosMinimos = {
  id: "",
  nome: "",
  apelido: "",
  status: "",
  cnpj: ""
};
export var schemaLojaDados = {
  id: "",
  nome: "",
  apelido: "",
  status: "",
  cnpj: "",
  email: "",
  whatsapp: "",
  idImagemCapa: "",
};

//Status 
export var schemaLojaStatus = {
  id: "",
  nome: "",
  descricao: "",
  inPermiteEdicao: false,
  dfs: [],
};

//Endereço
export var schemaLojaEndereco = {
  cep: "",
  localidade: "",
  uf: "",
  ddd: "",
  bairro: "",
  logradouro: "",
  numero: "",
  complemento: "",
};

//Localização
export var schemaLojaLocalizacao = {
  latitude: "",
  longitude: "",
  urlMapa: "",
};