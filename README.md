# Wagtail API Playground

Wagtail の REST API と GraphQL を実験するためのプロジェクトです。

## 構成

```
wagtail-api-playground/
├── backend/          # Wagtail (Django) バックエンド
│   ├── config/       # Django設定
│   ├── home/         # サンプルアプリ
│   └── pyproject.toml
└── frontend/         # React (Vite) フロントエンド
    └── src/
```

## セットアップ

### バックエンド

```bash
cd backend

# 依存関係のインストール
uv sync

# マイグレーション
uv run python manage.py migrate

# 管理者ユーザー作成（初回のみ）
uv run python manage.py createsuperuser

# 開発サーバー起動
uv run python manage.py runserver
```

バックエンドは http://localhost:8000 で起動します。

### フロントエンド

```bash
cd frontend

# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

フロントエンドは http://localhost:5173 で起動します。

## エンドポイント

### REST API

- `GET /api/v2/pages/` - ページ一覧
- `GET /api/v2/pages/{id}/` - ページ詳細
- `GET /api/v2/images/` - 画像一覧
- `GET /api/v2/documents/` - ドキュメント一覧

### GraphQL

- `POST /graphql/` - GraphQL エンドポイント
- GraphQL Playground: http://localhost:8000/graphql/

サンプルクエリ:

```graphql
query {
  pages {
    id
    title
    slug
    pageType
  }
}
```

### 管理画面

- Wagtail Admin: http://localhost:8000/admin/
- Django Admin: http://localhost:8000/django-admin/

## モデル

`home/models.py` に以下のサンプルモデルがあります:

- `HomePage` - ホームページ（intro フィールド付き）
- `BlogPage` - ブログページ（date, intro, body フィールド付き）

これらのモデルは REST API と GraphQL の両方で公開されています。

## 技術スタック

### バックエンド
- Python 3.14
- Django 6.0
- Wagtail 7.2
- wagtail-grapple (GraphQL)
- django-cors-headers

### フロントエンド
- React 19
- TypeScript
- Vite
- Apollo Client (GraphQL)
