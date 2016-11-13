from pecan import expose, redirect, abort

from Book import BookController
from User import UserController
from HpUser import HpUserController


class RootController(object):
    @expose(generic=True, template='json')
    def index(self):
        return 'Bookshelf app'


    @expose('error.html')
    def error(self, status):
        try:
            status = int(status)
        except ValueError:  # pragma: no cover
            status = 500
        message = getattr(status_map.get(status), 'explanation', '')
        return dict(status=status, message=message)

    book = BookController()
    user = UserController()
    hpuser = HpUserController()