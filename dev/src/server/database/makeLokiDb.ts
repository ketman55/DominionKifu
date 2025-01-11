import Loki from 'lokijs';
import { GameLogInterface } from '../../webpack/interface/GameLogInterface';
import { CommentInterface } from '../../webpack/interface/CommentInterface';
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

    // GameLogコレクションの初期化
    let gameLog = db.getCollection<GameLogInterface>('gameLog');
    if (gameLog === null) {
        gameLog = db.addCollection('gameLog', {
            unique: ['gameNumber'] // 主キー
        });

        // 初期データの挿入
        gameLog.insert({ 
            gameNumber: '000000000', 
            gameSupply: 'sample',
            gameLog: 'sample'
        });
        console.log('new Database made successfully.');
    }

    // Commentコレクションの初期化
    let comment = db.getCollection<CommentInterface>('comment');
    if (comment === null) {
        comment = db.addCollection('comment');

        // 初期データの挿入
        let c = new Comment();

        comment.insert(c.getComment());
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