/**
 * 王国カードの初期枚数のパターン
 */
enum lowData {
    Victory = 8,
    Standard = 10,
    Gold = 30,
    Silver = 40,
    Copper = 46
}

/**
 * 各カードの初期枚数
 */

export const initialCardCounts: { [key: string]: number } = {

    // ログ固有の用語
    card: 0,
    cards: 0,

    // 王国カード
    Province: lowData.Victory,
    Duchy: lowData.Victory,
    Estate: lowData.Victory,
    Gold: lowData.Gold,
    Silver: lowData.Silver,
    Copper: lowData.Copper,
    Curse: lowData.Standard,

    // 基本セット
    Artisan: lowData.Standard,
    Chapel: lowData.Standard,
    CouncilRoom: lowData.Standard,
    Festival: lowData.Standard,
    Gardens: lowData.Victory,
    Laboratory: lowData.Standard,
    Poacher: lowData.Standard,
    Remodel: lowData.Standard,
    ThroneRoom: lowData.Standard,
    Vassal: lowData.Standard,

};



