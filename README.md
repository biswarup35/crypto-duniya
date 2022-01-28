<div align="center">
<img  src="src/images/logo_readme.png" >
</div>
<h2 align="center">Crypto Duniya</h2>

<h3>Description</h3>
<p>Crypto Duniya is a financial app espcially build for <em>Crypto Enthusiasts</em>.</p>
<p>This app lets you view live Cryptocurrency stats, market cap and supply. Apart form stats it lets you view top 20 exchanges for a specific crypto currency. Even more, it also lets you get all the crypto currency news in one place.</p>

> Note: Currency data provided by <a href="https://rapidapi.com/Coinranking/api/coinranking1/" rel="noreferrer">Coinranking</a> thugh RapidAPI.

> And the news data provided by <a href="https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1/">Bing News Search</a> through RapidAPI.

<hr/>
<h3>Tech Stack</h3>
<div>
<img src="https://img.shields.io/badge/-React.js-blue?logo=react&logoColor=&style=for-the-badge" alt="React.js"/>
<img src="https://img.shields.io/badge/-MUI-white?logo=mui&logoColor=&style=for-the-badge" alt="Material ui"/>
<img src="https://img.shields.io/badge/-Redux-black?logo=redux&logoColor=&style=for-the-badge" alt="Redux"/>
<img src="https://img.shields.io/badge/-React Sparklines-green?logo=&logoColor=&style=for-the-badge" alt="React Sparklines"/>
<img src="https://img.shields.io/badge/-Moment.js-black?logo=moment.js&logoColor=&style=for-the-badge" alt="Moment"/>
<img src="https://img.shields.io/badge/Millify-yellow?logo=millify&logoColor=&style=for-the-badge" alt="Millify"/>
<img src="https://img.shields.io/badge/Htmal React parser-pink?logo=millify&logoColor=&style=for-the-badge" alt="Html-react-parser"/>
<img src="https://img.shields.io/badge/-TypeScript-white?logo=typescript&logoColor=&style=for-the-badge" alt="Html-react-parser"/>
</div>

<h3>Project</h3>

Deployed on Netlify

[![Netlify Status](https://api.netlify.com/api/v1/badges/d5713647-f8bc-45cd-8e83-40f77a9440da/deploy-status)](https://app.netlify.com/sites/crypto-duniya/deploys)

<h4>Run locally:</h4>

<p>Either Clone the repo or <a href="https://github.com/login?return_to=%2Fbiswarup35%2Fcrypto-duniya">fork</a> it</p>

<p>After clone/fork the repo you need to follow these steps:</p>

- Create `.env.local` file at the root directory of the project.
- Then copy the below code and paste it in the `.env.local` file.

```
//.env.local

REACT_APP_API_KEY="your RapidApi key"
REACT_APP_CRYPTO_API_BASE_URL=https://coinranking1.p.rapidapi.com
REACT_APP_CRYPTO_API_HOST=coinranking1.p.rapidapi.com

REACT_APP_NEWS_API_BASE_URL=https://bing-news-search1.p.rapidapi.com
REACT_APP_NEWS_API_HOST=bing-news-search1.p.rapidapi.com
```

- Assign your RapidAPI key on the `REACT_APP_API_KEY` variable.

> Note: You need to susbcribe to these two API's <br> > <a href="https://rapidapi.com/Coinranking/api/coinranking1/" rel="noreferrer">Coinranking</a>, and <a href="https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/bing-news-search1/">Bing News Search</a>

<p>After that you have to download the dependencies, for that run this command:</p>

```bash
yarn install
```

<p>To run the project in development mode, run this command:</p>

```bash
yarn start
```

<p>For build:</p>

```bash
yarn build
```

<hr>

<h3>Internals</h3>
<h4>The coinranking API:</h4>
<p>The whole project is build around a single endpoin of this API, since other endpoins requires <em>premium subscription</em> I decide to go with <code>coinranking1.p.rapidapi.com/coins</code> endpoint its free and it covers the whole project.</p>

```js
//coinranking1.p.rapidapi.com/coins
const {
  data: {
    stats: {}, // This object includes the global stats of the Cryptocurrencies
    coins: [], // This array include all the coins and its details
  },
} = data;
```

```js
//coinranking1.p.rapidapi.com/coin/:uuid
const {
  data: {
    coin: {}, // This object include all the information of a coin(uuid), for example name, price, icon, rank, description etc
  },
} = data;
```

```js
//coinranking1.p.rapidapi.com/coin/:uuid/history?timePeriod=24h
const {
  data: {
    history: [], // This array includes a sparkline data of given time period(3h|24h|3d|7d etc).
  },
} = data;
```

```js
//coinranking1.p.rapidapi.com/coin/:uuid/exchanges
const {
  data: {
    exchanges: [], // This array includes all the market place to exchange a currency(uuid)
  },
} = data;
```
