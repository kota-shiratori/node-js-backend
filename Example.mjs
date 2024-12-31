import env from 'dotenv';
env.config();
import mongoose from 'mongoose';

// MongoDBに接続
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // SSL/TLS接続を有効化
    serverSelectionTimeoutMS: 10000, // 接続タイムアウト
}).then(() => {
    console.log('MongoDBに接続しました！');
}).catch((err) => {
    console.error('MongoDB接続エラー:', err);
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        required: true
    },
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true });

// モデル定義
const Book = mongoose.model('Book', bookSchema);

// データ保存処理
async function saveBook() {
    try {
        const book = new Book({
            title: 'テストブック',
            description: '説明欄',
            rating: 4,
            comment: 'コメント'
        });
        await book.save();
        console.log('Bookを保存しました！');
    } catch (err) {
        console.error('データ保存エラー:', err);
    } finally {
        mongoose.connection.close();
    }
}

// 実行
saveBook();