# 拡張性高いRAGシステム - 実装

このリポジトリは、拡張性の高いRetrieval Augmented Generation (RAG)システムの実装です。様々なドキュメント形式に対応し、柔軟なカスタマイズが可能なRAG機能を提供します。

## プロジェクト概要

このシステムは以下の特徴を持ちます：

- 様々なドキュメント形式（PDF、DOCX、TXT、HTML等）のサポート
- 柔軟なチャンク分割と埋め込み生成
- 高度な検索機能（セマンティック検索、ハイブリッド検索）
- 複数のLLMプロバイダー対応
- プラグインアーキテクチャによる拡張性
- 管理機能と詳細な権限制御

## アーキテクチャ

システムは以下のコンポーネントから構成されます：

- **フロントエンド**: Next.js + React + TailwindCSS
- **バックエンド**: FastAPI + Python
- **データベース**: PostgreSQL
- **検索エンジン**: Elasticsearch（ベクトル検索機能）
- **ドキュメントストレージ**: S3互換ストレージ
- **非同期処理**: Celery + Redis

## 開発環境のセットアップ

### 前提条件

- Docker と Docker Compose
- Node.js 20+
- Python 3.11+

### ローカル開発環境の構築

```bash
# リポジトリのクローン
git clone https://github.com/takuyakubo/extensible-rag-template-implementation.git
cd extensible-rag-template-implementation

# Docker Composeで環境を起動
docker-compose up -d

# フロントエンド開発サーバーの起動
cd frontend
npm install
npm run dev

# バックエンド開発サーバーの起動
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

詳細な開発ガイドやシステム設計については、[ドキュメントディレクトリ](./docs)を参照してください。
