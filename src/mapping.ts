import { Futureswap, TradeOpen, TradeClose, TradeLiquidate, AddCollateral, FrontRunning, UpdateLiquidity, InternalExchange } from '../generated/Futureswap/Futureswap'
import { Trade, Liquidation, Collateral, FrontRunningCase, LiquidityAddition, Balancer, TradeWithCollateral, OpenTrade, CloseTrade } from '../generated/schema'
import { BigIntEth } from './helpers'
import { returnTradesInfo } from './getters'
import { logDFR, logTokenPools, logTradeClosed } from './loggers'


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

  logDFR(event.transaction.hash, event.address, event.block.timestamp, "TradeOpen")
  logTokenPools(event.transaction.hash, event.address, event.block.timestamp, "TradeOpen")

  
}

export function handleNewTradeClose(event: TradeClose): void {
  let id = event.address.toHexString().concat("-").concat(event.params.tradeId.toString())
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

  logTradeClosed(event)
  logDFR(event.transaction.hash, event.address, event.block.timestamp, "TradeClose")
  logTokenPools(event.transaction.hash, event.address, event.block.timestamp, "TradeClose")


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

  logDFR(event.transaction.hash, event.address, event.block.timestamp, "Liquidation")
  logTokenPools(event.transaction.hash, event.address, event.block.timestamp, "Liquidation")


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
  
  logDFR(event.transaction.hash, event.address, event.block.timestamp, "AddCollateral")
  logTokenPools(event.transaction.hash, event.address, event.block.timestamp, "AddCollateral")


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

  logDFR(event.transaction.hash, event.address, event.block.timestamp, "UpdateLiquidity")
  logTokenPools(event.transaction.hash, event.address, event.block.timestamp, "UpdateLiquidity")


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

  logDFR(event.transaction.hash, event.address, event.block.timestamp, "InternalExchange")
  logTokenPools(event.transaction.hash, event.address, event.block.timestamp, "InternalExchange")

}

