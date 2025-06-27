FROM node:14

WORKDIR /app

# Copia sólo package.json y package-lock.json (si existe)
COPY package.json package-lock.json* ./

# Instala dependencias (esto compila módulos nativos para Linux)
RUN npm install

# Copia el resto del código
COPY . .

EXPOSE 4001

CMD ["node", "index.js"]
