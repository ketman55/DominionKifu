/**
 * 王国カードの初期枚数のパターン
 */
enum lowData {
    Victory = 8,
    Standard = 10,
    Gold = 30,
    Silver = 40,
    Copper = 46,
    Special = 1,
    Port = 12,
}

/**
 * 各カードの初期枚数
 */

export const initialCardCounts: { [key: string]: number } = {

    // ログ固有の用語
    card: 0,

    // 王国カード
    Province: lowData.Victory,
    Duchy: lowData.Victory,
    Estate: lowData.Victory,
    Gold: lowData.Gold,
    Silver: lowData.Silver,
    Copper: lowData.Copper,
    Curse: lowData.Standard,
    Potion: lowData.Standard,
    Platinum: lowData.Standard,
    Colony: lowData.Victory,


    //Dominion
    Cellar: lowData.Standard,
    Chapel: lowData.Standard,
    Moat: lowData.Standard,
    Harbinger: lowData.Standard,
    Merchant: lowData.Standard,
    Vassal: lowData.Standard,
    Village: lowData.Standard,
    Workshop: lowData.Standard,
    Bureaucrat: lowData.Standard,
    Gardens: lowData.Victory,
    Militia: lowData.Standard,
    Moneylender: lowData.Standard,
    Poacher: lowData.Standard,
    Remodel: lowData.Standard,
    Smithy: lowData.Standard,
    ThroneRoom: lowData.Standard,
    Bandit: lowData.Standard,
    CouncilRoom: lowData.Standard,
    Festival: lowData.Standard,
    Laboratory: lowData.Standard,
    Library: lowData.Standard,
    Market: lowData.Standard,
    Mine: lowData.Standard,
    Sentry: lowData.Standard,
    Witch: lowData.Standard,
    Artisan: lowData.Standard,

    //Removedcards:
    Chancellor: lowData.Standard,
    Woodcutter: lowData.Standard,
    Feast: lowData.Standard,
    Spy: lowData.Standard,
    Thief: lowData.Standard,
    Adventurer: lowData.Standard,

    //Intrigue
    Courtyard: lowData.Standard,
    Lurker: lowData.Standard,
    Pawn: lowData.Standard,
    Masquerade: lowData.Standard,
    ShantyTown: lowData.Standard,
    Steward: lowData.Standard,
    Swindler: lowData.Standard,
    WishingWell: lowData.Standard,
    Baron: lowData.Standard,
    Bridge: lowData.Standard,
    Conspirator: lowData.Standard,
    Diplomat: lowData.Standard,
    Ironworks: lowData.Standard,
    Mill: lowData.Victory,
    MiningVillage: lowData.Standard,
    SecretPassage: lowData.Standard,
    Courtier: lowData.Standard,
    Duke: lowData.Victory,
    Minion: lowData.Standard,
    Patrol: lowData.Standard,
    Replace: lowData.Standard,
    Torturer: lowData.Standard,
    TradingPost: lowData.Standard,
    Upgrade: lowData.Standard,
    Farm: lowData.Standard,
    Nobles: lowData.Victory,

    //Removedcards:
    SecretChamber: lowData.Standard,
    GreatHall: lowData.Standard,
    Coppersmith: lowData.Standard,
    Scout: lowData.Standard,
    Saboteur: lowData.Standard,
    Tribute: lowData.Standard,

    //Seaside
    Haven: lowData.Standard,
    Lighthouse: lowData.Standard,
    NativeVillage: lowData.Standard,
    Astrolabe: lowData.Standard,
    FishingVillage: lowData.Standard,
    Lookout: lowData.Standard,
    Monkey: lowData.Standard,
    SeaChart: lowData.Standard,
    Smugglers: lowData.Standard,
    Warehouse: lowData.Standard,
    Blockade: lowData.Standard,
    Caravan: lowData.Standard,
    Cutpurse: lowData.Standard,
    Island: lowData.Victory,
    Sailor: lowData.Standard,
    Salvager: lowData.Standard,
    TidePools: lowData.Standard,
    TreasureMap: lowData.Standard,
    Bazaar: lowData.Standard,
    Corsair: lowData.Standard,
    MerchantShip: lowData.Standard,
    Outpost: lowData.Standard,
    Pirate: lowData.Standard,
    SeaWitch: lowData.Standard,
    Tactician: lowData.Standard,
    Treasury: lowData.Standard,
    Wharf: lowData.Standard,

    //Removedcards:
    Embargo: lowData.Standard,
    PearlDiver: lowData.Standard,
    Ambassador: lowData.Standard,
    Navigator: lowData.Standard,
    PirateShip: lowData.Standard,
    SeaHag: lowData.Standard,
    Explorer: lowData.Standard,
    GhostShip: lowData.Standard,

    //Alchemy
    PTransmute: lowData.Standard,
    Vineyard: lowData.Standard,
    Herbalist: lowData.Standard,
    Apothecary: lowData.Standard,
    ScryingPool: lowData.Standard,
    University: lowData.Victory,
    Alchemist: lowData.Standard,
    Familiar: lowData.Standard,
    PhilosophersStone: lowData.Standard,
    Golem: lowData.Standard,
    Apprentice: lowData.Standard,
    Possession: lowData.Standard,

    //Prosperity
    Anvil: lowData.Standard,
    Watchtower: lowData.Standard,
    Bishop: lowData.Standard,
    Clerk: lowData.Standard,
    Investment: lowData.Standard,
    Tiara: lowData.Standard,
    Monument: lowData.Standard,
    Quarry: lowData.Standard,
    WorkersVillage: lowData.Standard,
    Charlatan: lowData.Standard,
    City: lowData.Standard,
    Collection: lowData.Standard,
    CrystalBall: lowData.Standard,
    Magnate: lowData.Standard,
    Mint: lowData.Standard,
    Rabble: lowData.Standard,
    Vault: lowData.Standard,
    WarChest: lowData.Standard,
    Hoard: lowData.Standard,
    GrandMarket: lowData.Standard,
    Bank: lowData.Standard,
    Expand: lowData.Standard,
    Forge: lowData.Standard,
    KingsCourt: lowData.Standard,
    StarPeddler: lowData.Standard,

    //Removedcards:
    Loan: lowData.Standard,
    TradeRoute: lowData.Standard,
    Talisman: lowData.Standard,
    Contraband: lowData.Standard,
    CountingHouse: lowData.Standard,
    Mountebank: lowData.Standard,
    RoyalSeal: lowData.Standard,
    Venture: lowData.Standard,
    Goons: lowData.Standard,

    //Cornucopia&Guilds
    CandlestickMaker: lowData.Standard,
    Hamlet: lowData.Standard,
    Farrier: lowData.Standard,
    Stonemason: lowData.Standard,
    Menagerie: lowData.Standard,
    Shop: lowData.Standard,
    Infirmary: lowData.Standard,
    Advisor: lowData.Standard,
    Farmhands: lowData.Standard,
    Plaza: lowData.Standard,
    Remake: lowData.Standard,
    YoungWitch: lowData.Standard,
    Herald: lowData.Standard,
    Baker: lowData.Standard,
    Butcher: lowData.Standard,
    Carnival: lowData.Standard,
    Ferryman: lowData.Standard,
    Footpad: lowData.Standard,
    HornofPlenty: lowData.Standard,
    HuntingParty: lowData.Standard,
    Jester: lowData.Standard,
    Journeyman: lowData.Standard,
    JoustRewards: lowData.Standard,
    Coronet: lowData.Special,
    Courser: lowData.Special,
    Demesne: lowData.Special,
    Housecarl: lowData.Special,
    HugeTurnip: lowData.Special,
    Renown: lowData.Special,
    MerchantGuild: lowData.Standard,
    Soothsayer: lowData.Standard,
    Fairgrounds: lowData.Victory,

    //Removedcards:
    FortuneTeller: lowData.Standard,
    Doctor: lowData.Standard,
    Masterpiece: lowData.Standard,
    FarmingVillage: lowData.Standard,
    HorseTraders: lowData.Standard,
    Taxman: lowData.Standard,
    TournamentPrizes: lowData.Standard,
    BagofGold: lowData.Special,
    Diadem: lowData.Special,
    Followers: lowData.Special,
    Princess: lowData.Special,
    TrustySteed: lowData.Special,
    Harvest: lowData.Standard,

    //Hinterlands
    Crossroads: lowData.Standard,
    FoolsGold: lowData.Standard,
    Develop: lowData.Standard,
    GuardDog: lowData.Standard,
    Oasis: lowData.Standard,
    Scheme: lowData.Standard,
    Tunnel: lowData.Victory,
    JackofAllTrades: lowData.Standard,
    Nomads: lowData.Standard,
    SpiceMerchant: lowData.Standard,
    Trader: lowData.Standard,
    Trail: lowData.Standard,
    Weaver: lowData.Standard,
    Berserker: lowData.Standard,
    Cartographer: lowData.Standard,
    Cauldron: lowData.Standard,
    Haggler: lowData.Standard,
    Highway: lowData.Standard,
    Inn: lowData.Standard,
    Margrave: lowData.Standard,
    Souk: lowData.Standard,
    Stables: lowData.Standard,
    Wheelwright: lowData.Standard,
    WitchsHut: lowData.Standard,
    BorderVillage: lowData.Standard,
    Farmland: lowData.Victory,

    //Removedcards:
    Duches: lowData.Standard,
    racle: lowData.Standard,
    NobleBrigand: lowData.Standard,
    NomadCamp: lowData.Standard,
    SilkRoad: lowData.Victory,
    Cache: lowData.Standard,
    Embassy: lowData.Standard,
    IllGottenGains: lowData.Standard,
    Mandarin: lowData.Standard,

    //DarkAges
    RuinsAbandonedMine: lowData.Standard,
    RuinedLibrary: lowData.Standard,
    RuinedMarket: lowData.Standard,
    RuinedVillage: lowData.Standard,
    Survivors: lowData.Standard,
    Spoils: lowData.Standard,
    PoorHouse: lowData.Standard,
    SheltersHovel: lowData.Standard,
    Necropolis: lowData.Standard,
    OvergrownEstate: lowData.Standard,
    Beggar: lowData.Standard,
    Squire: lowData.Standard,
    Vagrant: lowData.Standard,
    Forager: lowData.Standard,
    HermitMadman: lowData.Standard,
    MarketSquare: lowData.Standard,
    Sage: lowData.Standard,
    Storeroom: lowData.Standard,
    UrchinMercenary: lowData.Standard,
    Armory: lowData.Standard,
    DeathCart: lowData.Standard,
    Feodum: lowData.Victory,
    Fortress: lowData.Standard,
    Ironmonger: lowData.Standard,
    Marauder: lowData.Standard,
    Procession: lowData.Standard,
    Rats: lowData.Standard,
    Scavenger: lowData.Standard,
    WanderingMinstrel: lowData.Standard,
    BandofMisfits: lowData.Standard,
    BanditCamp: lowData.Standard,
    Catacombs: lowData.Standard,
    Count: lowData.Standard,
    Counterfeit: lowData.Standard,
    Cultist: lowData.Standard,
    Graverobber: lowData.Standard,
    JunkDealer: lowData.Standard,
    Knights: lowData.Standard,
    DamesAnna: lowData.Special,
    Josephine: lowData.Special,
    Molly: lowData.Special,
    Natalie: lowData.Special,
    Sylvia: lowData.Special,
    SirsBailey: lowData.Special,
    Destry: lowData.Special,
    Martin: lowData.Special,
    Michael: lowData.Special,
    Vander: lowData.Special,
    Mystic: lowData.Standard,
    Pillage: lowData.Standard,
    Rebuild: lowData.Standard,
    Rogue: lowData.Standard,
    Altar: lowData.Standard,
    HuntingGrounds: lowData.Standard,

    //Adventures
    CoinoftheRealm: lowData.Standard,
    Page: lowData.Standard,
    TreasureHunter: lowData.Standard,
    Warrior: lowData.Standard,
    Hero: lowData.Standard,
    Champion: lowData.Standard,
    Peasant: lowData.Standard,
    Soldier: lowData.Standard,
    Fugitive: lowData.Standard,
    Disciple: lowData.Standard,
    Teacher: lowData.Standard,
    Ratcatcher: lowData.Standard,
    Raze: lowData.Standard,
    Amulet: lowData.Standard,
    CaravanGuard: lowData.Standard,
    Dungeon: lowData.Standard,
    Gear: lowData.Standard,
    Guide: lowData.Standard,
    Duplicate: lowData.Standard,
    Magpie: lowData.Standard,
    Messenger: lowData.Standard,
    Miser: lowData.Standard,
    Port: lowData.Port,
    Ranger: lowData.Standard,
    Transmogrify: lowData.Standard,
    Artificer: lowData.Standard,
    BridgeTroll: lowData.Standard,
    DistantLands: lowData.Victory,
    Giant: lowData.Standard,
    HauntedWoods: lowData.Standard,
    LostCity: lowData.Standard,
    Relic: lowData.Standard,
    RoyalCarriage: lowData.Standard,
    Storyteller: lowData.Standard,
    SwampHag: lowData.Standard,
    TreasureTrove: lowData.Standard,
    WineMerchant: lowData.Standard,
    Hireling: lowData.Standard,

    //Events:
    Alms: lowData.Standard,
    Borrow: lowData.Standard,
    Quest: lowData.Standard,
    Save: lowData.Standard,
    ScoutingParty: lowData.Standard,
    TravellingFair: lowData.Standard,
    Bonfire: lowData.Standard,
    Expedition: lowData.Standard,
    Ferry: lowData.Standard,
    Plan: lowData.Standard,
    Mission: lowData.Standard,
    Pilgrimage: lowData.Standard,
    Ball: lowData.Standard,
    Raid: lowData.Standard,
    Seaway: lowData.Standard,
    Trade: lowData.Standard,
    LostArts: lowData.Standard,
    Training: lowData.Standard,
    Inheritance: lowData.Standard,
    Pathfinding: lowData.Standard,

    //Empires
    Engineer: lowData.Standard,
    CityQuarter: lowData.Standard,
    Overlord: lowData.Standard,
    RoyalBlacksmith: lowData.Standard,
    Encampment: lowData.Standard,
    Plunder: lowData.Standard,
    Patrician: lowData.Standard,
    Emporium: lowData.Standard,
    Settlers: lowData.Standard,
    BustlingVillage: lowData.Standard,
    Castles: lowData.Standard,
    Humble: lowData.Standard,
    Crumbling: lowData.Standard,
    Small: lowData.Standard,
    Haunted: lowData.Standard,
    Opulent: lowData.Standard,
    Sprawling: lowData.Standard,
    Grand: lowData.Standard,
    Kings: lowData.Standard,
    Catapult: lowData.Standard,
    Rocks: lowData.Standard,
    ChariotRace: lowData.Standard,
    Enchantress: lowData.Standard,
    FarmersMarket: lowData.Standard,
    Gladiator: lowData.Standard,
    Fortune: lowData.Standard,
    Sacrifice: lowData.Standard,
    Temple: lowData.Standard,
    Villa: lowData.Standard,
    Archive: lowData.Standard,
    Capital: lowData.Standard,
    Charm: lowData.Standard,
    Crown: lowData.Standard,
    Forum: lowData.Standard,
    Groundskeeper: lowData.Standard,
    Legionary: lowData.Standard,
    WildHunt: lowData.Standard,

    //Events:
    Triumph: lowData.Standard,
    Annex: lowData.Standard,
    Donate: lowData.Standard,
    Advance: lowData.Standard,
    Delve: lowData.Standard,
    Tax: lowData.Standard,
    Banquet: lowData.Standard,
    Ritual: lowData.Standard,
    SalttheEarth: lowData.Standard,
    Wedding: lowData.Standard,
    Windfall: lowData.Standard,
    Conquest: lowData.Standard,
    Dominate: lowData.Standard,

    //Landmarks:Aqueduct
    Arena: lowData.Standard,
    BanditFort: lowData.Standard,
    Basilica: lowData.Standard,
    Baths: lowData.Standard,
    Battlefield: lowData.Standard,
    Colonnade: lowData.Standard,
    DefiledShrine: lowData.Standard,
    Fountain: lowData.Standard,
    Keep: lowData.Standard,
    Labyrinth: lowData.Standard,
    MountainPass: lowData.Standard,
    Museum: lowData.Standard,
    Obelisk: lowData.Standard,
    Orchard: lowData.Standard,
    Palace: lowData.Standard,
    Tomb: lowData.Standard,
    Tower: lowData.Standard,
    TriumphalArch: lowData.Standard,
    Wall: lowData.Standard,
    WolfDen: lowData.Standard,

    //Nocturne
    WilloWisp: lowData.Standard,
    Wish: lowData.Standard,
    Druid: lowData.Standard,
    FaithfulHound: lowData.Standard,
    Guardian: lowData.Standard,
    Monastery: lowData.Standard,
    PixieGoat: lowData.Standard,
    TrackerPouch: lowData.Standard,
    Imp: lowData.Standard,
    Changeling: lowData.Standard,
    FoolLostintheWoods: lowData.Standard,
    LuckyCoin: lowData.Standard,
    GhostTown: lowData.Standard,
    Leprechaun: lowData.Standard,
    NightWatchman: lowData.Standard,
    SecretCave: lowData.Standard,
    MagicLamp: lowData.Standard,
    Bard: lowData.Standard,
    BlessedVillage: lowData.Standard,
    Cemetery: lowData.Victory,
    HauntedMirror: lowData.Standard,
    Conclave: lowData.Standard,
    DevilsWorkshop: lowData.Standard,
    Exorcist: lowData.Standard,
    Necromancer: lowData.Standard,
    ZombiesApprentice: lowData.Standard,
    ZombiesMason: lowData.Standard,
    ZombiesSpy: lowData.Standard,
    ShepherdPasture: lowData.Standard,
    Skulk: lowData.Standard,
    Ghost: lowData.Standard,
    Cobbler: lowData.Standard,
    Crypt: lowData.Standard,
    CursedVillage: lowData.Standard,
    DenofSin: lowData.Standard,
    Idol: lowData.Standard,
    Pooka: lowData.Standard,
    CursedGold: lowData.Standard,
    SacredGrove: lowData.Standard,
    Tormentor: lowData.Standard,
    TragicHero: lowData.Standard,
    VampireBat: lowData.Standard,
    Werewolf: lowData.Standard,
    Raider: lowData.Standard,

    //Boons:
    TheEarthsGift: lowData.Standard,
    Field: lowData.Standard,
    Flame: lowData.Standard,
    Forest: lowData.Standard,
    Moon: lowData.Standard,
    Mountain: lowData.Standard,
    River: lowData.Standard,
    Sea: lowData.Standard,
    Sky: lowData.Standard,
    Sun: lowData.Standard,
    Swamp: lowData.Standard,
    Wind: lowData.Standard,

    //Hexes:
    BadOmens: lowData.Standard,
    Delusion: lowData.Standard,
    Deluded: lowData.Standard,
    EnvyEnvious: lowData.Standard,
    Famine: lowData.Standard,
    Fear: lowData.Standard,
    Greed: lowData.Standard,
    Haunting: lowData.Standard,
    Locusts: lowData.Standard,
    Misery: lowData.Standard,
    Miserable: lowData.Standard,
    TwiceMiserable: lowData.Standard,
    Plague: lowData.Standard,
    Poverty: lowData.Standard,
    War: lowData.Standard,

    //Renaissance
    BorderGuard: lowData.Standard,
    Horn: lowData.Standard,
    Lantern: lowData.Standard,
    Ducat: lowData.Standard,
    Lackeys: lowData.Standard,
    ActingTroupe: lowData.Standard,
    CargoShip: lowData.Standard,
    Experiment: lowData.Standard,
    Improve: lowData.Standard,
    FlagBearer: lowData.Standard,
    Flag: lowData.Standard,
    Hideout: lowData.Standard,
    Inventor: lowData.Standard,
    MountainVillage: lowData.Standard,
    Patron: lowData.Standard,
    Priest: lowData.Standard,
    Research: lowData.Standard,
    SilkMerchant: lowData.Standard,
    OldWitch: lowData.Standard,
    Recruiter: lowData.Standard,
    Scepter: lowData.Standard,
    Scholar: lowData.Standard,
    Sculptor: lowData.Standard,
    Seer: lowData.Standard,
    Spices: lowData.Standard,
    Swashbuckler: lowData.Standard,
    TreasureChest: lowData.Standard,
    Treasurer: lowData.Standard,
    Key: lowData.Standard,
    Villain: lowData.Standard,

    //Projects:
    Cathedral: lowData.Standard,
    CityGate: lowData.Standard,
    Pageant: lowData.Standard,
    Sewers: lowData.Standard,
    StarChart: lowData.Standard,
    Exploration: lowData.Standard,
    Fair: lowData.Standard,
    Silos: lowData.Standard,
    SinisterPlot: lowData.Standard,
    Academy: lowData.Standard,
    Capitalism: lowData.Standard,
    Fleet: lowData.Standard,
    Guildhall: lowData.Standard,
    Piazza: lowData.Standard,
    RoadNetwork: lowData.Standard,
    Barracks: lowData.Standard,
    CropRotation: lowData.Standard,
    Innovation: lowData.Standard,
    Canal: lowData.Standard,
    Citadel: lowData.Standard,

    //Menagerie
    BlackCat: lowData.Standard,
    Sleigh: lowData.Standard,
    Supplies: lowData.Standard,
    CamelTrain: lowData.Standard,
    Goatherd: lowData.Standard,
    Scrap: lowData.Standard,
    Sheepdog: lowData.Standard,
    SnowyVillage: lowData.Standard,
    Stockpile: lowData.Standard,
    Horse: lowData.Standard,
    BountyHunter: lowData.Standard,
    Cardinal: lowData.Standard,
    Cavalry: lowData.Standard,
    Groom: lowData.Standard,
    Hostelry: lowData.Standard,
    VillageGreen: lowData.Standard,
    Barge: lowData.Standard,
    Coven: lowData.Standard,
    Displace: lowData.Standard,
    Falconer: lowData.Standard,
    Gatekeeper: lowData.Standard,
    HuntingLodge: lowData.Standard,
    Kiln: lowData.Standard,
    Livery: lowData.Standard,
    Mastermind: lowData.Standard,
    Paddock: lowData.Standard,
    Sanctuary: lowData.Standard,
    Fisherman: lowData.Standard,
    Destrier: lowData.Standard,
    Wayfarer: lowData.Standard,
    AnimalFair: lowData.Standard,

    //Events:
    Delay: lowData.Standard,
    Desperation: lowData.Standard,
    Gamble: lowData.Standard,
    Pursue: lowData.Standard,
    Ride: lowData.Standard,
    Toil: lowData.Standard,
    Enhance: lowData.Standard,
    March: lowData.Standard,
    Transport: lowData.Standard,
    Banish: lowData.Standard,
    Bargain: lowData.Standard,
    Invest: lowData.Standard,
    SeizetheDay: lowData.Standard,
    Commerce: lowData.Standard,
    Demand: lowData.Standard,
    Stampede: lowData.Standard,
    Reap: lowData.Standard,
    Enclave: lowData.Standard,
    Alliance: lowData.Standard,
    Populate: lowData.Standard,

    //Ways:
    WayOfButterfly: lowData.Standard,
    WayOfCamel: lowData.Standard,
    WayOfChameleon: lowData.Standard,
    WayOfFrog: lowData.Standard,
    WayOfGoat: lowData.Standard,
    WayOfHorse: lowData.Standard,
    WayOfMole: lowData.Standard,
    WayOfMonkey: lowData.Standard,
    WayOfMouse: lowData.Standard,
    WayOfMule: lowData.Standard,
    WayOfOtter: lowData.Standard,
    WayOfOwl: lowData.Standard,
    WayOfOx: lowData.Standard,
    WayOfPig: lowData.Standard,
    WayOfRat: lowData.Standard,
    WayOfSeal: lowData.Standard,
    WayOfSheep: lowData.Standard,
    WayOfSquirrel: lowData.Standard,
    WayOfTurtle: lowData.Standard,
    WayOfWorm: lowData.Standard,

    //Allies
    Bauble: lowData.Standard,
    Sycophant: lowData.Standard,
    Townsfolk: lowData.Standard,
    TownCrier: lowData.Standard,
    Blacksmith: lowData.Standard,
    Miller: lowData.Standard,
    Elder: lowData.Standard,
    Augurs: lowData.Standard,
    HerbGatherer: lowData.Standard,
    Acolyte: lowData.Standard,
    Sorceress: lowData.Standard,
    Sibyl: lowData.Standard,
    Clashes: lowData.Standard,
    BattlePlan: lowData.Standard,
    Archer: lowData.Standard,
    Warlord: lowData.Standard,
    Territory: lowData.Standard,
    FortsTent: lowData.Standard,
    Garrison: lowData.Standard,
    HillFort: lowData.Standard,
    Stronghold: lowData.Standard,
    Importer: lowData.Standard,
    MerchantCamp: lowData.Standard,
    Odysseys: lowData.Standard,
    OldMap: lowData.Standard,
    Voyage: lowData.Standard,
    SunkenTreasure: lowData.Standard,
    DistantShore: lowData.Standard,
    Sentinel: lowData.Standard,
    Underling: lowData.Standard,
    Wizards: lowData.Standard,
    Student: lowData.Standard,
    Conjurer: lowData.Standard,
    Sorcerer: lowData.Standard,
    Lich: lowData.Standard,
    Broker: lowData.Standard,
    Carpenter: lowData.Standard,
    Courier: lowData.Standard,
    Innkeeper: lowData.Standard,
    RoyalGalley: lowData.Standard,
    Town: lowData.Standard,
    Barbarian: lowData.Standard,
    CapitalCity: lowData.Standard,
    Contract: lowData.Standard,
    Emissary: lowData.Standard,
    Galleria: lowData.Standard,
    Guildmaster: lowData.Standard,
    Highwayman: lowData.Standard,
    Hunter: lowData.Standard,
    Modify: lowData.Standard,
    Skirmisher: lowData.Standard,
    Specialist: lowData.Standard,
    Swap: lowData.Standard,
    Marquis: lowData.Standard,

    //Allies:
    ArchitectsGuild: lowData.Standard,
    BandofNomads: lowData.Standard,
    CaveDwellers: lowData.Standard,
    CircleofWitches: lowData.Standard,
    Citystate: lowData.Standard,
    CoastalHaven: lowData.Standard,
    CraftersGuild: lowData.Standard,
    DesertGuides: lowData.Standard,
    FamilyofInventors: lowData.Standard,
    FellowshipofScribes: lowData.Standard,
    ForestDwellers: lowData.Standard,
    GangofPickpockets: lowData.Standard,
    IslandFolk: lowData.Standard,
    LeagueofBankers: lowData.Standard,
    LeagueofShopkeepers: lowData.Standard,
    MarketTowns: lowData.Standard,
    MountainFolk: lowData.Standard,
    OrderofAstrologers: lowData.Standard,
    OrderofMasons: lowData.Standard,
    PeacefulCult: lowData.Standard,
    PlateauShepherds: lowData.Standard,
    TrappersLodge: lowData.Standard,
    WoodworkersGuild: lowData.Standard,

    //Plunder
    Cage: lowData.Standard,
    Grotto: lowData.Standard,
    JewelledEgg: lowData.Standard,
    Search: lowData.Standard,
    Shaman: lowData.Standard,
    SecludedShrine: lowData.Standard,
    Siren: lowData.Standard,
    Stowaway: lowData.Standard,
    Taskmaster: lowData.Standard,
    Abundance: lowData.Standard,
    CabinBoy: lowData.Standard,
    Crucible: lowData.Standard,
    Flagship: lowData.Standard,
    FortuneHunter: lowData.Standard,
    Gondola: lowData.Standard,
    HarborVillage: lowData.Standard,
    LandingParty: lowData.Standard,
    Mapmaker: lowData.Standard,
    Maroon: lowData.Standard,
    Rope: lowData.Standard,
    SwampShacks: lowData.Standard,
    Tools: lowData.Standard,
    BuriedTreasure: lowData.Standard,
    Crew: lowData.Standard,
    Cutthroat: lowData.Standard,
    Enlarge: lowData.Standard,
    Figurine: lowData.Standard,
    FirstMate: lowData.Standard,
    Frigate: lowData.Standard,
    Longship: lowData.Standard,
    MiningRoad: lowData.Standard,
    Pendant: lowData.Standard,
    Pickaxe: lowData.Standard,
    Pilgrim: lowData.Standard,
    Quartermaster: lowData.Standard,
    SilverMine: lowData.Standard,
    Trickster: lowData.Standard,
    WealthyVillage: lowData.Standard,
    SackofLoot: lowData.Standard,
    KingsCache: lowData.Standard,

    //Loots
    Amphora: lowData.Standard,
    Doubloons: lowData.Standard,
    EndlessChalice: lowData.Standard,
    Figurehead: lowData.Standard,
    Hammer: lowData.Standard,
    Insignia: lowData.Standard,
    Jewels: lowData.Standard,
    Orb: lowData.Standard,
    PrizeGoat: lowData.Standard,
    PuzzleBox: lowData.Standard,
    Sextant: lowData.Standard,
    Shield: lowData.Standard,
    SpellScroll: lowData.Standard,
    Staff: lowData.Standard,
    Sword: lowData.Standard,

    //Events:
    Bury: lowData.Standard,
    Avoid: lowData.Standard,
    Deliver: lowData.Standard,
    Peril: lowData.Standard,
    Rush: lowData.Standard,
    Foray: lowData.Standard,
    Launch: lowData.Standard,
    Mirror: lowData.Standard,
    Prepare: lowData.Standard,
    Scrounge: lowData.Standard,
    Maelstrom: lowData.Standard,
    Journey: lowData.Standard,
    Looting: lowData.Standard,
    Invasion: lowData.Standard,
    Prosper: lowData.Standard,

    //Traits:Cheap
    Cursed: lowData.Standard,
    Fated: lowData.Standard,
    Fawning: lowData.Standard,
    Friendly: lowData.Standard,
    Hasty: lowData.Standard,
    Inherited: lowData.Standard,
    Inspiring: lowData.Standard,
    Nearby: lowData.Standard,
    Patient: lowData.Standard,
    Pious: lowData.Standard,
    Reckless: lowData.Standard,
    Rich: lowData.Standard,
    Shy: lowData.Standard,
    Tireless: lowData.Standard,

    //RisingSun
    MountainShrine: lowData.Standard,
    Daimyo: lowData.Standard,
    Artist: lowData.Standard,
    Fishmonger: lowData.Standard,
    SnakeWitch: lowData.Standard,
    Aristocrat: lowData.Standard,
    Craftsman: lowData.Standard,
    Riverboat: lowData.Standard,
    RootCellar: lowData.Standard,
    Alley: lowData.Standard,
    Change: lowData.Standard,
    Ninja: lowData.Standard,
    Poet: lowData.Standard,
    RiverShrine: lowData.Standard,
    RusticVillage: lowData.Standard,
    GoldMine: lowData.Standard,
    ImperialEnvoy: lowData.Standard,
    Kitsune: lowData.Standard,
    Litter: lowData.Standard,
    RiceBroker: lowData.Standard,
    Ronin: lowData.Standard,
    Tanuki: lowData.Standard,
    TeaHouse: lowData.Standard,
    Samurai: lowData.Standard,
    Rice: lowData.Standard,

    //Events:
    Continue: lowData.Standard,
    Amass: lowData.Standard,
    Asceticism: lowData.Standard,
    Credit: lowData.Standard,
    Foresight: lowData.Standard,
    Kintsugi: lowData.Standard,
    Practice: lowData.Standard,
    SeaTrade: lowData.Standard,
    ReceiveTribute: lowData.Standard,
    Gather: lowData.Standard,

    //Prophecies:
    ApproachingArmy: lowData.Standard,
    BidingTime: lowData.Standard,
    Bureaucracy: lowData.Standard,
    DivineWind: lowData.Standard,
    Enlightenment: lowData.Standard,
    FlourishingTrade: lowData.Standard,
    GoodHarvest: lowData.Standard,
    GreatLeader: lowData.Standard,
    Growth: lowData.Standard,
    HarshWinter: lowData.Standard,
    KindEmperor: lowData.Standard,
    Panic: lowData.Standard,
    Progress: lowData.Standard,
    RapidExpansion: lowData.Standard,
    Sickness: lowData.Standard,

    //Promo
    BlackMarket: lowData.Standard,
    Church: lowData.Standard,
    Dismantle: lowData.Standard,
    Envoy: lowData.Standard,
    Sauna: lowData.Standard,
    Avanto: lowData.Standard,
    WalledVillage: lowData.Standard,
    Governor: lowData.Standard,
    Marchland: lowData.Standard,
    Stash: lowData.Standard,
    Captain: lowData.Standard,
    Prince: lowData.Standard,

    //Events:
    Summon: lowData.Standard,


};



