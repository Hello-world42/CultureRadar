import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    basedir = os.path.abspath(os.path.dirname(__file__))
    SECRET_KEY = os.getenv("SECRET_KEY")
    # SQLALCHEMY_DATABASE_URI = os.getenv("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_DATABASE_URI = (
        f"sqlite:///{os.path.join(basedir, 'instance', 'events.db')}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = (
        False if os.getenv("SQLALCHEMY_TRACK_MODIFICATIONS") == "False" else True
    )
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
