FROM python:3.11-slim

WORKDIR /app

COPY . /app

RUN pip3 install -r requirements.txt --no-cache-dir

ENTRYPOINT ["/app/entrypoint.sh"]