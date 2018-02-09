# -*- coding: utf-8 -*-


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
    @expose('booklist.html')
    def index(self):
        return {'resource':
                    {'register': '注 册',
                     'login': '登 录',
                     'logout': '登 出',
                     'username': '用户名',
                     'password': '密  码',
                     'search': '查 找',
                     'op': '操 作',
                     'delete': '删除',
                     'modify': '修改',
                     'addbook': '添加新书',
                     'ok': '确 定',
                     'continue': '继 续',
                     'reset': '重 置',
                     'back': '返 回',
                     'index': '序 号',
                     'bookname': '书 名',
                     'bookseries': '系 列',
                     'bookauthor': '作 者',
                     'barcode': '条 码',
                     'bookowner': '所有人',
                     'bookcreate': '上架时间',
                     'bookstatus': '当前状态',
                     'booklastmodified': '最后更新时间',
                     },
                'books':Book.find_all()}

    # HTTP POST <k=v> ...
    @index.when(method='POST', template='json')
    def index_post(self, **kws):
        return Book.add(**kws)

