# Generated by Django 5.0.4 on 2024-05-30 10:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_challenge_question'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenge',
            name='title',
            field=models.CharField(default='Challenge', max_length=200),
        ),
    ]
