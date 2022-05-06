# Projeto React

## Pré-requisitos:

#### - Node.js

#### - Backend do projeto: https://github.com/FelypeNasc/my-alpha-backend

#

## Passo a passo:

#### 1 - Acesse a pasta raiz e execute o comando "npm install" onde serão baixadas as dependências.

#### 2 - Execute o comando "npm start"

#### 2 - Acesse o navegador pela url: http://localhost:3000/

#

<!-- ### Todo o conteúdo das páginas está em "\src". Dentro de source temos:

- "\components" - onde tem todas as componenentes das páginas e o arquivo "exporterOfComponents",
que importa e exporta todas as componentes.

- "\pages" - contém uma pasta para cada página

- "App.js" - importa as páginas e outras libs

- "index.js" - renderiza a página

Para alterar algo numa página, tem que ir até o arquivo JS da pasta da página e alterar.
Para alterar uma componente, tem que ir até a pasta da componente e alterar o arquivo JS
(OBS: O nome da pasta DEVE ter o mesmo nome que o componente, por exemplo, a pasta "/PositiveButton"
contém o arquivo JS do componente "PositiveButton")

Ao criar novas componentes, deve importá-lo e exportá-lo no arquivo "\componentes\exporterOfComponents.js",
e então poderá importar essa componente numa página através desse arquivo apenas. -->

<!--
## Delete route response codes:

#### 200 - delete succesful

#### 401 - wrong username and/or password

#### 500 - server internal failure

## front-end fetch template

> let response = await fetch ('/route', {
> method: 'METHOD',
> body: JSON.stringify({
>
> }),
> headers: {
> 'content-type': 'application/json'
> }
> })
> .then( resp => { return resp.text(); })
> .then ( res => { console.log('response: '); console.log(res); return res; })
> .catch( e => { console.log('fetch error: '); console.log(e); return null; } ); -->
