# Generated by Django 5.0.6 on 2024-05-28 18:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_answer_exercise_test_script'),
    ]

    operations = [
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.TextField()),
                ('answer', models.TextField()),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='lesson', to='api.lesson')),
            ],
        ),
    ]
