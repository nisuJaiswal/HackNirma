for installing requirements

```
pip install -r requirements.txt
```

docker commands:

docker run -p 6333:6333 \ -v $(pwd)/qdrant_storage:/qdrant/storage \ qdrant/qdrant

or

docker run -p 6333:6333 -v "$(pwd)/qdrant_storage:/qdrant/storage" qdrant/qdrant:latest
