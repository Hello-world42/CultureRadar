from extensions import db


class event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author = db.Column(db.String(120), nullable=False)
    date = db.Column(db.Date, nullable=True)  # Changed from publication_year to date
    genre = db.Column(db.String(100))
    description = db.Column(db.Text)
    cover_image = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "date": self.date.isoformat()
            if self.date
            else None,  # Ensure date is serialized
            "genre": self.genre,
            "description": self.description,
            "cover_image": self.cover_image,
        }
