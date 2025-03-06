# 拡張性高いRAGシステム - クイックスタートガイド

## 必要条件

- DockerとDocker Compose
- Node.js 20+とnpm（ローカル開発時）
- Python 3.11+（ローカル開発時）

## クイックスタート

### 1. Docker Composeで簡易実行

このシステムは、Docker Composeを使用して簡単に起動することができます：

```bash
# リポジトリのクローン
git clone https://github.com/takuyakubo/extensible-rag-template-implementation.git
cd extensible-rag-template-implementation

# Docker Composeでシステムを起動
docker-compose up -d
```

Navigate to http://localhost:3000 to see the frontend.

### 2. 開発環境のセットアップ（フル機能）

適切な機能テストや開発を行うには、開発環境用のDocker Composeを使用します：

```bash
# 開発環境を起動
docker-compose -f docker-compose.dev.yml up -d
```

これにより、すべてのマイクロサービスが独立したコンテナで起動します。

### 3. ローカルでの開発（フロントエンド）

フロントエンドをローカルで開発する場合：

```bash
cd frontend
npm install
npm run dev
```

### 4. ローカルでの開発（バックエンド）

バックエンドサービスをローカルで開発する場合（例：APIゲートウェイ）：

```bash
cd backend/api-gateway
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

## テストの実行

### フロントエンドテスト

```bash
cd frontend
npm test
```

### バックエンドテスト

```bash
cd backend/api-gateway  # や他のサービスディレクトリ
python -m pytest
```

## APIドキュメント

Swagger UIは以下のURLで利用可能です（サービスが起動している場合）：

- APIゲートウェイ: http://localhost:8000/docs
- 認証サービス: http://localhost:8001/docs
- RAGエンジン: http://localhost:8004/docs
- LLMサービス: http://localhost:8005/docs
