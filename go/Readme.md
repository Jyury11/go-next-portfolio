# portfolio golang

## ディレクトリ構成

```bash
.
├── build       #ローカル環境構築ファイル
│   └── db
│   └── api
├── cmd         #アプリケーション エンドポイント
│   └── api          #APIエンドポイント
│       └── main.go
│       └── di       # DIコンテナ
├── internal    # APIサーバー実装
│   └── adapters      # Repository実装
│   └── entity        # Domain・Repository定義
│   └── handler       # Handler (クリーンアーキテクチャのController)
│   └── service       # Use Case
└── pkg         # 共通ライブラリ
    └── db
    └── http
```

## アーキテクチャ図

![](docs/portfolio.png)

## クラス図

```mermaid
classDiagram
  class GinHandler {
  }

  class PortfolioService {
  }

  class Repository {
    <<interface>>
  }

  class BunRepository {
  }

  GinHandler ..> PortfolioService
  PortfolioService ..> Repository
  Repository <|.. BunRepository
```
