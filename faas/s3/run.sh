#!/bin/bash
set -euo pipefail
BaseDir=$(cd "$(dirname "$0")"; pwd)
cd ${BaseDir}

curl http://localhost:18080/s3/v1/package.json -i
curl -X PUT http://localhost:18080/s3/v1/package.json --data-binary @package.json -iN

echo "done"