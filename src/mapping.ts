import { Futureswap, TradeOpen, TradeClose, TradeLiquidate, AddCollateral, FrontRunning, UpdateLiquidity, InternalExchange } from '../generated/Futureswap/Futureswap'
import { Trade, Liquidation, Collateral, FrontRunningCase, LiquidityAddition, Balancer, TradeWithCollateral, OpenTrade, CloseTrade } from '../generated/schema'
import { BigIntEth } from './helpers'
import { returnTradesInfo } from './getters'


export function handleNewTradeOpen(event: TradeOpen): void {
  let id = event.address.toHexString().concat("-").concat(event.params.tradeId.toString())
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId)
  let trade = new Trade(id)
  trade.tradeId = event.params.tradeId
  trade.exchange = event.address
  trade.tradeOpen = true
  trade.tradeOwner = event.params.tradeOwner
  trade.isLong = event.params.isLong
  trade.collateral = event.params.collateral
  trade.leverage = event.params.leverage
  trade.assetPrice = event.params.assetPrice
  trade.stablePrice = event.params.stablePrice
  trade.openFee = event.params.openFee
  trade.oracleRoundId = event.params.oracleRoundId
  trade.timestampOpen = event.params.timestamp.toI32()
  trade.referralOpen = event.params.referral

  trade.stableTokenCollateral = returnedTrade.stableTokenCollateral
  trade.assetTokenBorrowed = returnedTrade.assetTokenBorrowed
  trade.stablePoolShares = returnedTrade.stablePoolShares
  trade.poolOwnershipShares = returnedTrade.poolOwnershipShares
  trade.save()

  let tradeWithCollateralId = event.transaction.hash.toHex()
  let tradeWithCollateral = new  TradeWithCollateral(tradeWithCollateralId)
  tradeWithCollateral.tradeId = event.params.tradeId
  tradeWithCollateral.initialCollateral = event.params.collateral
  tradeWithCollateral.collateral = event.params.collateral
  tradeWithCollateral.exchange = event.address
  tradeWithCollateral.tradeOwner = event.params.tradeOwner
  tradeWithCollateral.save()
  
  let tradeOpenedId = event.address.toHexString().concat("-").concat(event.params.tradeId.toString())
  let tradeOpened = new OpenTrade(tradeOpenedId)
  tradeOpened.tradeId = event.params.tradeId
  tradeOpened.exchange = event.address
  tradeOpened.tradeOwner = event.params.tradeOwner
  tradeOpened.isLong = event.params.isLong
  tradeOpened.positionValue = event.params.collateral.times(event.params.leverage).times(event.params.assetPrice).div(BigIntEth())
  tradeOpened.positionSize = event.params.collateral.times(event.params.leverage)
  tradeOpened.collateral = event.params.collateral
  tradeOpened.leverage = event.params.leverage
  tradeOpened.assetPrice = event.params.assetPrice
  tradeOpened.stablePrice = event.params.stablePrice
  tradeOpened.openFee = event.params.openFee
  tradeOpened.oracleRoundId = event.params.oracleRoundId
  tradeOpened.timestampOpen = event.params.timestamp.toI32()
  tradeOpened.referral = event.params.referral
  tradeOpened.stableTokenCollateral = returnedTrade.stableTokenCollateral
  tradeOpened.assetTokenBorrowed = returnedTrade.assetTokenBorrowed
  tradeOpened.stablePoolShares = returnedTrade.stablePoolShares
  tradeOpened.poolOwnershipShares = returnedTrade.poolOwnershipShares
  tradeOpened.save()
  
}

