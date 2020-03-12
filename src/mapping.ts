import { TradeOpen, TradeClose, TradeLiquidate, AddCollateral, FrontRunning, UpdateLiquidity } from '../generated/Futureswap/Events'
import { Trade, Liquidation, Collateral, FrontRunningCase, LiquidityAddition } from '../generated/schema'

export function handleNewTradeOpen(event: TradeOpen): void {
  let trade = new Trade(event.params._tradeId.toHex())
  trade.tradeId = event.params._tradeId
  trade.exchange = event.address
  trade.tradeOpen = true
  trade.tradeOwner = event.params._tradeOwner
  trade.isLong = event.params._isLong
  trade.collateral = event.params._collateral
  trade.leverage = event.params._leverage
  trade.assetPrice = event.params._assetPrice
  trade.stablePrice = event.params._stablePrice
  trade.openFee = event.params._openFee
  trade.oracleRoundId = event.params._oracleRoundId
  trade.timestamp = event.params._timestamp
  trade.referral = event.params._referral
  trade.save()
}

export function handleNewTradeClose(event: TradeClose): void {
  let trade = new Trade(event.params._tradeId.toHex())
  trade.tradeId = event.params._tradeId
  trade.exchange = event.address
  trade.tradeOpen = false
  trade.tradeOwner = event.params._tradeOwner
  trade.isLong = event.params._isLong
  trade.collateral = event.params._collateral
  trade.protectedAssetOpenPrice = event.params._protectedAssetOpenPrice
  trade.assetPrice = event.params._assetPrice
  trade.stablePrice = event.params._stablePrice
  trade.redemptionAmount = event.params._redemptionAmount
  trade.timestamp = event.params._timestamp
  trade.referral = event.params._referral
  trade.save()
}



export function handleNewLiquidate(event: TradeLiquidate): void {
  let liquidation = new Liquidation(event.params._tradeId.toHex())
  liquidation.exchange = event.address
  liquidation.tradeId = event.params._tradeId
  liquidation.tradeOwner = event.params._tradeOwner
  liquidation.liquidator = event.params._liquidator
  liquidation.liquidatorReturn = event.params._liquidatorReturn
  liquidation.liqTraderReturn = event.params._liqTraderReturn
  liquidation.timestamp = event.params._timestamp
  liquidation.save()
}

export function handleAddCollateral(event: AddCollateral): void {
  let addCollateral = new Collateral(event.params._tradeId.toHex())
  addCollateral.exchange = event.address
  addCollateral.tradeId = event.params._tradeId
  addCollateral.tradeOwner = event.params._tradeOwner
  addCollateral.addedCollateral = event.params._addedCollateral
  addCollateral.assetPrice = event.params._assetPrice
  addCollateral.stablePrice = event.params._stablePrice
  addCollateral.save()
}

export function handleFrontRunning(event: FrontRunning): void {
  let frontrunning = new FrontRunningCase(event.params._tradeId.toHex())
  frontrunning.exchange = event.address
  frontrunning.tradeId = event.params._tradeId
  frontrunning.tradeOwner = event.params._tradeOwner
  frontrunning.protectedOpenPrice = event.params._protectedOpenPrice
  frontrunning.save()

}

export function handleUpdateLiquidity(event: UpdateLiquidity): void {
  let updateLiquidity = new LiquidityAddition(event.transaction.hash.toHex())
  updateLiquidity.exchange = event.address
  updateLiquidity.provider = event.params._provider
  updateLiquidity.assetTokenAmount = event.params._assetTokenAmount
  updateLiquidity.stableTokenAmount = event.params._stableTokenAmount
  updateLiquidity.LSTPrice = event.params._LSTPrice
  updateLiquidity.LiquidityMinted = event.params._LiquidityMinted
  updateLiquidity.addedLiquidity = event.params._addedLiq
  updateLiquidity.timestamp = event.params._timestamp
  updateLiquidity.save()
}



