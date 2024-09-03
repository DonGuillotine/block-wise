# Generated by Django 5.1 on 2024-09-02 15:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lms_app', '0002_user_wallet_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='wallet_address',
            field=models.CharField(help_text='Blockchain wallet address', max_length=255, unique=True),
        ),
    ]
