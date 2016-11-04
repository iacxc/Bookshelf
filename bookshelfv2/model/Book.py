import Db


def find_by_id(bookid):
    books = Db.search_book({'id': bookid})
    return books[0] if len(books) > 0 else dict()


def find_all():
    return Db.search_book()


def add(id_, name_, series_, author_, barcode_, owner_):
    book = Book(id_, name_, series_, author_, barcode_, owner_)
    Db.add_book(book.json())
    return book.json()


def delete(bookid):
    Db.delete_book({'id': bookid})

