// importando as dependencias
const bip32 = require ('bip32')
const bip39 = require('bip39')
const bitcoin = require ('bitcoinjs-lib')


// definir a rede
const network = bitcoin.networks.testnet


// caminho de deviração - derivação de carteiras HD
const path = `m/49'/1'/0'/0`

// gerar o mnemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando uma conta - par de pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// gerando o endereço 
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address


// escrever dados gerados na carteira
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)