window.isUnlocked = false
let $connectWalletBtn = $(".l-connect-wallet-btn")
$connectWalletBtn.click(handleConnection)

window.state = {
    usdPerSwiss: '',
}
function setWindowState(obj) {
    const newState = {...window.state, ...obj}
    window.state = newState
    renderStats(newState)
}

function initPool({vault_lp, token_lp, el_id_prefix='l'}) {

    const scope = {}
    scope.state = {
        token_balance: '',
        reward_token_balance: '',
        pendingDivs: '',
        estimatedPendingDivs: '',
        totalEarnedTokens: '',
        // cliffTime: '',
        depositTime: '',
        depositedTokens: '',
        lastClaimedTime: '',
        depositAmount: '',
        withdrawAmount: '',
        coinbase: '',
        stakingOwner: null,
        token_decimals: 18,
        //isInputSet: false,
    }

    function setState(obj) {
        const newState = {...scope.state, ...obj}
        scope.state = newState
        console.log({obj, newState})
        render(newState)
        renderSummary(window.state)
    }

    async function refreshBalance () {
        if (!window.isUnlocked) return;

        let coinbase = await window.getCoinbase()
        setState({coinbase})
        try {
            let _bal = token_lp.balanceOf(coinbase)
            let _rBal = reward_token.balanceOf(coinbase)
            let _pDivs = vault_lp.getPendingDivs(coinbase)
            let _epDivs = vault_lp.getEstimatedPendingDivs(coinbase)
            // let _cliffTime = vault_lp.cliffTime()
            let _tEarned = vault_lp.totalEarnedTokens(coinbase)
            let _stakingTime = vault_lp.depositTime(coinbase)
            let _dTokens = vault_lp.depositedTokens(coinbase)
            let _lClaimTime = vault_lp.lastClaimedTime(coinbase)
            let _stakers = vault_lp.getNumberOfHolders()
            let _contractBalance = token_lp.balanceOf(vault_lp._address)
            let _tTokens = vault_lp.totalTokens()


            let [token_balance, reward_token_balance, pendingDivs, estimatedPendingDivs, totalEarnedTokens, depositTime,
                depositedTokens, lastClaimedTime, stakers, contractBalance, totalTokens] = await Promise.all([_bal,_rBal ,_pDivs, _epDivs, _tEarned, _stakingTime, _dTokens, _lClaimTime, _stakers, _contractBalance, _tTokens])


            let totalStaked = (new BigNumber(contractBalance)).toString(10)
            
            /*if (!scope.state.isInputSet) {
                $depositInput.val(getFormattedNumber(token_balance/1e18, 2))
                //isInputSet: true
            }
            */
            setState({
                token_balance,
                reward_token_balance,
                pendingDivs,
                estimatedPendingDivs,
                // cliffTime,
                totalEarnedTokens,
                depositTime,
                depositedTokens,
                lastClaimedTime,
                stakers,
                totalStaked,
                totalTokens,
                //isInputSet: true
            })
            let stakingOwner = await vault_lp.owner()
            setState({stakingOwner})
        } catch (e) {
            console.error(e)
        }
    }


    let $depositInput = $(`#${el_id_prefix}-deposit-input`),
    $withdrawInput = $(`#${el_id_prefix}-withdraw-input`),
    $setMaxDepositBtn = $(`#${el_id_prefix}-set-max-deposit-btn`),
    $setMaxWithdrawBtn = $(`#${el_id_prefix}-set-max-withdraw-btn`),
    $stakeBtn = $(`#${el_id_prefix}-stake-btn`),
    $unstakeBtn = $(`#${el_id_prefix}-unstake-btn`),
    $claimBtn = $(`#${el_id_prefix}-claim-btn`),
    $exitBtn = $(`#${el_id_prefix}-exit-btn`),
    $tokenBalance = $(`#${el_id_prefix}-token-balance`),
    $tokenStaked = $(`#${el_id_prefix}-token-staked`),
    $pendingDivs = $(`#${el_id_prefix}-pending-divs`),
    $sharePercent = $(`#${el_id_prefix}-share-percent`)


    function render(state) {
        if (!window.isUnlocked) return;

        let {token_decimals: decimals} = window.config

        let {token_balance,reward_token_balance, totalStaked, totalTokens,
            pendingDivs, estimatedPendingDivs, totalEarnedTokens, depositedTokens, depositTime, coinbase, stakers, contractBalance} = state

            token_balance = new BigNumber(token_balance).div(10**decimals).toString(10)
            token_balance = getFormattedNumber(token_balance, 2)

            reward_token_balance = new BigNumber(reward_token_balance).div(10**decimals).toString(10)
            reward_token_balance = getFormattedNumber(reward_token_balance, 6)

            pendingDivs = new BigNumber(pendingDivs).div(10**decimals).toString(10)
            pendingDivs = getFormattedNumber(pendingDivs, 6)

            estimatedPendingDivs = new BigNumber(estimatedPendingDivs).div(10**decimals).toString(10)
            estimatedPendingDivs = getFormattedNumber(estimatedPendingDivs, 6)

            totalEarnedTokens = new BigNumber(totalEarnedTokens).div(10**decimals).toString(10)
            totalEarnedTokens = getFormattedNumber(totalEarnedTokens, 6)

            depositedTokens = new BigNumber(depositedTokens).div(10**decimals).toString(10)
            depositedTokens = getFormattedNumber(depositedTokens, 2)

            totalStaked = new BigNumber(totalStaked).div(1e18).toString(10)
            totalStaked = getFormattedNumber(totalStaked, 6)

            totalTokens = new BigNumber(totalTokens).div(1e18).toString(10)
            totalTokens = getFormattedNumber(totalTokens, 6)


            // contractBalance = new BigNumber(contractBalance).div(10**decimals).toString(10)
            // contractBalance = getFormattedNumber(contractBalance, 6)

            stakers = new BigNumber(stakers).toString(10)
            stakers = getFormattedNumber(stakers, 0)


            let isOwner = String(state.coinbase).toLowerCase() === String(state.stakingOwner).toLowerCase()

            let myShare = ""
            if (Number(totalTokens)) {
                myShare = ((depositedTokens/totalTokens)*100).toFixed(2)
            } else {
                myShare = (0).toFixed(2)
            }

            $tokenBalance.html(token_balance)
            $tokenStaked.html(depositedTokens)
            $pendingDivs.val(estimatedPendingDivs)
            $sharePercent.html(myShare)

            console.log({
                myShare,
                // token_balance,
                depositedTokens,
                totalTokens,
                pendingDivs,
                estimatedPendingDivs
            })
    }

    // window.addEventListener("load", () => {
        $setMaxDepositBtn.click(ifConnected(handleSetMaxDeposit))
        $setMaxWithdrawBtn.click(ifConnected(handleSetMaxWithdraw))
        $stakeBtn.click(ifConnected(handleStake))
        $unstakeBtn.click(ifConnected(handleUnstake))
        $claimBtn.click(ifConnected(handleClaim))
        $exitBtn.click(ifConnected(vault_lp.exit))

        refreshBalance()
        setInterval(refreshBalance, 3000)
    // })

    function ifConnected(fn) {
        return function(...args) {
            if (window.isUnlocked) {
                fn(...args)
            }
        }
    }

    function handleSetMaxDeposit (e) {
        e.preventDefault()
        let depositAmount = new BigNumber(scope.state.token_balance).div(10**window.config.token_decimals).toFixed(18)
        setState({depositAmount})
        $depositInput.val(depositAmount)
    }

    function handleSetMaxWithdraw (e) {
        e.preventDefault()
        let withdrawAmount = new BigNumber(scope.state.depositedTokens).div(10**window.config.token_decimals).toFixed(18)
        setState({withdrawAmount})
        $withdrawInput.val(withdrawAmount)
    }

    function handleStake(e) {
        e.preventDefault()
        let amount = $depositInput.val()
        amount = new BigNumber(amount).times(10**window.config.token_decimals).toFixed(0)
        vault_lp.depositTOKEN(amount)
    }

    function handleUnstake(e) {
        e.preventDefault()
        let amount = $withdrawInput.val()
        amount = new BigNumber(amount).times(10**window.config.token_decimals).toFixed(0)
        vault_lp.withdraw(amount)
    }

    function handleClaim (e) {
        e.preventDefault()
        vault_lp.claim()
    }

    return scope;
}

