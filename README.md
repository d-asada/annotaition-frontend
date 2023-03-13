# README

## ローカル起動コマンド

```
REACT_APP_API_URL=YOUR_API_URL npm run start
```

## デプロイ用build

```
REACT_APP_API_URL=YOUR_API_URL npm run build
```

でデプロイ用ビルドが作成されるので、
それをCloudFront＋S3や、nginxなどの任意のサーバを使ってサーブする。
