/**
 * 王国カードの初期枚数のパターン
 */
enum lowData {
    Victory = 8,
    Standard = 10
}

/**
 * 各カードの初期枚数
 */

export const initialCardCounts: { [key: string]: number } = {

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



