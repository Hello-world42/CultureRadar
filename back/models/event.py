from back.extensions import db
from datetime import date
from flask_jwt_extended import jwt_required, get_jwt_identity
from back.models.user import User, participants


class event(db.Model):
    __tablename__ = "event"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    date_debut = db.Column(db.Date, nullable=False)
    date_fin = db.Column(db.Date, nullable=True)
    genres = db.Column(db.String(100))
    description = db.Column(db.Text)
    cover_image = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "date_debut": self.date_debut.isoformat() if self.date_debut else None,
            "date_fin": self.date_fin.isoformat() if self.date_fin else None,
            "genres": self.genres,
            "description": self.description,
            "cover_image": self.cover_image,
        }
