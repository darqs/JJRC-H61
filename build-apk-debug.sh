#!/bin/bash

rm -rf app.apk
rm -rf ./android/app/build/intermediates/assets/debug/index.android.bundle
react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/build/intermediates/assets/debug/index.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

(cd android/ && ./gradlew clean assembleDebug)

cp android/app/build/outputs/apk/debug/app-debug.apk app.apk