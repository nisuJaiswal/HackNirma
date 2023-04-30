from typing import Union
from fastapi import FastAPI, Depends, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi import Request
import os
from qdrant import qdrantDatabase
from config import settings


app = FastAPI()

class UserQuery(BaseModel):
    query: str


origins = ["*"]

apna_database = qdrantDatabase(settings.qdrant_host, settings.qdrant_api_key, True)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )



@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload-file")
async def upload_file(request: Request, file: UploadFile= File(...)):
    filename = file.filename
    status = "success"
    print("====================hello======================")
    # print(file.size)

    try:
        filepath = os.path.join('documents', os.path.basename(filename))
        print(filepath)
        contents = await file.read()
        with open(filepath, 'wb') as f:
            f.write(contents)
            apna_database.insert_into_index(filepath, filename)

    except Exception as ex:
        print(str(ex))
        status = "error"
        if filepath is not None and os.path.exists(filepath):
            os.remove(filepath)


    return {"filename": filename, "status": status}

@app.get("/query")
async def query_index(query_string: str=None):
    print("this is the question======:",query_string)
    
    generated_response, relevant_docs = apna_database.generate_response(question=query_string)
    return {"response": generated_response, "relevant_docs": relevant_docs}

