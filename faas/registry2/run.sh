#!/bin/bash
set -euo pipefail
BaseDir=$(cd "$(dirname "$0")"; pwd)
cd ${BaseDir}

# pnpm run start 启动主服务
#   该服务提供的接口
curl http://localhost:8000/v1/healthcheck

curl http://localhost:8000/debug/db

curl http://localhost:8000/v1/registry

curl 'http://localhost:8000/register@0.1.0/mod.ts'

# pnpm run example 启动example
curl -v -H 'authorization: Bearer my_auth' -XPOST "http://localhost:18001/users/search?userId=1"

echo "done"