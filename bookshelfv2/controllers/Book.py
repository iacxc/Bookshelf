
from pecan import expose

from bookshelfv2.model import Book
from Null import NullController


class BookItemController(object):
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


class BookController(object):
    @expose()
    def _lookup(self, id_, *remainder):
        try:
            return BookItemController(id_), remainder
        except AssertionError:
            return NullController(id_), remainder

    @expose(generic=True, template='json')
    def index(self):
        return Book.find_all()

    # HTTP POST <k=v> ...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        return Book.add(**kws)

