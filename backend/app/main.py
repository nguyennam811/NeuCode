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
#
# [
#   {
#     "id": "1",
#     "fullname": "Nguyễn Văn Nam",
#     "email": "nam@gmail.com",
#     "password": "$2b$12$bPDyzhYAKmzAXY0pKyHs8O330tstCy16QpeNSFGZ8kb3EgmI2xOyW",
#     "role": "student"
#   },
#   {
#     "id": "2",
#     "fullname": "Nguyễn Quỳnh Mai",
#     "email": "mainq@gmail.com",
#     "password": "$2b$12$UWUVTP8yjtxqo/cMWhEfm.XGS57JaayIERpEN1Fadguplwipi6Pk2",
#     "role": "teacher"
#   },
#   {
#     "id": "3",
#     "fullname": "Nam Nguyễn",
#     "email": "namng@gmail.com",
#     "password": "$2b$12$3QcER75q3xRGgbNoHWVGnebvWrlJ5m55j/2A71TtBowH8v9HQKdbu",
#     "role": "admin"
#   },
#   {
#     "id": "4",
#     "fullname": "trầm toản",
#     "email": "toan@st.neu.edu.vn",
#     "password": "$2b$12$bDrdvgpJyFib6oOww2PmluhqZJqxjpYrYZEdY63Cj0TiVcco7KCQm",
#     "role": "teacher"
#   }
# ]