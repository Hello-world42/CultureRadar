from flask import Blueprint, jsonify, request
from back.extensions import db
from back.models.event import event
from back.models.user import User
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
    genres = data.get("genres", [])
    if isinstance(genres, list):
        genres_str = ",".join(genres)
    elif isinstance(genres, str):
        genres_str = genres
    else:
        genres_str = ""
    new_event = event(
        title=data["title"],
        author=data["author"],
        date_debut=date_debut,
        date_fin=date_fin,
        description=data.get("description"),
        cover_image=data.get("cover_image"),
        genres=genres_str,
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201


@events_bp.route("/events", methods=["GET"])
@jwt_required()
def get_events():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    user_prefs = user.preferences.split(",") if user.preferences else []
    events = event.query.all()
    filtered = []
    for ev in events:
        ev_genres = ev.genres.split(",") if ev.genres else []
        if ev.author == user.username or any(g in user_prefs for g in ev_genres):
            filtered.append(ev.to_dict())
    return jsonify(filtered)


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
