# Generated by Django 4.2.6 on 2023-11-02 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotel_app', '0004_remove_guest_country'),
    ]

    operations = [
        migrations.AddField(
            model_name='guest',
            name='country',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='guest',
            name='about_info',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='guest',
            name='profile_picture',
            field=models.ImageField(blank=True, null=True, upload_to='profile_photos'),
        ),
    ]