from back.app import app
from back.models.user import User

with app.app_context():
    users = User.query.all()
    for user in users:
        print(user.id, user.username, user.email, user.is_confirmed)