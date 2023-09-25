from fastapi import APIRouter
from . import user, authentication

root_router = APIRouter()

@root_router.get('/info/', include_in_schema=False)
def root():
    return {'message': 'Ok'}


root_router.include_router(authentication.router, prefix='', tags=["Authn"])
# root_router.include_router(blog.router, prefix='/api/blog', tags=["Blogs"])
root_router.include_router(user.router, prefix='/api/user', tags=["Users"])