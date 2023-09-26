from fastapi import APIRouter
from . import user, authentication, problem, submission

root_router = APIRouter()

@root_router.get('/info/', include_in_schema=False)
def root():
    return {'message': 'Ok'}


root_router.include_router(authentication.router, prefix='', tags=["Authn"])
root_router.include_router(problem.router, prefix='/api/problems', tags=["Problems"])
root_router.include_router(submission.router, prefix='/api/submissions', tags=["Submissions"])
root_router.include_router(user.router, prefix='/api/users', tags=["Users"])