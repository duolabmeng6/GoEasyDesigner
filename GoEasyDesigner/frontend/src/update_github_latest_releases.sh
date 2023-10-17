#!/bin/bash

# 访问 https://api.github.com/repos/duolabmeng6/GoEasyDesigner/releases/latest 保存为 releases_latest.json

#curl -o releases_latest.json https://api.github.com/repos/duolabmeng6/GoEasyDesigner/releases/latest

# 检查 releases_latest.json 的修改时间，如果超过 1 天，则重新下载

#!/bin/bash
#!/bin/bash

JSON_FILE="releases_latest.json"
URL="https://api.github.com/repos/duolabmeng6/GoEasyDesigner/releases/latest"

# 检查文件是否存在并且修改时间是否超过1天
if [ -e "$JSON_FILE" ]; then
    # 获取文件的最后修改时间
    LAST_MODIFIED=""
    if command -v stat &> /dev/null; then
        # macOS
        LAST_MODIFIED=$(date -r "$JSON_FILE" +%s)
    elif command -v stat &> /dev/null; then
        # Linux
        LAST_MODIFIED=$(date -d "$(stat -c %y "$JSON_FILE")" +%s)
    fi

    CURRENT_TIME=$(date +%s)
    TIME_DIFF=$((CURRENT_TIME - LAST_MODIFIED))

    if [ $TIME_DIFF -gt 86400 ]; then
        # 文件超过1天，重新下载
        echo "文件超过1天未更新，重新下载..."
        curl -o "$JSON_FILE" "$URL"
    else
        echo "文件未超过1天，无需重新下载."
    fi
else
    # 文件不存在，直接下载
    echo "文件不存在，直接下载..."
    curl -o "$JSON_FILE" "$URL"
fi
