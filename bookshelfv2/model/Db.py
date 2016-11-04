from __future__ import print_function


from pecan import conf
from sqlalchemy import create_engine, Column, Integer, String, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


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

    def __repr__(self):
        return '<Book %s' % self.name


Session = sessionmaker()
engine = create_engine('sqlite:///%s' % conf.app.dbpath, echo=True)
Session.configure(bind=engine)


def gen_where_clause(condition=None):
    if condition is None:
        return ""

    def make_field(k, v):
        return "%s = %s" % (k, v) if k == 'id' else "%s = '%s'" % (k, v)

    clauses = [make_field(key, val) for key, val in condition.items()]

    return " AND ".join(clauses)


def search_book(condition=None):
    session = Session()

    books = session.query(Book)
    if condition is not None:
        where_clause = gen_where_clause(condition)
        books = books.filter(text(where_clause))

    return books.all()

"""
def add_book()
module.exports.addBook = function(name, series, author, barcode, owner,
                                  status, createdt, lastdt, callback ) {
    var db = new sqlite3.Database(settings.dbpath, function(err) {
        if (err)  return callback(err);

        var stmt = db.prepare("insert into books(" + bookFields + ")" +
                              " values (?,?,?,?,?,?,?,?,?)");

        stmt.run(null, name, series, author, barcode, owner,
                       status, createdt, lastdt);
        stmt.finalize();
        db.close();

        callback();

    });
};

"""
def delete_book(condition):
    where_clause = gen_where_clause(condition)

    sqlstr = "DELETE FROM books" + where_clause;
    print(sqlstr)

#    conn = sqlite3.connect(conf.app.dbpath)
#    cursor = conn.cursor()



