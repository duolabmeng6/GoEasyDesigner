#!/bin/bash

APP_NAME="GoEasyDesigner"
APP_VERSION="$version"
DMG_NAME="${APP_NAME}-${APP_VERSION}.dmg"
TEMP_DIR="./install"

mkdir -p "${TEMP_DIR}"

cp -r "./${APP_NAME}.app" "${TEMP_DIR}"

# 创建 Applications 文件夹的快捷方式
ln -s "/Applications" "${TEMP_DIR}/Applications"

# 创建空的镜像文件
hdiutil create -srcfolder "${TEMP_DIR}" -volname "${APP_NAME}" -format UDZO "${DMG_NAME}"

echo "${DMG_NAME} 已经创建完成！"