# 開発ガイド

## 開発環境のセットアップ

### 前提条件

- Docker と Docker Compose
- Node.js 20+
- Python 3.11+

### 環境構築

```bash
# リポジトリのクローン
git clone https://github.com/takuyakubo/extensible-rag-template-implementation.git
cd extensible-rag-template-implementation

# Docker Composeで環境を起動
docker-compose up -d
```

### フロントエンド開発

```bash
cd frontend
npm install
npm run dev
```

### バックエンド開発

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

## テスト

### フロントエンドテスト

```bash
cd frontend
npm test          # 単体テスト
npm run test:e2e  # E2Eテスト
```

### バックエンドテスト

```bash
cd backend
python -m pytest
```

## コーディング規約

- **フロントエンド**: ESLint + Prettier
- **バックエンド**: Black + isort + Flake8

## コミット規約

コミットメッセージは以下の形式に従ってください：

```
<type>(<scope>): <subject>
```

例：
- `feat(auth): ログイン機能の実装`
- `fix(docs): READMEの誤字修正`
- `test(api): ユーザーAPIのテスト追加`