window.config = {
  reward_token_address: '0x692eb773e0b5b7a79efac5a015c8b36a2577f65c', //MLO FLOW TOKEN ADDRESS
//   token_lp_address: '0xE32479d25b6Cb8c02507c3568813E11A37fa32CA', //MLO UNISWAP ETH FLOW ADDRESS
//   vault_lp_address: '0xb1A6Cd21eEA237b2185Bc33b4fB2BED0a4EaF68E', //MLO FARM.SOL ETH FLOW FARMING CONTRACT
//   token_lp_desh_address: '0x01A388530083e69fd0B60353C90d8bF2B29be2E7', //MLO UNISWAP FLUID FLOW ADDRESS
  vault_lp_desh_address: '0xe8Ea3d066510fDfaCE8D0c9f361b25Dce3E804f8', //MLO FARM FLUID FLOW FARMING CONTRACT
  etherscan_baseURL: 'https://bscscan.io',
  token_decimals: 18,
  default_gasprice_gwei: 100,
  default_gas_amount: 300000,

  the_graph_api: {
    flow_token_address: '0x692eb773e0b5b7a79efac5a015c8b36a2577f65c', //MLO FLOW TOKEN ADDRESS
    desh_token_address: '0x95ba34760ac3d7fbe98ee8b2ab33b4f1a6d18878', //MLO FLUID TOKEN
    eth_pair_address: '0xe32479d25b6cb8c02507c3568813e11a37fa32ca', //MLO UNISWAP ETH FLOW ADDRESS
    desh_pair_address: '0x01A388530083e69fd0B60353C90d8bF2B29be2E7', //MLO UNISWAP FLUID FLOW ADDRESS
    vault_lp_desh_address: '0xe8Ea3d066510fDfaCE8D0c9f361b25Dce3E804f8', //MLO FARM FLUID FLOW FARMING CONTRACT
    vault_lp_eth_address: '0xb1a6cd21eea237b2185bc33b4fb2bed0a4eaf68e', //MLO FARM.SOL ETH FLOW FARMING CONTRACT
  },
};

Object.keys(window.config.the_graph_api).forEach((k) => {
  window.config.the_graph_api[k] = window.config.the_graph_api[k].toLowerCase();
});

window.VAULT_PRO_RATA_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RewardsDisbursed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'holder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'RewardsTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'addContractBalance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adminCanClaimAfter',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adminClaimableTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'cliffTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractDeployTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountToDeposit',
        type: 'uint256',
      },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'depositTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'depositedTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'disburseAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'disburseDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'disbursePercentX100',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'disburseTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountToWithdraw',
        type: 'uint256',
      },
    ],
    name: 'emergencyWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'startIndex',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endIndex',
        type: 'uint256',
      },
    ],
    name: 'getDepositorsList',
    outputs: [
      {
        internalType: 'address[]',
        name: 'stakers',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'stakingTimestamps',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'lastClaimedTimeStamps',
        type: 'uint256[]',
      },
      {
        internalType: 'uint256[]',
        name: 'stakedTokens',
        type: 'uint256[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_holder',
        type: 'address',
      },
    ],
    name: 'getEstimatedPendingDivs',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getNumberOfHolders',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPendingDisbursement',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_holder',
        type: 'address',
      },
    ],
    name: 'getPendingDivs',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'lastClaimedTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lastDisburseTime',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'lastDivPoints',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalClaimedRewards',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalDivPoints',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'totalEarnedTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalTokensDisbursed',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transferAnyERC20Token',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_tokenAddr',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'transferAnyOldERC20Token',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'trustedDepositTokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'trustedRewardTokenAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amountToWithdraw',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
window.VAULT_LP_ABI = window.VAULT_PRO_RATA_ABI;
window.VAULT_LP_FLUID_ABI = window.VAULT_PRO_RATA_ABI;

window.TOKEN_ABI = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      { indexed: true, internalType: 'address', name: '_to', type: 'address' },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_owner', type: 'address' },
      { internalType: 'address', name: '_spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: 'remaining', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_spender', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: 'balance', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address payable', name: '_newOwner', type: 'address' },
    ],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
