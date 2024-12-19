# Usar la imagen base de Node.js
FROM node:20-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de dependencias
COPY package.json ./

# Instalar dependencias
RUN yarn install

# Copiar el código fuente
COPY . .

# Generar el cliente de Prisma
RUN yarn prisma:generate

# Compilar la aplicación
RUN yarn build

# Exponer el puerto que usa la aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["yarn", "start:prod"]
