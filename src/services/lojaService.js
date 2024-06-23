import axios from 'axios';
import {
  schemaLojaDadosMinimos,
  schemaLojaDados,
  schemaLojaStatus,
  schemaLojaEndereco,
  schemaLojaLocalizacao,
  schemaLojaExpediente,
  schemaLojaFranquiaVinculada,
  schemaLojaMaquinario,
} from '../schemas/lojaSchema';

//Maquinario
export async function consultaListaMaquinario() {
  const res = [
    {
      idMaquina: "UUID01",
      tipo: "l",
      nrConjunto: '123',
      numeroLabel: "1",
      nomeLabel: "Lava",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID02",
      tipo: "s",
      nrConjunto: '123',
      numeroLabel: "2",
      nomeLabel: "Seca",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID03",
      tipo: "l",
      nrConjunto: '347',
      numeroLabel: "3",
      nomeLabel: "Lava",
      status: "Indisponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID04",
      tipo: "s",
      nrConjunto: '347',
      numeroLabel: "4",
      nomeLabel: "Seca",
      status: "Manutenção",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID05",
      tipo: "l",
      nrConjunto: '5611',
      numeroLabel: "5",
      nomeLabel: "Lava",
      status: "Disponível",
      capacidadeKg: 11,
    },
    {
      idMaquina: "UUID06",
      tipo: "s",
      nrConjunto: '5611',
      numeroLabel: "6",
      nomeLabel: "Seca",
      status: "Manutenção",
      capacidadeKg: 11,
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res)
    }, 200);
  })
}

//Franquia vinculada
export async function consultaFranquiaVinculada(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idLoja && idLoja === "s") {

        schemaLojaFranquiaVinculada.idFranquia = "00001";
        schemaLojaFranquiaVinculada.dataVinculo = "01/07/2024";
        schemaLojaFranquiaVinculada.dataInicioVinculoConfirmado = "";
        schemaLojaFranquiaVinculada.dataFimVinculoConfirmado = "";
        schemaLojaFranquiaVinculada.dataRegistroInicioVinculo = "";
        schemaLojaFranquiaVinculada.dataRegistroFimVinculo = "";
        schemaLojaFranquiaVinculada.idUsuarioConfirmacao = "01010101";
        schemaLojaFranquiaVinculada.status = "Solicitado";

        resolve(schemaLojaFranquiaVinculada)
      } else {
        resolve(null)
      }
    }, 200);
  })
}

//Expediente (horários)
export async function atualizaExpedienteLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 200);
  })
}

export async function consultaExpedienteLoja(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (idLoja && idLoja === "s") {
        schemaLojaExpediente.dia = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
        schemaLojaExpediente.aberto = ["s", "s", "s", "s", "s", "n", "n"];
        schemaLojaExpediente.hrInicio = ["06:00", "06:00", "06:00", "06:00", "06:00", "06:00", "06:00"];
        schemaLojaExpediente.hrFim = ["23:00", "23:00", "23:00", "23:00", "23:00", "23:00", "23:00"];
        schemaLojaExpediente.inPermanentementeAberto = true;
        schemaLojaExpediente.inAtendeChamadosForaDoExpediente = 0; //1-sim, 2-não, 0-não selecionado
        resolve(schemaLojaExpediente)
      } else {
        resolve(null)
      }
    }, 200);
  })
}

