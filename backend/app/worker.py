import os
from redis import Redis
from rq import Worker, Queue, Connection  

listen = ['transactions']
redis_conn = Redis.from_url(os.getenv("REDIS_URL"))

if __name__ == '__main__':
    with Connection(redis_conn):
        worker = Worker(list(map(Queue, listen)))
        worker.work()
