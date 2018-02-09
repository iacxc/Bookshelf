from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import Author, Owner, Book


# Register your models here.
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('name', 'series', 'get_authors', 'owner', 'status')
    list_per_page = 30
    list_filter = ('series', 'status')
    list_editable = ('status',)
    search_fields = ('name', 'series', 'authors__name')
    actions_on_top = True
    actions_on_bottom = True


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(Owner)
class OwnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'cell_phone')
    list_editable = ('cell_phone',)


admin.site.site_header = 'Boolshelf 管理'
admin.site.site_title = 'Boolshelf 管理'

