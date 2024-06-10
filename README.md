# TODO APP

Este proyecto es una aplicación web simple que consiste en una API desarrollada en .NET y una interfaz de usuario construida con React. Permite administrar tareas pendientes.

## Clonar el Repositorio

Para clonar este repositorio a tu máquina local, utiliza el siguiente comando:

```bash
git clone https://github.com/xCrisFlores/Prueba_tecnica
```

## Crear la base de datos

Antes de preparar la aplicacion se debe tener la base de datos en mariaDB, puedes ejecutar el comando tasks.sql en tu CLI o bien puedes copiarlo de aqui:

```bash
CREATE DATABASE IF NOT EXISTS tasks;

USE tasks;

CREATE TABLE tasks (
    id TINYINT(4) PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    isCompleted TINYINT(1),
    createdAt DATETIME 
);

```

## Instalar Dependencias

El proyecto está dividido en dos partes: `todo_api` (API .NET) y `todo_front` (Interfaz de usuario React). Para instalar las dependencias de cada parte, sigue estos pasos:

### API .NET (todo_api)

1. Abre una terminal en la carpeta `todo_api`.
2. Ejecuta el siguiente comando para restaurar las dependencias:

```bash
dotnet restore
```

### Interfaz de Usuario React (todo_front)

1. Abre una terminal en la carpeta `todo_front`.
2. Ejecuta el siguiente comando para instalar las dependencias:

```bash
npm install
```

## Ejecutar la Aplicación

Una vez que hayas clonado el repositorio y hayas instalado las dependencias, puedes ejecutar la aplicación. Sigue estos pasos:

### API .NET (todo_api)

1. Abre una terminal en la carpeta `todo_api`.
2. Ejecuta los siguientes comandos para iniciar la aplicación:

```bash
dotnet build
dotnet run
```

La API estará disponible en `http://localhost:5074`.

### Interfaz de Usuario React (todo_front)

1. Abre una terminal en la carpeta `todo_front`.
2. Ejecuta el siguiente comando para iniciar la aplicación:

```bash
npm start
```

La interfaz de usuario estará disponible en `http://localhost:3000`.

## Dependencias del Proyecto

El proyecto .NET utiliza las siguientes dependencias:

- Microsoft.EntityFrameworkCore.Design v8.0.0
- Microsoft.EntityFrameworkCore.SqlServer v8.0.0
- Microsoft.OpenApi v1.6.14
- MySql.Data.EntityFrameworkCore v8.0.22
- Swashbuckle.AspNetCore v6.6.2
- Pomelo.EntityFrameworkCore.MySql v8.0.2


