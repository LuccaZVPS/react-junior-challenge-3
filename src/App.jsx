import { useEffect, useState } from "react";

/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

function App() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isFemale === false) {
      return;
    }
    setIsFemale(false);
  }, [isMale]);

  useEffect(() => {
    if (isMale === false) {
      return;
    }
    setIsMale(false);
  }, [isFemale]);
  useEffect(() => {
    fullValidate();
  }, [fullName, email, status, isMale, isFemale]);

  const fullValidate = () => {
    var currentProgress = 0;
    if (validateFullName()) {
      currentProgress += 25;
    }
    if (validateEmail()) {
      currentProgress += 25;
    }
    if (validateStatus()) {
      currentProgress += 25;
    }
    if (isMale || isFemale) {
      currentProgress += 25;
    }
    setProgress(currentProgress);
  };
  const validateFullName = () => {
    const listName = fullName.split(" ");
    if (!listName[1]) {
      return false;
    }
    return true;
  };
  const validateEmail = () => {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  };
  const validateStatus = () => {
    return status !== "";
  };
  const sendForm = () => {
    alert("Form Enviado!");
  };
  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="form-group">
          <label htmlFor="">Nome Completo</label>
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">E-mail</label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Estado Civil</label>
          <select
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                onChange={(e) => {
                  setIsMale(e.target.checked);
                }}
                name="genre"
                type="radio"
              />{" "}
              Masculino
            </span>
            <span>
              <input
                onChange={(e) => {
                  setIsFemale(e.target.checked);
                }}
                name="genre"
                type="radio"
              />{" "}
              Feminino
            </span>
          </div>
        </div>
        <button disabled={progress !== 100} onClick={sendForm}>
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
