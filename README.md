# DominionKifu

## サービスURL

WIP

## 概要

[Dominion Online](https://dominion.games/)のゲームログを1行ずつ追跡して状況を把握できるサービスです。

指定したログ行におけるサプライの残り枚数、プレイヤーの保有カード・枚数や各カードをプレーした回数などを確認することが出来ます。

* 自分と相手のカードの総プレー数、ドローした総枚数、獲得手数にはいくつの差があったのか？どこで差が付いたのか？
* ここで買った金貨は結局何回使うことが出来たのか？

こういったことを考察することが出来ます。

## 開発環境構築

- 事前準備
  - node.jsのインストール
    - [note.jsの公式サイト](https://nodejs.org/ja)

1. スクリプトのbuild

```
npm run webpack
```

2. ローカルで起動

  - 以下を実行後、http://localhost:3000 にアクセス

```
npm run app-launch
```
