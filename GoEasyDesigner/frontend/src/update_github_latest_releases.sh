#!/bin/bash

# 访问 https://api.github.com/repos/duolabmeng6/GoEasyDesigner/releases/latest 保存为 releases_latest.json

#curl -o releases_latest.json https://api.github.com/repos/duolabmeng6/GoEasyDesigner/releases/latest

# 检查 releases_latest.json 的修改时间，如果超过 1 天，则重新下载

#!/bin/bash
#!/bin/bash

JSON_FILE="../public/releases_latest.json"
URL="https://api.github.com/repos/duolabmeng6/GoEasyDesigner/releases"

echo "正在下载最新的releases..."
curl -o "$JSON_FILE" "$URL"
cat $JSON_FILE
