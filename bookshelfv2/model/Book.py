# -*- coding:utf8 -*-
#
from __future__ import print_function

import sys
import time

from pecan import conf
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm.exc import NoResultFound


reload(sys)
sys.setdefaultencoding('utf-8')

Base = declarative_base()


class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    series = Column(String)
    author = Column(String, nullable=False)
    barcode = Column(String)
    owner = Column(String)
    status = Column(String)
    createdate = Column(String)
    lastmodified = Column(String)

    def __init__(self, name, series, author, barcode, owner,
                 status='available'):
        self.name = name
        self.series = series
        self.author = author
        self.barcode = barcode
        self.owner = owner
        self.status = status
        today = time.strftime('%Y-%m-%d', time.localtime())
        self.createdate = today
        self.lastmodified = today

    def __repr__(self):
        return '<Book: %s (series: %s, author: %s)>' % (
            self.name, self.series, self.author)


engine = create_engine('sqlite:///%s' % conf.app.dbpath,
                       convert_unicode=True,
                       echo=True)
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
g_session = Session()


def gen_where_clause(condition=None):
    if condition is None:
        return ""

    def make_field(k, v):
        return "%s = %s" % (k, v) if k == 'id' else "%s = '%s'" % (k, v)

    clauses = [make_field(key, val) for key, val in condition.items()]

    return " AND ".join(clauses)


def search_book(condition=None):
    books = g_session.query(Book)

    if condition is not None:
        where_clause = gen_where_clause(condition)
        books = books.filter(text(where_clause))

    return books


def find_by_id(bookid):
    try:
        return search_book({'id': bookid}).one()
    except NoResultFound:
        return dict()


def find_all():
    return search_book().all()


def add(**kws):
    book = Book(**kws)

    g_session.add(book)
    g_session.commit()

    return g_session.query(Book).filter_by(name=book.name).one()


def delete(book):
    g_session.delete(book)
    g_session.commit()

    return dict()


def update(book, **kws):
    for k,v in kws.items():
        setattr(book, k, v)

    g_session.commit()

    return {'status': 'ok'}


