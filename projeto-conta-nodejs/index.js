//Importando modulos externos
import chalk from "chalk";
import inquirer from "inquirer";

//Importando modulo interno
import fs, { access } from "fs";

//Interface no terminal que tenhas as seguintes opções:
//Criar conta - Vai receber um nome e caso não exista um diretório, criar um juntamente com um json com os dados (nome e balance)
//Depositar - Vai receber um valor numérico e adicionar ao balance atual
//Sacar - Vai receber um valor numérico e remover do balance atual
//Consultar saldo - Mostrar valor do balance atual
//Excluir conta - Vai receber o nome da conta e pedir uma confirmação, logo após deletar
//Sair - Vai sair do aplicativo

interfaceApp();

function interfaceApp() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "list",
        message: "Bem vindo ao Accounts, escolha uma das opções!",
        choices: [
          "Criar conta",
          "Depositar",
          "Sacar",
          "Consultar saldo",
          "Excluir conta",
          "Sair",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];
      switch (action) {
        case "Criar conta":
          //
          break;
        case "Depositar":
          //
          break;
        case "Sacar":
          //
          break;
        case "Consultar saldo":
          //
          break;
        case "Excluir conta":
          //
          break;
        case "Sair":
          console.log(chalk.bgBlue.black("Obrigado por utilizar nosso App!"));
          process.abort;
          break;
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}
