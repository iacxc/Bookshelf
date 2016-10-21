from pecan import expose, redirect, abort
from webob.exc import status_map

from bookshelfv2.model import Book

BOOKS = {
    '160' : 'Fish father',
    '170' : 'Eval doctor'
}

class BookController(object):
    def __init__(self, id_):
        self.id_ = id_
        assert self.book

    @property
    def book(self):
        print Book.find_by_id(self.id_)
        if self.id_ in BOOKS:
            return dict(id=self.id_, name=BOOKS[self.id_])
        abort(404)

    @expose(generic=True, template='json')
    def index(self):
        return self.book


class RootController(object):

    @expose()
    def _lookup(selfself, id_, *remainder):
        return BookController(id_), remainder

    @expose(generic=True, template='json')
    def index(self):
        return [dict(id=k, name=v) for k,v in BOOKS.items()]

    @index.when(method='POST')
    def index_post(self, q):
        redirect('https://pecan.readthedocs.io/en/latest/search.html?q=%s' % q)

    @expose('error.html')
    def error(self, status):
        try:
            status = int(status)
        except ValueError:  # pragma: no cover
            status = 500
        message = getattr(status_map.get(status), 'explanation', '')
        return dict(status=status, message=message)

    @expose(generic=True, template='json')
    def books(self):
        return [{'id' : k, 'name' : v} for k,v in BOOKS.items()]