# Generated by Django 5.0.4 on 2024-05-30 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_answer_exercise_test_script'),
    ]

    operations = [
        migrations.AddField(
            model_name='challenge',
            name='question',
            field=models.TextField(default='test'),
            preserve_default=False,
        ),
    ]