export function handleNewTradeClose(event: TradeClose): void {
  let id = event.address.toHexString().concat("-").concat(event.params.tradeId.toString())
  let futureswap = Futureswap.bind(event.address)
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId)
  let trade = new Trade(id)
  trade.tradeId = event.params.tradeId
  trade.exchange = event.address
  trade.tradeOpen = false
  trade.tradeOwner = event.params.tradeOwner
  trade.isLong = event.params.isLong
  trade.collateral = event.params.collateral
  trade.protectedAssetOpenPrice = event.params.protectedAssetOpenPrice
  trade.assetPrice = event.params.assetPrice
  trade.stablePrice = event.params.stablePrice
  trade.assetRedemptionAmount = event.params.assetRedemptionAmount
  trade.timestampClose = event.params.timestamp.toI32()
  trade.referralClose = event.params.referral
  trade.stableTokenCollateral = returnedTrade.stableTokenCollateral
  trade.assetTokenBorrowed = returnedTrade.assetTokenBorrowed
  trade.stablePoolShares = returnedTrade.stablePoolShares
  trade.poolOwnershipShares = returnedTrade.poolOwnershipShares
  trade.save()

  let tradeClosedId = event.address.toHexString().concat("-").concat(event.params.tradeId.toString())
  let tradeClosed = new CloseTrade(tradeClosedId)
  tradeClosed.tradeId = event.params.tradeId
  tradeClosed.exchange = event.address
  tradeClosed.tradeOwner = event.params.tradeOwner
  tradeClosed.isLong = event.params.isLong
  tradeClosed.collateral = event.params.collateral
  tradeClosed.assetPrice = event.params.assetPrice
  tradeClosed.stablePrice = event.params.stablePrice
  tradeClosed.assetRedemptionAmount = event.params.assetRedemptionAmount
  tradeClosed.positionValue = event.params.assetRedemptionAmount.times(event.params.assetPrice).div(BigIntEth())
  tradeClosed.timestampClose = event.params.timestamp.toI32()
  tradeClosed.referral = event.params.referral
  tradeClosed.stableTokenCollateral = returnedTrade.stableTokenCollateral
  tradeClosed.assetTokenBorrowed = returnedTrade.assetTokenBorrowed
  tradeClosed.stablePoolShares = returnedTrade.stablePoolShares
  tradeClosed.poolOwnershipShares = returnedTrade.poolOwnershipShares
  tradeClosed.save()
}



export function handleNewLiquidate(event: TradeLiquidate): void {
  let liquidation = new Liquidation(event.transaction.hash.toHex())
  liquidation.exchange = event.address
  liquidation.tradeId = event.params.tradeId
  liquidation.tradeOwner = event.params.tradeOwner
  liquidation.liquidator = event.params.liquidator
  liquidation.stableToSendLiquidator = event.params.stableToSendLiquidator
  liquidation.stableToSendTradeOwner = event.params.stableToSendTradeOwner
  liquidation.timestamp = event.params.timestamp
  liquidation.save()
}

export function handleAddCollateral(event: AddCollateral): void {
  let addCollateral = new Collateral(event.transaction.hash.toHex())
  addCollateral.exchange = event.address
  addCollateral.tradeId = event.params.tradeId
  addCollateral.tradeOwner = event.params.tradeOwner
  addCollateral.addedCollateral = event.params.addedCollateral
  addCollateral.assetPrice = event.params.assetPrice
  addCollateral.stablePrice = event.params.stablePrice
  addCollateral.timestamp = event.block.timestamp
  addCollateral.save()

  let tradeWithCollateralId = event.transaction.hash.toHex()
  let tradeWithCollateral = new  TradeWithCollateral(tradeWithCollateralId)
  tradeWithCollateral.tradeId = event.params.tradeId
  tradeWithCollateral.addedCollateral = event.params.addedCollateral
  tradeWithCollateral.collateral = event.params.addedCollateral
  tradeWithCollateral.exchange = event.address
  tradeWithCollateral.tradeOwner = event.params.tradeOwner
  tradeWithCollateral.save()
  
}

export function handleFrontRunning(event: FrontRunning): void {
  let frontrunning = new FrontRunningCase(event.transaction.hash.toHex())
  frontrunning.exchange = event.address
  frontrunning.tradeId = event.params.tradeId
  frontrunning.tradeOwner = event.params.tradeOwner
  frontrunning.protectedOpenPrice = event.params.protectedOpenPrice
  frontrunning.save()

}

export function handleUpdateLiquidity(event: UpdateLiquidity): void {
  let updateLiquidity = new LiquidityAddition(event.transaction.hash.toHex())
  updateLiquidity.exchange = event.address
  updateLiquidity.provider = event.params.provider
  updateLiquidity.assetTokenAmount = event.params.assetTokenAmount
  updateLiquidity.stableTokenAmount = event.params.stableTokenAmount
  updateLiquidity.lstPrice = event.params.lstPrice
  updateLiquidity.liquidityMinted = event.params.liquidityMinted
  updateLiquidity.addedLiquidity = event.params.addedLiq
  updateLiquidity.timestamp = event.params.timestamp
  updateLiquidity.save()
}

export function handleInternalExchange(event: InternalExchange): void {
  let balancer = new Balancer(event.transaction.hash.toHex())
  balancer.exchange = event.address
  balancer.provider = event.params.provider
  balancer.isTradingAsset = event.params.isTradingAsset
  balancer.assetAmount = event.params.assetAmount
  balancer.stableAmount = event.params.stableAmount
  balancer.assetPrice = event.params.assetPrice
  balancer.stablePrice = event.params.stablePrice
  balancer.timestamp = event.params.timestamp
  balancer.save()

}

