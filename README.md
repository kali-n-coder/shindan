# Type Compass

GitHub Pagesで公開できる、16タイプ風の性格診断プロトタイプです。
名前を入力して診断すると、結果がFirebase Realtime Databaseに保存されます。

## Files

- `index.html`: ページ構造
- `styles.css`: レイアウトと見た目
- `script.js`: 質問、スコアリング、Firebase保存
- `firebase.json`: Firebase CLI設定
- `database.rules.json`: Realtime Databaseの書き込みルール

## Firebase

- Project: `shindan-mbti-20260524`
- Database: `shindan-mbti-20260524-default-rtdb`
- 保存先: `/results`

ルールを反映する場合:

```bash
npx firebase-tools deploy --only database --project shindan-mbti-20260524
```

## Publish on GitHub Pages

1. このフォルダのファイルをGitHubリポジトリへpushします。
2. GitHubのリポジトリ設定から `Settings > Pages` を開きます。
3. `Deploy from a branch` を選び、公開したいブランチの `/root` を指定します。

公式MBTI診断ではなく、16タイプ風のセルフチェックとして表現しています。
