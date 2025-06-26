from flask import Blueprint, jsonify, request
from extensions import db
from models.event import event
from models.user import User
from flask_jwt_extended import jwt_required, get_jwt_identity
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


@events_bp.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event_instance = event.query.get(event_id)
    if not event_instance:
        return {"msg": "Événement non trouvé"}, 404
    event_dict = event_instance.to_dict()
    # Ajoute la liste des participants (usernames)
    event_dict["participants"] = [u.username for u in event_instance.participants]
    return event_dict, 200


@events_bp.route("/events/<int:event_id>/participate", methods=["POST"])
@jwt_required()
def participate_event(event_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    event_instance = event.query.get(event_id)
    if not user or not event_instance:
        return {"msg": "Utilisateur ou événement introuvable"}, 404
    if event_instance in user.events_participated:
        return {"msg": "Déjà inscrit à cet événement"}, 400
    user.events_participated.append(event_instance)
    db.session.commit()
    return {"msg": "Participation enregistrée"}, 200


@events_bp.route("/events/<int:event_id>/unparticipate", methods=["POST"])
@jwt_required()
def unparticipate_event(event_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    event_instance = event.query.get(event_id)
    if not user or not event_instance:
        return {"msg": "Utilisateur ou événement introuvable"}, 404
    if event_instance not in user.events_participated:
        return {"msg": "Pas inscrit à cet événement"}, 400
    user.events_participated.remove(event_instance)
    db.session.commit()
    return {"msg": "Participation annulée"}, 200
