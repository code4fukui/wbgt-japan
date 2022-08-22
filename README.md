# wbgt-japan
 
## WBGT予測データ

- [最新のWBGT予測データ 毎時40分更新](data/yohou_data.csv) （[https://code4fukui.github.io/wbgt-japan/data/yohou_data.csv](https://code4fukui.github.io/wbgt-japan/data/yohou_data.csv))
- [WBGT予測データの推移](data/yohou)

## 参照データ

- [Station Number / 地点番号オープンデータ](https://code4fukui.github.io/jma_station/jma_station_active.csv) ([https://code4fukui.github.io/jma_station/jma_station_active.csv](https://code4fukui.github.io/jma_station/jma_station_active.csv)) [jma_station](https://github.com/code4fukui/jma_station)

## 自動更新設定

毎時40分に実行
```sh
mkdir .github
mkdir .github/workflows
cat << EOF > .github/workflows/scheduled-fetch.yml
name: Scheduled 

on:
  schedule:
    # 毎時40分に実行
    - cron: '40 * * * *'

jobs:
  build:
    name: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - name: fetch
        run: deno run -A download.js
      - name: commit and push
        run: |
          git config --global user.email "workflow@example.com"
          git config --global user.name "workflow user"
          git add .
          git commit -m 'update data' && git push ${REPO} HEAD:${{github.event.pull_request.head.ref}} || true
          git push
EOF
```
