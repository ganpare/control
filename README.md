# Control System

スクリプト実行を管理するためのWebベースのコントロールシステムです。Basic認証を使用してセキュアなスクリプト実行と管理を提供します。

## 概要

このプロジェクトは、ミニPC（Raspberry Pi、Rock Pi等）を自宅サーバーとして活用し、外出先からスマートフォンでスクリプトを実行・管理するための実験的なリポジトリです。Tailscaleを利用することで、安全なリモートアクセスを実現します。

### 想定される使用シナリオ
- 自宅サーバーの状態監視
- 家庭内IoTデバイスの制御
- バックアップスクリプトのリモート実行
- システムメンテナンス作業の自動化

## システム要件

- ミニPC（Raspberry Pi等）
- Tailscaleアカウントとセットアップ
- Python 3.x

## Tailscaleセットアップ

1. Tailscaleをインストール:
```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

2. Tailscaleにログイン:
```bash
sudo tailscale up
```

3. Tailscaleの状態確認:
```bash
tailscale status
```

セットアップ後は、TailscaleのIPアドレスを使用してアプリケーションにアクセスできます。

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