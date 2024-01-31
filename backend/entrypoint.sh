#!/bin/bash

python manage.py migrate

python manage.py collectstatic --noinput

python manage.py loaddatautf8 core/data/dumps/init.json

exec daphne -b 0.0.0.0 -p 8241 project.asgi:application