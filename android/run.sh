#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.darqs.jjrc/host.exp.exponent.MainActivity
