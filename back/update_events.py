from app import app
from extensions import db
from models.event import event
from datetime import date

# Update existing events in the database
with app.app_context():
    events = event.query.all()
    for e in events:
        if e.date is None:  # Check if the date is null
            e.date = date.today()  # Set to today's date or any default value
    db.session.commit()
    print("Updated all events with a default date.")
