from back.app import app
from back.models.user import User

with app.app_context():
    users = User.query.all()
    for user in users:
        print(users.id, user.username, user.email, user.is_confirmed)