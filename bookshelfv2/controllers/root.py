from pecan import expose, redirect, abort
from webob.exc import status_map

from pecan import expose
from bookshelfv2.model import Book


class BookController(object):
    def __init__(self, id_):
        self.id_ = id_
        assert self.book

    @property
    def book(self):
        return Book.find_by_id(self.id_)

    # HTTP GET <id>
    @expose('json', generic=True)
    def index(self):
        return self.book

    # HTTP DELETE <id>
    @index.when(method='DELETE', template='json')
    def index_delete(self):
        Book.delete(self.id_)
        return dict()


    # HTTP PUT <id> [[k=v]]...
    @index.when(method='PUT', template='json')
    def index_put(self, **kws):
        return dict()


class RootController(object):

    @expose()
    def _lookup(self, id_, *remainder):
        return BookController(id_), remainder

    @expose(generic=True, template='json')
    def index(self):
        return Book.find_all()

    # HTTP POST <k=v> ...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        print(kws)
        return dict()

    @expose('error.html')
    def error(self, status):
        try:
            status = int(status)
        except ValueError:  # pragma: no cover
            status = 500
        message = getattr(status_map.get(status), 'explanation', '')
        return dict(status=status, message=message)

