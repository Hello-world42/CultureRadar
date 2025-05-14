from flask import Blueprint, jsonify, request
from extensions import db
from models.event import event

events_bp = Blueprint("events", __name__)


@events_bp.route("/events", methods=["GET"])
def get_events():
    events = event.query.all()
    return jsonify([event.to_dict() for event in events]), 200


@events_bp.route("/events", methods=["POST"])
def add_event():
    data = request.get_json()
    new_event = event(
        title=data["title"],
        author=data["author"],
        date=data.get("date"),  # Changed from publication_year to date
        genre=data.get("genre"),
        description=data.get("description"),
        cover_image=data.get("cover_image"),
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201


@events_bp.route("/events/<int:id>", methods=["GET"])
def get_event_by_id(id):
    event_instance = event.query.get_or_404(id)  # Renamed the local variable
    return jsonify(event_instance.to_dict()), 200
