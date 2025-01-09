import Loki from 'lokijs';
import { GameData } from '../../webpack/interface/GameData';
import { Comment } from '../../webpack/model/Comment';

let db: Loki;

// データベースの起動
export function startDb() {
    db = new Loki('dominionkifu.db', {
        autoload: true,
        autoloadCallback: databaseInitialize,
        autosave: true,
        autosaveInterval: 4000
    });
}

// dbオブジェクトの取得
export function getDb(): Loki {
    return db;
}

// データベースの初期化
function databaseInitialize() {
    let gameData = db.getCollection<GameData>('gameData');
    if (gameData === null) {
        gameData = db.addCollection('gameData', {
            unique: ['gameNumber'] // 主キー
        });

        // 初期データの挿入
        const comment = new Comment();

        gameData.insert({ 
            gameNumber: '000000000', 
            gameSupply: 'sample',
            gameLog: 'sample',
            comment: comment
         });
        console.log('new Database made successfully.');
    }

    // データベースを保存
    db.saveDatabase((err) => {
        if (err) {
            console.error('Error saving database:', err);
        } else {
            console.log('Database saved successfully.');
        }
    });
}