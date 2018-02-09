import datetime
from django.db import models

# Create your models here.
class Person(models.Model):
    name = models.CharField(max_length=30, unique=True)

    class Meta:
        abstract = True

    def __str__(self):
        return self.name


class Author(Person):
    class Meta:
        verbose_name = ('作者')
        verbose_name_plural = ('作者')


class Owner(Person):
    cell_phone = models.CharField(verbose_name='手机', blank=True, max_length=11)

    class Meta:
        verbose_name = ('所有者')
        verbose_name_plural = ('所有者')


class Book(models.Model):
    name = models.CharField(verbose_name='书名', max_length=80)
    barcode = models.CharField(verbose_name='条码', max_length=20)
    series = models.CharField(verbose_name='系列', max_length=100, blank=True)
    authors = models.ManyToManyField(Author, verbose_name='作者')
    owner = models.ForeignKey(Owner, on_delete=models.CASCADE, verbose_name='所有者')
    status = models.ForeignKey(Owner, on_delete=models.CASCADE, verbose_name='状态',
                               null=True, blank=True, 
                               related_name="%(app_label)s_%(class)s_related",
                               related_query_name="%(app_label)s_%(class)ss",
                               )
    create_date = models.DateField(verbose_name='上架日期')
    lastmodified = models.DateField(verbose_name='最后修改日期')

    class Meta:
        verbose_name = ('书籍')
        verbose_name_plural = ('书籍')

    def __str__(self):
        return '%s(%s)' % (self.name, self.series) 

    def save(self, *args, **kwargs):
        if self.id: # this an update
            self.lastmodified = datetime.date.today()
        super().save(*args, **kwargs)

    def get_authors(self):
        Book.objects.prefetch_related('authors')
        return ','.join(p.name for p in self.authors.all())

    get_authors.short_description = '作者'


