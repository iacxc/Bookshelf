# -*- coding:utf8 -*-
#
from __future__ import print_function

import sys
import time

from pecan import conf
from sqlalchemy import create_engine, MetaData, Table, Column, String, text


reload(sys)
sys.setdefaultencoding('utf-8')

engine = create_engine('sqlite:///%s' % conf.app.dbpath,
                       convert_unicode=True,
                       echo=True)
meta = MetaData(engine)

users_table = Table('users', meta,
    Column('uid', String, primary_key=True),
    Column('password', String, nullable=False),
    Column('lastname', String, nullable=False),
    Column('firstname', String, nullable=False),
)


def find_by_id(uid):
    select_ = users_table.select(users_table.c.uid == uid)
    return select_.execute().fetchone()


def find_all():
    select_ = users_table.select()
    return select_.execute().fetchall()


def add(**kws):
    insert_ = users_table.insert()
    return insert_.execute(**kws)


def delete(uid):
    delete_ = users_table.delete(users_table.c.uid == uid)
    delete_.execute()

    return {'status': 'ok'}


def update(uid, **kws):
    update_ = users_table.update(users_table.c.uid == uid).values(**kws)
    update_.execute()

    return {'status': 'ok'}

