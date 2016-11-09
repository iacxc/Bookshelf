from pecan import expose, redirect, abort
from webob.exc import status_map

from pecan import expose
from bookshelfv2.model import Book


class NullController(object):
    def __init__(self, *args, **kws):
        pass

    @expose()
    def index(self):
        return dict()


class BookController(object):
    def __init__(self, id_):
        self.id_ = id_
        self.book = Book.find_by_id(self.id_)
        assert self.book

    # HTTP GET <id>
    @expose('json', generic=True)
    def index(self):
        return self.book

    # HTTP POST <id> [[k=v]]...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        return Book.update(self.book, **kws)

    # HTTP DELETE <id>
    @index.when(method='DELETE', template='json')
    def index_delete(self):
        return Book.delete(self.book)


class RootController(object):

    @expose()
    def _lookup(self, id_, *remainder):
        try:
            return BookController(id_), remainder
        except AssertionError:
            return NullController(id_), remainder

    @expose(generic=True, template='json')
    def index(self):
        return Book.find_all()

    # HTTP POST <k=v> ...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        return Book.add(**kws)

    @expose('error.html')
    def error(self, status):
        try:
            status = int(status)
        except ValueError:  # pragma: no cover
            status = 500
        message = getattr(status_map.get(status), 'explanation', '')
        return dict(status=status, message=message)

