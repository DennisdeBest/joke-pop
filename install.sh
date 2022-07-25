#!/bin/sh
set -e

wget -c https://github.com/DennisdeBest/joke-pop/releases/latest/download/joke-pop-linux-amd64 -O /usr/local/bin/joke-pop
chmod +x /usr/local/bin/joke-pop