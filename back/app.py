from flask import Flask
from flask_migrate import Migrate
from back.extensions import db
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_mail import Mail
from back.config import Config
from datetime import timedelta

app = Flask(__name__)
app.config.from_object(Config)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=72)

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(
    app,
    origins=["https://cultureradar-front.onrender.com"],
    supports_credentials=True
)
mail = Mail(app)

# Forcer l'import des modèles pour Flask-Migrate
from back.models import user, event
from back.models.user import User
from back.models.event import event
from back.models.notification import Notification

from back.routes.auth import auth_bp
from back.routes.events import events_bp

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(events_bp, url_prefix="/api")


@app.route("/")
def index():
    return "API CultureRadar is running!"


if __name__ == "__main__":
    app.run(debug=True)
