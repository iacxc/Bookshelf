from pecan import conf
import sqlite3

bookFields = ','.join(['id', 'name', 'series', 'author', 'barcode', 'owner',
                      'status', 'createdate', 'lastmodified'])


class Book(object):
    def __init__(self, id_, name_, series_, author_, barcode_, owner_, status_,
                createdate_, lastmodified_):



        self.id_           = id_
        self.name_         = name_
        self.series_       = series_
        self.author_       = author_
        self.barcode_      = barcode_
        self.owner_        = owner_
        self.status_       = status_
        self.createdate_   = createdate_
        self.lastmodified_ = lastmodified_

'''
module.exports.getAll = function(callback) {
db.getBooks(null, function(err, rows) {
var books = _.map(rows, function(row) {


return new
Book(row);
});
callback(err, books);
});
};

module.exports.search = function(option, callback)
{
    db.getBooks(option, function(err, rows)
{
return callback(err, rows);
});
};
'''
def find_by_id(bookid):
    conn = sqlite3.connect(conf.app.dbpath)
    cursor = conn.cursor()

    cursor.execute("SELECT " + bookFields + " from books" +
                    " where id='" + bookid + "' order by series, barcode, owner")

    row = cursor.fetchone()

    return Book(*row)

