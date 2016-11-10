from pecan import expose

from bookshelfv2.model import User
from Null import NullController


class UserItemController(object):
    def __init__(self, id_):
        self.id = id_

    # HTTP GET <id>
    @expose('json', generic=True)
    def index(self):
        return User.find_by_id(self.id)

    # HTTP DELETE <id>
    @index.when(method='DELETE', template='json')
    def index_delete(self):
        return User.delete(self.id)

    # HTTP POST <id> [[k=v]]...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        return User.update(self.id, **kws)


class UserController(object):
    @expose()
    def _lookup(self, id_, *remainder):
        try:
            return UserItemController(id_), remainder
        except AssertionError:
            return NullController(id_), remainder

    # HTTP GET <id>
    @expose('json', generic=True)
    def index(self):
        return User.find_all()

    # HTTP POST <k=v> ...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        return User.add(**kws)

