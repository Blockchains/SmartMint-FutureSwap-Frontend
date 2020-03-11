// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Trade extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Trade entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Trade entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Trade", id.toString(), this);
  }

  static load(id: string): Trade | null {
    return store.get("Trade", id) as Trade | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get exchange(): Bytes {
    let value = this.get("exchange");
    return value.toBytes();
  }

  set exchange(value: Bytes) {
    this.set("exchange", Value.fromBytes(value));
  }

  get tradeId(): BigInt {
    let value = this.get("tradeId");
    return value.toBigInt();
  }

  set tradeId(value: BigInt) {
    this.set("tradeId", Value.fromBigInt(value));
  }

  get tradeOpen(): boolean {
    let value = this.get("tradeOpen");
    return value.toBoolean();
  }

  set tradeOpen(value: boolean) {
    this.set("tradeOpen", Value.fromBoolean(value));
  }

  get tradeOwner(): Bytes {
    let value = this.get("tradeOwner");
    return value.toBytes();
  }

  set tradeOwner(value: Bytes) {
    this.set("tradeOwner", Value.fromBytes(value));
  }

  get isLong(): boolean {
    let value = this.get("isLong");
    return value.toBoolean();
  }

  set isLong(value: boolean) {
    this.set("isLong", Value.fromBoolean(value));
  }

  get isLiquidated(): boolean {
    let value = this.get("isLiquidated");
    return value.toBoolean();
  }

  set isLiquidated(value: boolean) {
    this.set("isLiquidated", Value.fromBoolean(value));
  }

  get collateral(): BigInt {
    let value = this.get("collateral");
    return value.toBigInt();
  }

  set collateral(value: BigInt) {
    this.set("collateral", Value.fromBigInt(value));
  }

  get leverage(): BigInt {
    let value = this.get("leverage");
    return value.toBigInt();
  }

  set leverage(value: BigInt) {
    this.set("leverage", Value.fromBigInt(value));
  }

  get protectedAssetOpenPrice(): BigInt | null {
    let value = this.get("protectedAssetOpenPrice");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set protectedAssetOpenPrice(value: BigInt | null) {
    if (value === null) {
      this.unset("protectedAssetOpenPrice");
    } else {
      this.set("protectedAssetOpenPrice", Value.fromBigInt(value as BigInt));
    }
  }

  get assetPrice(): BigInt {
    let value = this.get("assetPrice");
    return value.toBigInt();
  }

  set assetPrice(value: BigInt) {
    this.set("assetPrice", Value.fromBigInt(value));
  }

  get stablePrice(): BigInt {
    let value = this.get("stablePrice");
    return value.toBigInt();
  }

  set stablePrice(value: BigInt) {
    this.set("stablePrice", Value.fromBigInt(value));
  }

  get redemptionAmount(): BigInt | null {
    let value = this.get("redemptionAmount");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set redemptionAmount(value: BigInt | null) {
    if (value === null) {
      this.unset("redemptionAmount");
    } else {
      this.set("redemptionAmount", Value.fromBigInt(value as BigInt));
    }
  }

  get openFee(): BigInt | null {
    let value = this.get("openFee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set openFee(value: BigInt | null) {
    if (value === null) {
      this.unset("openFee");
    } else {
      this.set("openFee", Value.fromBigInt(value as BigInt));
    }
  }

  get oracleRoundId(): BigInt | null {
    let value = this.get("oracleRoundId");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set oracleRoundId(value: BigInt | null) {
    if (value === null) {
      this.unset("oracleRoundId");
    } else {
      this.set("oracleRoundId", Value.fromBigInt(value as BigInt));
    }
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get referral(): Bytes {
    let value = this.get("referral");
    return value.toBytes();
  }

  set referral(value: Bytes) {
    this.set("referral", Value.fromBytes(value));
  }
}

export class Liquidation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Liquidation entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Liquidation entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Liquidation", id.toString(), this);
  }

  static load(id: string): Liquidation | null {
    return store.get("Liquidation", id) as Liquidation | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get exchange(): Bytes {
    let value = this.get("exchange");
    return value.toBytes();
  }

  set exchange(value: Bytes) {
    this.set("exchange", Value.fromBytes(value));
  }

  get tradeOwner(): Bytes {
    let value = this.get("tradeOwner");
    return value.toBytes();
  }

  set tradeOwner(value: Bytes) {
    this.set("tradeOwner", Value.fromBytes(value));
  }

  get liquidator(): Bytes {
    let value = this.get("liquidator");
    return value.toBytes();
  }

  set liquidator(value: Bytes) {
    this.set("liquidator", Value.fromBytes(value));
  }

  get liquidatorReturn(): BigInt {
    let value = this.get("liquidatorReturn");
    return value.toBigInt();
  }

  set liquidatorReturn(value: BigInt) {
    this.set("liquidatorReturn", Value.fromBigInt(value));
  }

  get liqTraderReturn(): BigInt {
    let value = this.get("liqTraderReturn");
    return value.toBigInt();
  }

  set liqTraderReturn(value: BigInt) {
    this.set("liqTraderReturn", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