function getFormattedNumber(n, decimals=2) {
    n = Number(n)
    if (isNaN(Number(n))) return '...';
    if (decimals == 2) n = (Math.floor(n*100)/100).toFixed(2)
    let formatter = new Intl.NumberFormat()
    let [first, second] = Number(n).toFixed(decimals).split('.')
    first = formatter.format(first)
    if (decimals === 0) return first;
    return first + '.' + second
}

async function handleConnection (e) {
    if (e) e.preventDefault();
    if (window.isUnlocked) return;
    try {
      let isUnlocked = await window.connectWallet()
      window.isUnlocked = isUnlocked
    //   setState({coinbase: await window.web3.eth.getCoinbase()})

      $connectWalletBtn.each((_, b) => {
        $(b).html($(b).attr("data-connected-text"))
      })
    } catch (e) {
      window.alertify.error(String(e))
    }
}

let ethPoolScope, deshPoolScope;

ethPoolScope = initPool({
    vault_lp: window.vault_lp,
    token_lp: window.token_lp
})

 deshPoolScope = initPool({
     vault_lp: window.vault_lp_desh,
     token_lp: window.token_lp_desh,
     el_id_prefix: 'l-desh'
 })

function renderStats(state) {
    renderSummary(state)
}

function renderSummary(state) {
    let totalLp = 0
    let swissClaimable = 0
    let depositdEthLP = new BigNumber(ethPoolScope.state.depositedTokens)
    let balanceEthLp = new BigNumber(ethPoolScope.state.token_balance)
    let estimatedPendingDivsEth = new BigNumber(ethPoolScope.state.estimatedPendingDivs)

    totalLp += Number(depositdEthLP.plus(balanceEthLp).div(1e18).toFixed(2))
    swissClaimable += Number(estimatedPendingDivsEth.div(1e18).toFixed(2))

    if (deshPoolScope) {
        let depositedDeshLP = new BigNumber(deshPoolScope.state.depositedTokens)
        let balanceDeshLP = new BigNumber(deshPoolScope.state.token_balance)
        let estimatedPendingDivsDesh = new BigNumber(deshPoolScope.state.estimatedPendingDivs)
        totalLp += Number(depositedDeshLP.plus(balanceDeshLP).div(1e18).toFixed(2))
        swissClaimable += Number(estimatedPendingDivsDesh.div(1e18).toFixed(2))
    }

    totalLp = getFormattedNumber(totalLp, 2)
    swissClaimable = getFormattedNumber(swissClaimable, 2)
    let approxValue = getFormattedNumber(swissClaimable.replace(/,/g, '')*state.usdPerSwiss, 2)
    $('#l-total-lp').html(totalLp)
    $('#l-swiss-claimable').html(swissClaimable)
    $("#l-approx-usd-value").html(approxValue)
}

