# Control System

スクリプト実行を管理するためのWebベースのコントロールシステムです。Basic認証を使用してセキュアなスクリプト実行と管理を提供します。

## 機能

- WebUIを通じたスクリプト実行
- Basic認証によるセキュリティ保護
- スクリプト実行履歴の記録
- RESTful APIの提供

## セットアップ

1. 依存関係のインストール:
```bash
pip install -r requirements.txt
```

2. アプリケーションの起動:
```bash
python app.py
```

サーバーは `http://localhost:5000` で起動します。

## 認証情報

- ユーザー名: admin
- パスワード: secret

## API エンドポイント

- GET `/api/scripts` - 登録されているスクリプト一覧の取得
- POST `/api/run/<script_id>` - 指定されたスクリプトの実行
- GET `/api/logs` - 実行ログの取得

## ディレクトリ構造

```
.
├── app.py              # メインアプリケーション
├── requirements.txt    # Pythonパッケージの依存関係
├── scripts/           # 実行可能なスクリプト
│   ├── hello.sh
│   └── status.sh
└── static/           # 静的ファイル
    ├── index.html
    ├── js/
    │   ├── main.js
    │   └── sw.js
    └── manifest.json
```

## ライセンス

MIT