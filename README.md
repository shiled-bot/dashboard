# shield-bot-dashboard

Discord bot web dashboard with MERN stack

### Create .env file

store your MongoDB database credentials

```
DB_URI = mongodb+srv://<username>:<password>@cluster0.6m5cz.mongodb.net/botlist
```

json web token secret

```
JWT_SECRET = my-32-character-ultra-secure-and-ultra-long-secret
```

```
CLIENT_ORIGIN =
BOT_ID = 
BOT_SECRET = 
BOT_TOKEN =
```
`CLIENT_ORIGIN`: client origin url

`BOT_ID`: your discord app client id

`BOT_SECRET`: your discord app client secret

![preview](https://i.postimg.cc/K8tVxHF8/Screenshot-2022-02-20-162158.png)

`BOT_TOKEN`: the access token for your discord bot

### Install modules

```bash
npm install
```

```bash
npm install --dev
```

```bash
cd ./client && npm install
```

```bash
cd ./client && npm install --dev
```

### Run app

```bash
npm run dev
```