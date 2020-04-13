import {
  Futureswap,
  TradeOpen,
  TradeClose,
  TradeLiquidate,
  AddCollateral,
  FrontRunning,
  UpdateLiquidity,
  InternalExchange
} from "../generated/Futureswap/Futureswap";
import {
  Trade,
  Liquidation,
  Collateral,
  FrontRunningCase,
  LiquidityAddition,
  Balancer,
  TradeWithCollateral,
  OpenTrade,
  CloseTrade
} from "../generated/schema";
import { BigIntEth } from "./helpers";
import { returnTradesInfo } from "./getters";
import {
  logDFR,
  logTokenPools,
  logCloseTrade,
  logNewLiquidate,
  logFrontRunning,
  logOpenTrade,
  logUpdateLiquidity,
  logInternalExchange,
  logBalancerInformation
} from "./loggers";

export function handleNewTradeOpen(event: TradeOpen): void {
  let id = event.address
    .toHexString()
    .concat("-")
    .concat(event.params.tradeId.toString());
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId);
  let trade = new Trade(id);
  trade.tradeId = event.params.tradeId;
  trade.exchange = event.address;
  trade.tradeOpen = true;
  trade.tradeOwner = event.params.tradeOwner;
  trade.isLong = event.params.isLong;
  trade.collateral = event.params.collateral;
  trade.leverage = event.params.leverage;
  trade.assetPrice = event.params.assetPrice;
  trade.stablePrice = event.params.stablePrice;
  trade.openFee = event.params.openFee;
  trade.oracleRoundId = event.params.oracleRoundId;
  trade.timestampOpen = event.params.timestamp.toI32();
  trade.referralOpen = event.params.referral;
  trade.stableTokenCollateral = returnedTrade.stableTokenCollateral;
  trade.assetTokenBorrowed = returnedTrade.assetTokenBorrowed;
  trade.stablePoolShares = returnedTrade.stablePoolShares;
  trade.poolOwnershipShares = returnedTrade.poolOwnershipShares;
  trade.save();

  let tradeWithCollateralId = event.transaction.hash.toHex();
  let tradeWithCollateral = new TradeWithCollateral(tradeWithCollateralId);
  tradeWithCollateral.tradeId = event.params.tradeId;
  tradeWithCollateral.initialCollateral = event.params.collateral;
  tradeWithCollateral.collateral = event.params.collateral;
  tradeWithCollateral.exchange = event.address;
  tradeWithCollateral.tradeOwner = event.params.tradeOwner;
  tradeWithCollateral.save();

  logOpenTrade(event);
  logDFR(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "TradeOpen"
  );
  logTokenPools(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "TradeOpen"
  );
  logBalancerInformation(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "TradeOpen"
  );
}

export function handleNewTradeClose(event: TradeClose): void {
  let id = event.address
    .toHexString()
    .concat("-")
    .concat(event.params.tradeId.toString());
  let returnedTrade = returnTradesInfo(event.address, event.params.tradeId);
  let trade = new Trade(id);
  trade.tradeId = event.params.tradeId;
  trade.exchange = event.address;
  trade.tradeOpen = false;
  trade.tradeOwner = event.params.tradeOwner;
  trade.isLong = event.params.isLong;
  trade.collateral = event.params.collateral;
  trade.protectedAssetOpenPrice = event.params.protectedAssetOpenPrice;
  trade.assetPrice = event.params.assetPrice;
  trade.stablePrice = event.params.stablePrice;
  trade.assetRedemptionAmount = event.params.assetRedemptionAmount;
  trade.timestampClose = event.params.timestamp.toI32();
  trade.referralClose = event.params.referral;
  trade.stableTokenCollateral = returnedTrade.stableTokenCollateral;
  trade.assetTokenBorrowed = returnedTrade.assetTokenBorrowed;
  trade.stablePoolShares = returnedTrade.stablePoolShares;
  trade.poolOwnershipShares = returnedTrade.poolOwnershipShares;
  trade.save();

  logCloseTrade(event);
  logDFR(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "TradeClose"
  );
  logTokenPools(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "TradeClose"
  );
  logBalancerInformation(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "TradeClose"
  );
}

export function handleNewLiquidate(event: TradeLiquidate): void {
  logNewLiquidate(event);
  logDFR(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "Liquidation"
  );
  logTokenPools(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "Liquidation"
  );
  logBalancerInformation(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "Liquidation"
  );
  let id = event.address
    .toHexString()
    .concat("-")
    .concat(event.params.tradeId.toString());
  let trade = new Trade(id);
  trade.isLiquidated = true;
  trade.tradeOpen = false


}

export function handleAddCollateral(event: AddCollateral): void {
  let addCollateral = new Collateral(event.transaction.hash.toHex());
  addCollateral.exchange = event.address;
  addCollateral.tradeId = event.params.tradeId;
  addCollateral.tradeOwner = event.params.tradeOwner;
  addCollateral.addedCollateral = event.params.addedCollateral;
  addCollateral.assetPrice = event.params.assetPrice;
  addCollateral.stablePrice = event.params.stablePrice;
  addCollateral.timestamp = event.block.timestamp;
  addCollateral.save();

  let tradeWithCollateralId = event.transaction.hash.toHex();
  let tradeWithCollateral = new TradeWithCollateral(tradeWithCollateralId);
  tradeWithCollateral.tradeId = event.params.tradeId;
  tradeWithCollateral.addedCollateral = event.params.addedCollateral;
  tradeWithCollateral.collateral = event.params.addedCollateral;
  tradeWithCollateral.exchange = event.address;
  tradeWithCollateral.tradeOwner = event.params.tradeOwner;
  tradeWithCollateral.save();

  logDFR(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "AddCollateral"
  );
  logTokenPools(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "AddCollateral"
  );
  logBalancerInformation(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "AddCollateral"
  );
}

export function handleFrontRunning(event: FrontRunning): void {
  logFrontRunning(event);
}

export function handleUpdateLiquidity(event: UpdateLiquidity): void {
  logUpdateLiquidity(event);

  logDFR(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "UpdateLiquidity"
  );
  logTokenPools(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "UpdateLiquidity"
  );
  logBalancerInformation(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "UpdateLiquidity"
  );
}

export function handleInternalExchange(event: InternalExchange): void {
  logInternalExchange(event);

  logDFR(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "InternalExchange"
  );
  logTokenPools(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "InternalExchange"
  );
  logBalancerInformation(
    event.transaction.hash,
    event.address,
    event.block.timestamp,
    "InternalExchange"
  );
}
