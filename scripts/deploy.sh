npm rebuild node-sass
npm run build
rsync -rlOtcv --delete -e "ssh -p $PORT -i $IDENTITY" ./build/        $USER@$HOST:$REMOTE_ROOT
