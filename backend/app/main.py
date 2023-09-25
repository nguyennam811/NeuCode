from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import root_router

app = FastAPI(
    title='NeuCode',
    description='Greet uses with a nice message'
)

app.include_router(root_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
