//Importando modulos externos
import chalk from "chalk";
import inquirer from "inquirer";

//Importando modulo interno
import fs from "fs";

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
          createAccount();
          break;
        case "Depositar":
          deposit();
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

//Criar um diretório, caso não exista.
//Criar um arquivo txt dentro do diretório com nome da conta e balance zerado.
function createAccount() {
  inquirer
    .prompt([
      {
        name: "action",
        message: "Digite um nome para sua conta",
      },
    ])
    .then((answer) => {
      const accountName = answer["action"];

      // console.log(accountName);
      const dir = "./accounts";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (!accountName) {
        console.log(chalk.bgRed.black("Por favor, digite um valor válido!"));
        createAccount();
      } else if (!fs.existsSync(accountName)) {
        fs.appendFileSync(`./accounts/${accountName}.json`, '{"balance": 0}');
        interfaceApp();
      }
    })
    .catch((err) => {
      if (err) throw err;
    });
}

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Digite o nome da conta que deseja realizar o depósito",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!verifyAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: `Digite o valor que deseja depositar à conta: ${accountName}`,
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          addAmount(accountName, amount);
          interfaceApp();
        })
        .catch((err) => {
          if (err) throw err;
        });
    })
    .catch((err) => {
      if (err) throw err;
    });
}

function verifyAccount(accountName) {
  if (!fs.existsSync(`./accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black(
        "Esta conta não existe, certifique-se que não houve nenhum erro de digitação"
      )
    );
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  if (!amount) {
    console.log(chalk.bgRed.black("Valor invalido, tente novamente!"));
    deposit();
  }

  const data = JSON.parse(
    fs.readFileSync(`./accounts/${accountName}.json`, {
      encoding: "utf8",
      flag: "r",
    })
  );

  const newBalance = data.balance + parseInt(amount);

  fs.writeFileSync(
    `./accounts/${accountName}.json`,
    `{"balance": ${newBalance}}`
  );

  console.log(
    chalk.bgGreen.black(
      `O valor de R$${amount} foi depositado à sua conta com sucesso!`
    )
  );
}
