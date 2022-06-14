# go-next-portfolio

[ポートフォリオサイト](https://frontend-cc4oe6q3aa-an.a.run.app/)

## Golang + Next.jsによるポートフォリオサイト

DBはmysqlでHerokuを使用しています。

Golangはクリーンアーキテクチャを採用しています。
デプロイ先はGCPのCloud Runでサーバレスで運用しています。
また、CRUDの内CUDに関してはAPI GatewayでGoogle IDによるOAuth認証をかけています。

TypescriptはNext.jsを使用しています。
SSRで生成し、Cloud Runでサーバレスで運用しています。
CRUDの内CUDを操作出来るAdminページは同じくGoogle IDによるOAuth認証をかけています。

## ディレクトリ構成

```bash
.
├── docs       # ドキュメント
├── infra      # インフラ
├── script     # スクリプト
├── go         # バックエンド
└── typescript # フロントエンド
```

## アーキテクチャ図

![](docs/architecture.png)

## 詳細

[golangの詳細](https://github.com/Jyury11/go-next-portfolio/tree/main/go)
[next.jsの詳細](https://github.com/Jyury11/go-next-portfolio/tree/main/typescript)
