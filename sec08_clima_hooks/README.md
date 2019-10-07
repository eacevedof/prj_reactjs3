# 8. PROYECTO Aplicación del Clima con React Hooks

## 1. El Proyecto que construiremos
- Demo app clima
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1153x570/a5a02b979f75836a5556791f563e7d12/image.png)

## 2. Que son los React Hooks y Preguntas Frecuentes
- Disponibles desde la v16.8
- Podremos actualizar el State sin necesidad de crear un **Class Component**
- La cantidad de código es menor
- función **usestate**: `import React, {useState} from "react"`
- la función consta de dos partes:
  - `const [clientes, guardarCliente] = useState([])`
  - clientes = Tiene el state actual
  - guardarClientes = Cambia el state
- Preguntas frecuentes:
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1169x659/1a3aabd5eb177e58d88fae080cbdd8c9/image.png)
  - ![](https://trello-attachments.s3.amazonaws.com/5d7fef6652faf333827e91c3/1146x664/6fe631540ef0bc198d8a7dc5bc57a06b/image.png)
- Beneficios reales de los hooks:
  - Menor cantidad de código
  - Mayor facilidad para implementar reducers
  - Administrar el state y context
- Los Hooks se dividen en **2 grupos**:
  - **Básicos**: useState, useEffect
  - **Avanzados**: useContext, useRef, useReducer, useCallback, useMemo

## 3. Creando la App y Primeros Ajustes
- `create-react-app climareact`
- [gist - css y materialize](https://gist.github.com/juanpablogdl/9ad7b55fb821df1dd32209cacc9c90a7)
- [API - Openweathermap](https://openweathermap.org/)
  - [Acceso](https://trello.com/c/q12tzhCa/123-openweathermaporg)
- [Openweathermap - apikeys](https://home.openweathermap.org/api_keys)
## 4. Creando el Header
- 
```js
```
## 5. Creando el Formulario
- 
```js
```
## 6. Colocando los valores del formulario en el state
- 
```js
```
## 7. Validando el Formulario
- 
```js
```
## 8. Mostrar el Error de la validación
- 
```js
```
## 9. Creando la función para consultar la API
- 
```js
```
## 10. Mostrando el Resultado del Clima
- 
```js
```
