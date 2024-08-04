#!/bin/bash
set -euo pipefail
BaseDir=$(cd "$(dirname "$0")"; pwd)
cd ${BaseDir}

# registry2 服务需要先启动
curl -v -X POST -H 'content-type: application/json' http://localhost:8000/api/v1/timer/register -d @./test.json
