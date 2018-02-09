# Generated by Django 2.0.1 on 2018-01-14 06:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('bookshelf', '0003_auto_20180114_1117'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='author',
            options={'verbose_name': '作者', 'verbose_name_plural': '作者'},
        ),
        migrations.AlterModelOptions(
            name='book',
            options={'verbose_name': '书籍', 'verbose_name_plural': '书籍'},
        ),
        migrations.AlterModelOptions(
            name='owner',
            options={'verbose_name': '所有者', 'verbose_name_plural': '所有者'},
        ),
        migrations.AddField(
            model_name='owner',
            name='cell_phone',
            field=models.CharField(blank=True, max_length=11, verbose_name='手机'),
        ),
        migrations.AlterField(
            model_name='book',
            name='authors',
            field=models.ManyToManyField(to='bookshelf.Author', verbose_name='作者'),
        ),
        migrations.AlterField(
            model_name='book',
            name='barcode',
            field=models.CharField(max_length=20, verbose_name='条码'),
        ),
        migrations.AlterField(
            model_name='book',
            name='create_date',
            field=models.DateField(verbose_name='上架日期'),
        ),
        migrations.AlterField(
            model_name='book',
            name='lastmodified',
            field=models.DateField(verbose_name='最后修改日期'),
        ),
        migrations.AlterField(
            model_name='book',
            name='name',
            field=models.CharField(max_length=80, verbose_name='书名'),
        ),
        migrations.AlterField(
            model_name='book',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bookshelf.Owner', verbose_name='所有者'),
        ),
        migrations.AlterField(
            model_name='book',
            name='series',
            field=models.CharField(blank=True, max_length=100, verbose_name='系列'),
        ),
        migrations.AlterField(
            model_name='book',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bookshelf_book_related', related_query_name='bookshelf_books', to='bookshelf.Owner', verbose_name='状态'),
        ),
    ]
