#!/bin/bash

readonly URI_REGEX='postgres:\/\/(.+):(.+)@(.+):(.+)\/(.+)'
# readonly URI_REGEX = 'postgres://jakjdxcyqyckav:cb49de1aea2d502a7771bb8b0e752fda82e8edac1fad6dc2f5bb513ba728d8be@ec2-34-231-221-151.compute-1.amazonaws.com:5432/d3mc55hl0nl1hc'

[[ $DATABASE_URL =~ $URI_REGEX ]]
export POSTGRE_USER="${BASH_REMATCH[1]}"
export POSTGRE_PASSWORD="${BASH_REMATCH[2]}"
export POSTGRE_NAME="${BASH_REMATCH[5]}"
export POSTGRE_HOST="${BASH_REMATCH[3]}"
export POSTGRE_PORT="${BASH_REMATCH[4]}"
export DJANGO_DB='default'

./deploy/docker-entrypoint.sh label-studio \
  --host ${HOST:-""} \
  --port ${PORT} \
  --username ${USERNAME} \
  --password ${PASSWORD}
