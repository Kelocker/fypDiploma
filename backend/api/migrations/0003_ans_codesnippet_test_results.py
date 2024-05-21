# Generated by Django 5.0.4 on 2024-05-18 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_codesnippet'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ans',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.TextField()),
            ],
        ),
        migrations.AddField(
            model_name='codesnippet',
            name='test_results',
            field=models.JSONField(default=dict),
        ),
    ]