//Status (todos)
export async function consultaListaStatusLoja() {
  const statusLoja = [
    {
      id: "Criando", //Cadastramento iniciado. Ainda não foi ativada pela primeria vez.
      nome: "Criando",
      descricao: "A loja está sendo criada. Omitida da consulta de lojas, e ninguém pode favoritá-la.",
      tituloAcionamento: "Cadastrar uma loja que possuo",
      icone: "add-business", //expo materialIcons
      inPermiteEdicao: true,
      dfs: ["Ativa", "Excluída"]
    },
    {
      id: "Ativa", //Proprietário autorizou que a loja seja encontrata nas pesquisas
      nome: "Ativa",
      descricao: "Todas as pessoas podem pesquisar e favoritar esta loja.",
      tituloAcionamento: "Aparecer nas buscas (ativar)",
      icone: "saved-search", //expo materialIcons
      inPermiteEdicao: true,
      dfs: ["Suspensa", "Inativa"]
    },
    {
      id: "Suspensa", //Temporariamente omitda da consulta de pesquisa de lojas. Também não pode ser favoritada por ninguém.
      nome: "Suspensa",
      descricao: "Situação temporária: Omitida da consulta de lojas, e ninguém pode favoritá-la.",
      tituloAcionamento: "Suspender atividade temparariamente",
      icone: "pause-circle-outline", //expo materialIcons
      inPermiteEdicao: true,
      dfs: ["Ativa", "Inativa"]
    },
    {
      id: "Inativa", //Permanentemente omitida dos resultados das 
      nome: "Inativa",
      descricao: "Permanentemente omitida da consulta de lojas, e ninguém pode mais favoritá-la.",
      tituloAcionamento: "Inativar permamentemente",
      icone: "stop-circle", //expo materialIcons
      inPermiteEdicao: false,
      dfs: []
    },
    {
      id: "Excluída", //Registro deletado da base (mesmo). Cliente desistiu do cadastramento.
      nome: "Excluída",
      descricao: "Permanentemente excluída.",
      tituloAcionamento: "Desistir de cadastrar (excluir)",
      icone: "delete-outline", //expo materialIcons
      inPermiteEdicao: true,
      dfs: []
    },
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(statusLoja)
    }, 200);
  })
}

//Lista de unidades
export async function consultaListaUnidades(user) {
  const res = [
    {
      id: "Loja00001",
      nome: "loja-01",
      apelido: "Apelido-01",
      status: "Criando",
      cnpj: ""
    },
    {
      id: "Loja00002",
      nome: "loja-02",
      apelido: "Apelido-02",
      status: "Inativa",
      cnpj: ""
    },
    {
      id: "Loja00003",
      nome: "loja-03",
      apelido: "Apelido-03",
      status: "Suspensa",
      cnpj: ""
    }
  ];
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(res);
    }, 200);
  })
}

//Loja em edicao
export async function consultaExistenciaLojaEmCriacao(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (user && user === "s") {
        schemaLojaDadosMinimos.id = "LOJA00001",
          schemaLojaDadosMinimos.nome = "Aquamagic-AsaNorte-Brasilia-DF",
          schemaLojaDadosMinimos.apelido = "Apelido-loja",
          schemaLojaDadosMinimos.status = "Criando",
          schemaLojaDadosMinimos.cnpj = ""
        resolve(schemaLojaDadosMinimos)
      } else {
        resolve(null)
      }
    }, 200);
  })
}

//Dados de uma loja
export async function consultaDadosLoja(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id && id === "s") {
        schemaLojaDados.id = "LOJA00001",
          schemaLojaDados.nome = "Aquamagic-AsaNorte-Brasilia-DF",
          schemaLojaDados.apelido = "Apelido-loja",
          schemaLojaDados.status = "Criando",
          schemaLojaDados.cnpj = "",
          schemaLojaDados.email = "",
          schemaLojaDados.whatsapp = "",
          schemaLojaDados.idImagemCapa = ""
        resolve(schemaLojaDados)
      } else {
        resolve(null)
      }
    }, 200);
  })
}

export async function atualizaDadosBasicosLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 200);
  })
}

//Endereco
export async function consultaEnderecoLoja(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      schemaLojaEndereco.cep = "70847060";
      schemaLojaEndereco.localidade = "Brasilia";
      schemaLojaEndereco.uf = "DF";
      schemaLojaEndereco.ddd = "61";
      schemaLojaEndereco.bairro = "Asa Norte";
      schemaLojaEndereco.logradouro = "SQN 109 Bloco A";
      schemaLojaEndereco.numero = "108";
      schemaLojaEndereco.complemento = "Apto";
      resolve(schemaLojaEndereco)
    }, 200);
  })
}
export async function IncluiEnderecoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endereco) {
        resolve(null)
      } else {
        resolve(null)
      }
    }, 200);
  })
}
export async function atualizaEnderecoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //reject(null)
      resolve(null)
    }, 200);
  })
}

//Localização geográfica
export async function consultaLocalizacaoLoja(idLoja) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //schemaLojaLocalizacao.latitude = "13.0929340";
      //schemaLojaLocalizacao.longitude = "-27.9828120";
      //schemaLojaLocalizacao.urlMapa = "https://maps.google.com";
      resolve(null)
    }, 200);
  })
}
export async function IncluiLocalizacaoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 200);
  })
}
export async function atualizaLocalizacaoLoja(idLoja, data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, 200);
  })
}