let {the_graph_api} = window.config

let desh_lp_id = the_graph_api.desh_pair_address+'-'+the_graph_api.vault_lp_desh_address
let eth_lp_id = the_graph_api.eth_pair_address+'-'+the_graph_api.vault_lp_eth_address

fetch('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2', {
  method: 'POST',
  mode: 'cors',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({query:`{

  tokens(where:{
id_in: ["${the_graph_api.swiss_token_address}", "${the_graph_api.desh_token_address}"]}) {
    id
    symbol
    name
    decimals
    untrackedVolumeUSD
  	derivedETH
  }

  bundle(id: 1) {
    id
    ethPrice
  }

  liquidityPositions(where:
    {id_in:
        ["${eth_lp_id}","${desh_lp_id}"],
    }) {
    id
    pair {
      reserveUSD
      totalSupply
    }
    liquidityTokenBalance
  }
}
`, variables: null}),
})
  .then(res => res.json())
  .then(res => handleTheGraphData(res))


function handleTheGraphData(response) {
try {
    let data = response.data
    if (!data) return;

    console.log(data)
    let ethPrice = new BigNumber(data.bundle.ethPrice).toFixed(2)*1
    let desh_volume_usd = 0, swiss_volume_usd = 0, desh_price_usd = 0, swiss_price_usd = 0;
    data.tokens.forEach(t => {
        if (t.id == the_graph_api.swiss_token_address) {
            swiss_volume_usd = new BigNumber(t.untrackedVolumeUSD).toFixed(2)*1
            swiss_price_usd = new BigNumber(t.derivedETH).times(ethPrice).toFixed(2)*1
        } else if (t.id == the_graph_api.desh_token_address) {
            desh_volume_usd = new BigNumber(t.untrackedVolumeUSD).toFixed(2)*1
            desh_price_usd = new BigNumber(t.derivedETH).times(ethPrice).toFixed(2)*1
        }
    })
    let total_fees = swiss_volume_usd*0.03

    let eth_lp_staked, desh_lp_staked, usd_per_eth_lp, usd_per_desh_lp;

    data.liquidityPositions.forEach(lp => {
        if (lp.id == eth_lp_id) {
            eth_lp_staked = lp.liquidityTokenBalance
            usd_per_eth_lp = new BigNumber(lp.pair.reserveUSD).div(lp.pair.totalSupply).toFixed(2)*1
        } else if (lp.id == desh_lp_id) {
            desh_lp_staked = lp.liquidityTokenBalance
            usd_per_desh_lp = new BigNumber(lp.pair.reserveUSD).div(lp.pair.totalSupply).toFixed(2)*1
        }
    })

    console.log({
        ethPrice,
        desh_price_usd,
        desh_volume_usd,
        swiss_volume_usd,
        swiss_price_usd,
        total_fees,
        eth_lp_staked,
        desh_lp_staked,
        usd_per_eth_lp,
        usd_per_desh_lp
    })

    setWindowState({usdPerSwiss: swiss_price_usd})

    let usdValueOfETHLpStaked = new BigNumber(eth_lp_staked).times(usd_per_eth_lp)
    let usdValueOfDeshLPStaked = new BigNumber(desh_lp_staked).times(usd_per_desh_lp)

    let swiss_value_disbursed_per_year = new BigNumber(4000).times(swiss_price_usd)

    let eth_pool_apy = swiss_value_disbursed_per_year.div(usdValueOfETHLpStaked).times(100).toFixed(2)
    let desh_pool_apy = swiss_value_disbursed_per_year.div(usdValueOfDeshLPStaked).times(100).toFixed(2)

    let l_total_lp_staked = usdValueOfETHLpStaked.plus(usdValueOfDeshLPStaked).toFixed(0)
    $(".l-total-lp-staked").html(getFormattedNumber( l_total_lp_staked , 0))
    $(".l-total-fees").html(getFormattedNumber(total_fees, 0))
    $(".l-total-volume").html(getFormattedNumber(swiss_volume_usd, 0))
    $(".l-eth-apy").html(eth_pool_apy)
    $(".l-desh-apy").html(desh_pool_apy)
} catch (e) {
    console.error(e)
}
}