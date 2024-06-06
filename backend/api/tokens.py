from django.contrib.auth.tokens import PasswordResetTokenGenerator
from datetime import datetime

class OneDayPasswordResetTokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        login_timestamp = '' if user.last_login is None else user.last_login.replace(microsecond=0, tzinfo=None)
        return (
            str(user.pk) + user.password +
            str(login_timestamp) +
            str(timestamp) +
            str(datetime.now().day)
        )

token_generator = OneDayPasswordResetTokenGenerator()
