# tx-converter
Transaction Converter for insight-api-bitzeny

## Transaction Converter Service
```bash
npm install
cp config/default-sample.json5 config/default.json5
node index.js
```

## Launch insight
```bash
TXCONVERTER_URL="http://localhost:4000/api/tx/" INSIGHT_FORCE_RPC_SYNC=1 INSIGHT_PUBLIC_PATH=public BITCOIND_USER=user BITCOIND_PASS=password INSIGHT_NETWORK=livenet INSIGHT_PORT=3000 node ../insight-api-bitzeny/insight.js
```

## References
- https://github.com/BitzenyCoreDevelopers/insight-api-bitzeny
- https://github.com/BitzenyCoreDevelopers/insight-ui-bitzeny
- https://github.com/zenywallet/insight-ui-bitzeny
- https://github.com/zenywallet/bitcoinjs-lib
