#!/bin/bash
cd /home/kavia/workspace/code-generation/royal-movie-discover-222928-222938/movie_explorer_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

