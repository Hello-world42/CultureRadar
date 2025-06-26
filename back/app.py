from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from routes.events import events_bp
from extensions import db
from datetime import timedelta


app = Flask(__name__)
app.config.from_object(Config)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=72)
# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

# Import and register blueprints
from routes.auth import auth_bp
from routes.events import events_bp

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(events_bp, url_prefix="/api")

if __name__ == "__main__":
    app.run(debug=True)
