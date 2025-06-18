#!/bin/bash
cd /home/kavia/workspace/code-generation/webtictactoe-61604-b2d6fb0b/webtictactoe
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

