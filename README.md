# tx-converter
Transaction Converter for insight-api-bitzeny

### Node.js requirements
- tx-converter v.10.xx
- insight-api-bitzeny v0.10.xx

You need separate Node.js versions.


### Transaction Converter Service
```bash
# create new user
sudo adduser txconverter
su - txconverter
# install nvm, see https://github.com/nvm-sh/nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
source ~/.bashrc
nvm install 10
node --version
# v10.xx.x
git clone https://github.com/zenywallet/tx-converter
cd tx-converter
npm install
cp config/default-sample.json5 config/default.json5
node index.js
```

### Launch insight
```bash
# login another account for insight
node --version
# v0.10.xx
TXCONVERTER_URL="http://localhost:4000/api/tx/" INSIGHT_FORCE_RPC_SYNC=1 INSIGHT_PUBLIC_PATH=public BITCOIND_USER=user BITCOIND_PASS=password INSIGHT_NETWORK=livenet INSIGHT_PORT=3000 node ../insight-api-bitzeny/insight.js
```

### References
- https://github.com/BitzenyCoreDevelopers/insight-api-bitzeny
- https://github.com/BitzenyCoreDevelopers/insight-ui-bitzeny
- https://github.com/zenywallet/insight-ui-bitzeny
- https://github.com/zenywallet/bitcoinjs-lib
