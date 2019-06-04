var opts = require('config');
var rpc = require('bitcoin');
var bitcoin = require('bitcoinjs-lib');
var express = require('express');
var client = new rpc.Client(opts.rpc);
var network = bitcoin.networks[opts.target_network];

function get_script_addresses(script, network) {
    try {
        var address = bitcoin.address.fromOutputScript(script, network);
        return [address];
    } catch(ex) {}

    var addresses = [];
    var chunks = bitcoin.script.decompile(script);
    for(var k in chunks) {
        var chunk = chunks[k];
        if(Buffer.isBuffer(chunk) && chunk.length !== 1) {
            try {
                var address = bitcoin.payments.p2pkh({ pubkey: chunk, network: network }).address;
                addresses.push(address);
            } catch(ex) {}
        }
    }
    if(addresses.length > 0) {
        return addresses;
    }
    return null;
}

var app = express();

app.get('/api/tx/:txid', async function(req, res) {
    var txid = req.params.txid;
    client.getRawTransaction(txid, 1, function(err, rawtx, resHeaders) {
        if(err) {
            console.log(err);
            console.log(txid);
            res.json({err: err});
            return;
        }

        var upgrade_flag = 0;
        for(var i in rawtx.vout) {
            var v = rawtx.vout[i];
            if(v.scriptPubKey && !v.scriptPubKey.addresses) {
                upgrade_flag = 1;
                break;
            }
        }

        if(upgrade_flag) {
            var txobj = bitcoin.Transaction.fromHex(rawtx.hex);
            for(var i in txobj.outs) {
                var v = rawtx.vout[i];
                if(!v.scriptPubKey.addresses) {
                    var addrs = get_script_addresses(txobj.outs[i].script, network);
                    if(addrs != null) {
                        v.scriptPubKey.addresses = addrs;
                    }
                }
            }
        }

        res.json({err: 0, res: rawtx});
    });
});

app.listen(opts.server.http_port);
