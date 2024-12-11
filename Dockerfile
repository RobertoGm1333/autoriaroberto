FROM node:18

# Establecer el directorio de trabajo
WORKDIR /front-1-trimestre-2-daw

# Copiar los archivos necesarios
COPY package.json package-lock.json ./
RUN npm install --production

# Copiar todos los archivos del proyecto
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Ejecutar el servidor
CMD ["node", "build/js/server.js"]

