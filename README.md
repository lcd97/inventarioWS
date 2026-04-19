# Sistema de Gestión de Inventario Multisucursal (SIM) #

Como solución se propueso crear un sistema de inventario donde se lleve las entradas de productos por sucursal, para que de esta manera se pueda acceder por medio de informes sobre el stock de la sucursal a buscar, de igual manera en la entidad Productos se encuentra un campo llamado stock donde se puede visualizar el stock general del producto. Esto permitirá llevar un mejor control y organización en la empresa.

Para este proyecto web se utilizó la arquitectura cliente - servidor y tecnologías como Spring-Boot de Java 17+ para el backend y Angular 21+ para el frontend, además de usar librerías de Tailwind 4.2.2 con un diseño sencillo y práctico para que la experiencia de usuario fuera cómoda en las operaciones principales.

# Organización del sistema #

El sistema está dividido entre:
 1. Sucursal: Registro de todas las sucursales de la empresa, en ella se debe agregar el nombre de la sucursal: 'Sucursal Central', dirección 'Monte de los olivos, managua', estado en caso de deshabilitar la sucursal, y un código que permita diferenciar las diferentes sucursales de la dirección ya que en una misma dirección pueden existir diferentes sucursales.

 2. Productos: Registro de los productos, en ella los campos principales tenemos SKU como código único, nombre: descripción del producto, marca: este campo no es requerido, estado para dehabilitar algún producto
 
 3. Entradas: Registro de productos por sucursal, agregando los productos que ingresaron, cantidad y precio de entrada como histórico, ademas de calcular el precio total por producto ingresado y total de entrada.

# Ejecución de proyecto localmente #

# Requerimientos básicos #
  1. Instalar Java 17+
  2. Instalar Node.js
  3. Clonar el repositorio
  4. El proyecto utiliza H2 por defecto

# Servicio API

  5. En la consola bash Windows
      - Ejecutar .\mvnw.cmd clean spring-boot:run
    Linux/Mac
      -  Ejecutar ./mvnw clean spring-boot:run
  
  La API estará disponible en: http://localhost:8080/api/entradas

# Sistema Web #

  6. En otra consola ingresa el siguiente comando para levantar el servidor
      ng serve

Con estos pasos podrás utilizar la versión del sistema en local.



