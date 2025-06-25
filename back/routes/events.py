from flask import Blueprint, jsonify, request
from extensions import db
from models.event import event
from datetime import datetime

events_bp = Blueprint("events", __name__)


@events_bp.route("/events", methods=["POST"])
def add_event():
    data = request.get_json()
    date_debut = datetime.strptime(data["date_debut"], "%Y-%m-%d").date()
    date_fin = None
    if data.get("date_fin"):
        date_fin = datetime.strptime(data["date_fin"], "%Y-%m-%d").date()
    new_event = event(
        title=data["title"],
        author=data["author"],
        date_debut=date_debut,
        date_fin=date_fin,
        genre=data.get("genre"),
        description=data.get("description"),
        cover_image=data.get("cover_image"),
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201


@events_bp.route("/events", methods=["GET"])
def get_events():
    events = event.query.all()
    return jsonify([e.to_dict() for e in events]), 200


@events_bp.route("/events/<int:id>", methods=["DELETE"])
def delete_event(id):
    event_instance = event.query.get_or_404(id)
    db.session.delete(event_instance)
    db.session.commit()
    return jsonify({"message": "Event deleted"}), 200


@events_bp.route("/events/<int:id>", methods=["GET"])
def get_event(id):
    event_instance = event.query.get_or_404(id)
    return jsonify(event_instance.to_dict()), 200
