### Crypto Dashboard
A dashboard to view the latest prices of top crypto currencies.

##### Installation
Step 1 : Clone this repository
```sh
git clone git@github.com:vjrngn/crypto-dashboard.git
```

Step 2 : Navigate to the project
```sh
cd crypto-dashboard
```

Step 3 : Install Dependencies
```sh
npm install
```
or
```sh
yarn
```

##### Usage
Step 1 : Create a `.env` file at the **root of the project** using the `.env.example` file as a reference
```sh
cp .env.example .env
```

Step 2 : Populate the values in the `.env` file with your API credentials
```sh
API_KEY="your-key-here"
API_BASE="https://pro-api.coinmarketcap.com/v1/cryptocurrency"
```

Step 3 : Start the dev server
```sh
npm run dev
```
or
```sh
yarn run dev
```