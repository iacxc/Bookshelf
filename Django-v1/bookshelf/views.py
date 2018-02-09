from django.shortcuts import render
from django.http import Http404
from django.views.decorators.http import require_GET

from .models import Book


# Create your views here.
app_name = 'bookshelf'
@require_GET
def index(request):
    return render(request, '%s/index.html' % app_name)


@require_GET
def detail(request, id):
    try:
        book = Book.objects.get(pk=id)
    except Book.DoesNotExist:
        raise Http404('Book does not exist')

    return render(request, '%s/detail.html' % app_name, 
                 {'title': 'Book Detail', 'book': book})