window.REWARD_TOKEN_ABI = window.TOKEN_ABI;
window.TOKEN_LP_ABI = window.TOKEN_ABI;
window.TOKEN_LP_FLUID_ABI = window.TOKEN_ABI;

window.cached_contracts = {};

// function to connect metamask
async function connectWallet() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
      console.log('Connected!');
      return true;
    } catch (e) {
      console.error(e);
      throw new Error('User denied wallet connection!');
    }
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    console.log('connected to old web3');
    return true;
  } else {
    throw new Error('No web3 detected!');
  }
}

async function getContract(key) {
  let ABI = window[key + '_ABI'];
  let address = window.config[key.toLowerCase() + '_address'];
  if (!window.cached_contracts[key]) {
    window.cached_contracts[key] = new window.web3.eth.Contract(ABI, address, {
      from: await window.web3.eth.getCoinbase(),
    });
  }

  return window.cached_contracts[key];
}

// user's metamask main address
function getCoinbase() {
  return window.web3.eth.getCoinbase();
}
class TOKEN {
  constructor(ticker = 'REWARD_TOKEN') {
    this.ticker = ticker;
    let address = window.config[ticker.toLowerCase() + '_address'];
    this._address = address;
  }
  async transfer(to, amount) {
    let contract = await getContract(this.ticker);
    return await contract.methods
      .transfer(to, amount)
      .send({
        gas: window.config.default_gas_amount,
        from: await window.web3.eth.getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      });
  }
  async totalSupply() {
    let contract = await getContract(this.ticker);
    return await contract.methods.totalSupply().call();
  }
  async approve(spender, amount) {
    let contract = await getContract(this.ticker);
    return await contract.methods
      .approve(spender, amount)
      .send({
        gas: window.config.default_gas_amount,
        from: await getCoinbase(),
        gasPrice: window.config.default_gasprice_gwei * 1e9,
      });
  }
  async balanceOf(address) {
    let contract = await getContract(this.ticker);
    return await contract.methods.balanceOf(address).call();
  }
}

class VAULT_PRO_RATA {
  constructor(ticker = 'VAULT_LP', token = 'TOKEN_LP') {
    this.ticker = ticker;
    let address = window.config[ticker.toLowerCase() + '_address'];
    this._address = address;
    this.token = token;
    [
      'owner',
      'depositedTokens',
      'depositTime',
      'lastClaimedTime',
      'totalEarnedTokens',
      'getPendingDivs',
      'getEstimatedPendingDivs',
      'getNumberOfHolders',
      'getDepositorsList',
      'totalTokens',
    ].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract(ticker);
        return await contract.methods[fn_name](...args).call();
      };
    });

    ['withdraw', 'deposit', 'emergencyWithdraw', 'claim'].forEach((fn_name) => {
      this[fn_name] = async function (...args) {
        let contract = await getContract(ticker);
        return await contract.methods[fn_name](...args).send({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        });
      };
    });
  }
  exit = async (e) => {
    e && e.preventDefault && e.preventDefault();
    let depositedTokens = await this.depositedTokens(await getCoinbase());
    return this.withdraw(depositedTokens);
  };

  async depositTOKEN(amount) {
    let token_contract = await getContract(this.token);
    let vault_contract = await getContract(this.ticker);
    let batch = new window.web3.eth.BatchRequest();
    batch.add(
      token_contract.methods
        .approve(vault_contract._address, amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    batch.add(
      vault_contract.methods
        .deposit(amount)
        .send.request({
          gas: window.config.default_gas_amount,
          from: await getCoinbase(),
          gasPrice: window.config.default_gasprice_gwei * 1e9,
        })
    );
    return batch.execute();
  }
}

window.reward_token = new TOKEN();
window.token_lp = new TOKEN('TOKEN_LP');
window.vault_lp = new VAULT_PRO_RATA();
window.token_lp_desh = new TOKEN('TOKEN_LP_FLUID');
window.vault_lp_desh = new VAULT_PRO_RATA('VAULT_LP_FLUID', 'TOKEN_LP_FLUID');
