# Tetris

![Static Badge](https://img.shields.io/badge/Estado%20-%20Terminado%20-%20green)

## Introducción

El proyecto es una implementación del clásico juego de Tetris. El objetivo es ofrecer una experiencia fiel al juego original, añadiendo la funcionalidad de compartir los resultados con otros jugadores interesados.<br/>
En la tabla de contenido encontrarás detalles sobre cómo probar el juego de forma local o si queres tambien explica cómo jugar en línea.

## Tabla de contenido

- [Introducción](#Introducción)
- [Tabla de contenido](#Tabla-de-contenido)
- [Tipo de proyecto](#Tipo-de-proyecto)
- [Capturas de pantalla](#Capturas-de-pantalla)
- [Estrategias](#Estrategias)
- [Tecnologías utilizadas](#Tecnologías-utilizadas)
- [Estructura](#Estructura)
- [Instalación](#Instalación)
- [Uso](#Uso)

## Tipo de proyecto

Proyecto individual.

## Capturas de pantalla

[![tetris-game.png](https://i.postimg.cc/rmtcJgnw/tetris-game.png)](https://postimg.cc/MMxhZ0JC)
[![tetris-menu.png](https://i.postimg.cc/ZYdKFY2x/tetris-menu.png)](https://postimg.cc/QVj3jDXF)
[![tetris-lose.png](https://i.postimg.cc/B6D9Dbb8/tetris-lose.png)](https://postimg.cc/MMWFJWyx)

## Estrategias

### Logica

Separo la lógica del juego en una carpeta aparte llamada "gameLogic" para mantener una estructura de proyecto más organizada y modular. Permitiendome una mejor gestión del código, facilita las pruebas unitarias y mejora la mantenibilidad ya que aislo la lógica del juego de la interfaz de usuario y otras funcionalidades.

### Hooks

Organizo los hooks en una carpeta dedicada, siguiendo la convención de nombrar los hooks con el prefijo use para una identificación clara. Utilizo estos hooks para simplificar el código y reducir su complejidad, mejorando así la mantenibilidad y la claridad del proyecto.

### Test

Realizo varios tests automáticos sobre la lógica del juego. Se verifica que las piezas se comporten como se espera y que la clase Tetris (que encapsula todo lo necesario para el juego) funcione correctamente.

Para ejecutar las pruebas, utilice el siguiente comando:

```
npm run test
```

### Server

Para configurar el servidor, utilicé AWS, aprovechando los servicios de Lambda y DynamoDB. Lambda gestiona la lógica del servidor sin necesidad de mantener infraestructura, mientras que DynamoDB se encarga de almacenar los datos de los usuarios registrados para jugar.

### ReCaptcha
Utilicé esta tecnología para prevenir el registro de usuarios no deseados y proteger el sistema contra bots y spam. Esta medida se aplica en todos los momentos en los que se requiere solicitar información al servidor.

## Tecnologías utilizadas

- React
- CSS
- Typescript
- Jest

## Estructura

```
Tetris
├─ .eslintrc.cjs
├─ README.md
├─ index.html
├─ jest.config.js
├─ package-lock.json
├─ package.json
├─ public
│  └─ piece.png
├─ src
│  ├─ App.tsx
│  ├─ assets
│  │  └─ style
│  │     ├─ board.css
│  │     ├─ config.css
│  │     ├─ controller.css
│  │     ├─ creditsAndTechnologies.css
│  │     ├─ fade.css
│  │     ├─ game.css
│  │     ├─ home.css
│  │     ├─ index.css
│  │     ├─ information.css
│  │     ├─ login.css
│  │     ├─ lose.css
│  │     ├─ nextPiece.css
│  │     ├─ nextPieces.css
│  │     ├─ pause.css
│  │     ├─ register.css
│  │     ├─ table.css
│  │     ├─ tetromino.css
│  │     └─ transition.css
│  ├─ component
│  │  ├─ Board.tsx
│  │  ├─ Button.tsx
│  │  ├─ Cell.tsx
│  │  ├─ Controllers.tsx
│  │  ├─ Dificults.tsx
│  │  ├─ ErrorMsg.tsx
│  │  ├─ Fade.tsx
│  │  ├─ Form.tsx
│  │  ├─ FormLogin.tsx
│  │  ├─ FormRegister.tsx
│  │  ├─ FormValidate.tsx
│  │  ├─ GoRegister.tsx
│  │  ├─ HomeBtns.tsx
│  │  ├─ Information.tsx
│  │  ├─ Input.tsx
│  │  ├─ Label.tsx
│  │  ├─ Lose.tsx
│  │  ├─ LoseMainContent.tsx
│  │  ├─ LoseValidateContent.tsx
│  │  ├─ NextPiece.tsx
│  │  ├─ NextPieces.tsx
│  │  ├─ NumberAnimation.tsx
│  │  ├─ OkMsg.tsx
│  │  ├─ Pause.tsx
│  │  ├─ Scores.tsx
│  │  ├─ Screen.tsx
│  │  ├─ TextController.tsx
│  │  ├─ TextRules.tsx
│  │  ├─ Transition.tsx
│  │  ├─ User.tsx
│  │  ├─ UserTable.tsx
│  │  └─ Validate.tsx
│  ├─ context
│  │  ├─ ConfigContext.tsx
│  │  ├─ ScreenContext.tsx
│  │  └─ UserContext.tsx
│  ├─ gameLogic
│  │  ├─ boardController.ts
│  │  ├─ piece.ts
│  │  ├─ pieceFactory.ts
│  │  ├─ tetris.ts
│  │  ├─ tetromino.ts
│  │  └─ utils
│  │     ├─ shape
│  │     │  ├─ I.ts
│  │     │  ├─ J.ts
│  │     │  ├─ L.ts
│  │     │  ├─ O.ts
│  │     │  ├─ S.ts
│  │     │  ├─ T.ts
│  │     │  └─ Z.ts
│  │     ├─ tetromino
│  │     │  ├─ I.ts
│  │     │  ├─ J.ts
│  │     │  ├─ L.ts
│  │     │  ├─ O.ts
│  │     │  ├─ S.ts
│  │     │  ├─ T.ts
│  │     │  └─ Z.ts
│  │     └─ type
│  │        └─ type.ts
│  ├─ hook
│  │  ├─ useFetch.tsx
│  │  ├─ usePause.tsx
│  │  └─ useTetris.tsx
│  ├─ main.tsx
│  ├─ screens
│  │  ├─ Config.tsx
│  │  ├─ CreditsAndTechnologies.tsx
│  │  ├─ Game.tsx
│  │  ├─ Home.tsx
│  │  ├─ Loading.tsx
│  │  ├─ Login.tsx
│  │  ├─ Register.tsx
│  │  └─ Table.tsx
│  ├─ tests
│  │  └─ tetris.test.ts
│  ├─ type
│  │  └─ type.ts
│  ├─ utils
│  │  ├─ calculateTotalScore.ts
│  │  ├─ delay.ts
│  │  └─ method.ts
│  └─ vite-env.d.ts
├─ tsconfig.json
├─ tsconfig.node.json
└─ vite.config.ts

```

## Instalación

Antes de descargar o clonar el repositorio es necesario que usted instale Node (https://nodejs.org/en). </br>
Una vez descargado o clonado el repositorio, abra la terminal en la ruta donde se encuentra el proyecto y escriba el siguiente comando.

```
npm i
```

Esto instalara las dependencias que necesite el proyecto

## Uso

En caso de haber seguido los pasos de la instalación solo debe ejecutar el siguiente comando:

```
npm run dev
```

y dirigirse a la dirección que se muestra en consola

Para poder correr los test escriba el siguiente comando:

```
npm run test
```

En caso de querer probar el proyecto en linea, puede visitar el siguiente link: https://creative-rugelach-4f2db2.netlify.app
