Migraciones - añadir columna 'activo' a la tabla workers

Este repositorio incluye una migración para añadir la columna `activo` a la tabla `workers`.

Archivo:
- `backend/migrations/001-add-activo-to-workers.sql`

Contenido:
- `ALTER TABLE workers ADD COLUMN activo TINYINT(1) DEFAULT 1;`
- `UPDATE workers SET activo = 1 WHERE activo IS NULL;` (opcional)

Cómo aplicar localmente (MySQL):
1. Abrí una terminal y conectate a tu base de datos MySQL:

   mysql -u <usuario> -p <nombre_base_de_datos>

   Ejemplo:

   mysql -u root -p trakio

2. Dentro del prompt de mysql ejecutá:

   SOURCE C:/Users/48590334/Desktop/Trakio/backend/migrations/001-add-activo-to-workers.sql;

   (Asegurate de usar la ruta absoluta correcta en Windows.)

3. Verificá que la columna se agregó:

   DESCRIBE workers;

4. Reiniciá el backend si es necesario. Nodemon debería detectar el cambio automáticamente.

Si preferís, puedo crear un script npm para ejecutar la migración con `mysql` desde la línea de comandos, pero necesitarás las credenciales de la base de datos en tu entorno.
