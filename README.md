# Prueba Hirings Double V Partners 

_Desarrollo de una app que permite crear, editar, y recuperar un tiket de una base de datos._
_esta app esta desarrollada en **Node.js**, con una interfaz trabajada en **Bootstrap** modificado en sass y usando **Mysql** como_
_base de datos._ 
_Mi interes es dar a conocer mi trabajo esperando que sea de interes para ustedes y el perfil que puedan solicitar 😊_


### Pre-requisitos 📋

```
Node.js instalado
Mysql
```

### Instalación 🔧

_Crear la base de datos en **Mysql** con ayuda del archivo **bd_tikets_dump.sql** suministrado en el_ 
_repositorio el cual creara las tablas y tambien ingresara registros en la tabla tikets y en el usuario_
_administrador de la app._
_La app accedera a la base de datos con la siguiente configuracion_

```
host: "localhost",
user: "root",
password: "admin",
database: "bd_tikets",
```

_Abrir el repositorio en un editor de codigo (yo uso visual estudio) y teniendo ya instalado_
_Node.js ejecutar_

```
npm run dev
```

_Esto iniciara un servidor el cual se podra ejecutar en el navegador ingresando_

```
http://localhost:8080/
```

_A partir de este momento se podra acceder a la app y realizar las respectivas pruebas segun requisitos_

## Ejecutando las pruebas ⚙️

# Página principal

* La pagina inicial de la app consta de un buscador y una tabla en donde se muestran todas las entradas (5 primeras) 
* Si hay mas de 5 entradas en la tabla se puede navegar a traves de ellas con los botones **anterior**, **siguiente**
* Para iniciar una busqueda se el **selector** ofrece tres metodos (por el id, por el nombre, por el estado del tiket)
* Una vez establecido el selector ingresar una busqueda en el capo de texto luego dar click al boton **buscar**
* La app filtrará la busqueda y mostrara los resultados en la misma tabla
* Para ver los detalles de cada tiket, dar click en su respectivo enlace en la columna **id_tiket**

# inicio de sesion Administrador

* Para poder editar, crear y borrar tikets es necesario iniciar sesion dando click en el boton **inicio de admin** en la
  barra de navegacion de la parte superior
* Lo anterior redireccionara a la pagina inicio en donde se debe ingresar las siguientes credenciales
  **correo:** admin@email.com
  **contraseña:** 123

# Página Inicio Administrador

* Es muy similar a la pagina de inicio pero esta cuenta con una columna que le permite ver-editar y eliminar cada tiket
* ver-editar redirecciona a su pagina donde podra editar los campos de estado y asunto. **Tener en cuenta que tanto la fecha de**
  **creacion como la fecha de actualizacion, se genera automáticamente con la del servidor en la creacion del tiket. Con cada edicion del tiket**
  **creado la fecha de actualizacion se actualiza automaticamente con la del servidor**
* Para eliminar un tiket, dar click en el enlace **eliminar** el cual mostrara una pequeña ventana solicitando una confirmación
* Para agregar un tiket existe un boton de color verde abajo de la tabla el cual redirecciona a su respectiva pagina
* Aqui se puede crear el nuevo tiket ingresando el nombre del usuario y el asunto y se creara dando click al boton **crear tiket**
* Los tikets son mostrados por orden de fecha de actualizacion del mas reciente al mas viejo

## Construido con 🛠️

* Node.js - Entorno de ejecución multiplataforma
* Mysql - Sistema de gestion de bases de datos

# Dependencias

* express - Framework de desarrollo de aplicaciones web
* body_parser - Libreria para manejar eventos POST
* ejs - Libreria para crear plantillas HTML
* express-flash - Libreria que permite mostrar mensajes en pantalla
* express-session - Libreria que almacena datos de sesion en el servidor
* mysql - Libreria que permite conectarse y gestionar una bd Mysql
* nodemo - Libreria que permite reiniciar la aplicacion automáticamente

## Autores ✒️

* **Diego Cruz** - *app completa* 

## Expresiones de Gratitud 🎁

_Agradezco mucho la oportunidad de mostrar mi trabajo, esperando mucho poder hacer parte de su equipo._

---

