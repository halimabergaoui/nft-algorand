// NOTICE: This config provides sample accounts.
// DON'T use these accounts in any public environment because everyone can see and use them.
// The private keys of these accounts are visible to everyone.
// This means that they can spend the funds and assets.

/**
   Check our /docs/algob-config.md documentation for more ways how to
   load a private keys.
*/

const { mkAccounts } = require("@algo-builder/algob");
let accounts = mkAccounts([
  {
    name: "master-account",
    // This account is created using `make setup-master-account` command from our
    // `/infrastructure` directory.
    // It is used in all our examples to setup and fund other accounts (so it must posses ALGOs).
    // If you don't want an account with this address (can check that by running
    // `goal account list -d $ALGORAND_DATA`) then change it to other account you control.
    //addr: "WWYNX3TKQYVEREVSW6QQP3SXSFOCE3SKUSEIVJ7YAGUPEACNI5UGI4DZCE",
    // To export a mnemonic you may use the following command:
    // goal account export -a "your_account_address" -d $ALGORAND_DATA
    //mnemonic: "enforce drive foster uniform cradle tired win arrow wasp melt cattle chronic sport dinosaur announce shell correct shed amused dismiss mother jazz task above hospital"
    addr: "IUGB7FKFENXH5M5D7YE4DCRYW4MSPRT6JQ4K4YRD2MAPE5YRHIVMMB7BYE",
    mnemonic: "rain lizard path piece broom delay olive nothing visit whip valid mushroom joke increase lock mango tip time cradle cook minimum sorry pledge ability crisp"
  
  },
  // Following accounts are generated using `algob gen-accounts`.
  {
    name: "elon-musk",
    addr: "WHVQXVVCQAD7WX3HHFKNVUL3MOANX3BYXXMEEJEJWOZNRXJNTN7LTNPSTY",
    mnemonic: "resist derive table space jealous person pink ankle hint venture manual spawn move harbor flip cigar copy throw swap night series hybrid chest absent art"
  }, {
    name: "john",
    addr: "7PBVBHQBKXWRPC7PTT56EBLOOB46EXDG7UCTFS7IP7IYW5P3QSICI6WT6M",
    mnemonic: "excess essence dolphin this neither leisure radar twin plug expire culture force citizen balcony region toast amused submit into frost farm whisper episode able donate"
  }, {
    name: "alice",
    addr: "EDXG4GGBEHFLNX6A7FGT3F6Z3TQGIU6WVVJNOXGYLVNTLWDOCEJJ35LWJY",
    mnemonic: "brand globe reason guess allow wear roof leisure season coin own pen duck worth virus silk jazz pitch behave jazz leisure pave unveil absorb kick"
  }, {
    name: "bob",
    addr: "2ILRL5YU3FZ4JDQZQVXEZUYKEWF7IEIGRRCPCMI36VKSGDMAS6FHSBXZDQ",
    mnemonic: "caution fuel omit buzz six unique method kiwi twist afraid monitor song leader mask bachelor siege what shiver fringe else mass hero deposit absorb tooth"
  }
]);


let defaultCfg = {
  host: "https://algorandtestnet.sqoin.us",
  port: 443,
  token: "9a68ba4c1c8d6170886092fc4cad522652fa549598df5121be0ad5c677061d41",
  // you can also load accounts from KMD, look at /docs/algob-config.md for more details.
  accounts: accounts
};

module.exports = {
  networks: {
    default: defaultCfg
  }
};
