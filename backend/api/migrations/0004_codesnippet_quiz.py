# Generated by Django 5.0.4 on 2024-05-18 04:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_ans_codesnippet_test_results'),
    ]

    operations = [
        migrations.AddField(
            model_name='codesnippet',
            name='quiz',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.quiz'),
        ),
    ]