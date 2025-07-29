from back.app import app
from back.extensions import db
from back.models.event import event

def normalize_genre(genre):
    genre = genre.strip().lower()
    if genre.endswith("s") and len(genre) > 4 and " " not in genre:
        genre = genre[:-1]
    return genre.capitalize()

with app.app_context():
    events = event.query.all()
    for e in events:
        if e.genres:
            genres_list = [normalize_genre(g) for g in e.genres.split(",") if g.strip()]
            e.genres = ", ".join(sorted(set(genres_list)))
    db.session.commit()
    print("Genres normalisés et regroupés.")
