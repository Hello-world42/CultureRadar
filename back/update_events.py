from back.app import app
from back.extensions import db
from back.models.event import event
from datetime import date

with app.app_context():
    events = event.query.all()
    for e in events:
        if e.date is None:
            e.date = date.today()
    db.session.commit()
    print("Updated all events with a default date.")
