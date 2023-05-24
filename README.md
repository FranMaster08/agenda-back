# API de Contactos - Documentación

¡Bienvenido al repositorio de la API de Contactos de Francisco Javier Jimenez Cohen! En esta documentación encontrarás información sobre la API y las tecnologías utilizadas en el desarrollo de este proyecto.

## Descripción de la API

La API de Contactos es una aplicación que permite gestionar contactos, incluyendo información personal, números de teléfono y direcciones. Proporciona operaciones para crear, obtener, buscar, editar y eliminar contactos.

## Tecnologías utilizadas

- NestJS
- TypeORM
- MySQL
- Docker
- Swagger

## Configuración del entorno

Antes de comenzar a utilizar la API de Contactos, asegúrate de tener las siguientes configuraciones en tu entorno de desarrollo:

- Archivo `.env`: Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

```
DB_HOST
DB_PORT=3306
DB_USERNAME
DB_PASSWORD
DB_DATABASE
PORT=3000
MYSQL_ROOT_PASSWORD
MYSQL_PASSWORD
MYSQL_DATABASE=agenda
MYSQL_USER=fran
```

Asegúrate de proporcionar los valores adecuados para cada variable de entorno, como el host de la base de datos, el puerto, el nombre de usuario y la contraseña.

## Inicio del proyecto

Para comenzar a utilizar la API de Contactos, sigue los siguientes pasos:

1. Asegúrate de tener Docker instalado en tu sistema.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta el siguiente comando: `docker-compose up`.

Esto iniciará el proyecto y configurará el entorno de desarrollo necesario, incluyendo la base de datos MySQL.

Una vez que el proyecto esté en ejecución, podrás acceder a la API a través de la siguiente dirección: `http://localhost:{puerto}/api`, donde `{puerto}` es el valor especificado en el archivo `.env` para la variable `PORT`.

## Endpoints

La API de Contactos expone los siguientes endpoints:

- **POST /contact**: Crea un nuevo contacto.
- **GET /contact/email/{email}**: Obtiene un contacto por su dirección de correo electrónico.
- **GET /contact/search?searchTerm={searchTerm}**: Busca contactos por término de búsqueda.
- **GET /contact/phone/{phoneNumber}**: Obtiene un contacto por número de teléfono.
- **PUT /contact/{contactId}**: Actualiza los datos de un contacto existente.
- **DELETE /contact/{contactId}**: Elimina un contacto.

Recuerda reemplazar `{email}`, `{searchTerm}`, `{phoneNumber}` y `{contactId}` con los valores adecuados en las URL de los endpoints.

¡Gracias por visitar este repositorio! Si tienes alguna pregunta o necesitas más detalles sobre el funcionamiento de la API, no dudes en consultarlo en la sección correspondiente.