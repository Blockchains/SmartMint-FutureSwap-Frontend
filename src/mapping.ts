import { TradeOpen, TradeClose, TradeLiquidate, AddCollateral } from '../generated/Futureswap/Events'
import { Trade, Liquidation, Collateral } from '../generated/schema'

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
}

export function handleAddCollateral(event: AddCollateral): void {
  let addCollateral = new Collateral(event.params._tradeId.toHex())
  addCollateral.exchange = event.address
  addCollateral.tradeId = event.params._tradeId
  addCollateral.tradeOwner = event.params._tradeOwner
  addCollateral.addedCollateral = event.params._addedCollateral
  addCollateral.assetPrice = event.params._assetPrice
  addCollateral.stablePrice = event.params._stablePrice
}


//   - FrontRunning(indexed uint256,indexed address,int256)
//   - TradeLiquidate(indexed uint256,indexed address,indexed address,uint256,uint256,uint256)
//   - UpdateLiquidity(indexed address,uint256,uint256,uint256,uint256,bool,uint256)