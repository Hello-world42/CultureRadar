from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db
from models.user import User

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if (
        User.query.filter_by(username=data["username"]).first()
        or User.query.filter_by(email=data["email"]).first()
    ):
        return jsonify({"msg": "L'utilisateur ou l'email existe déjà"}), 400

    user = User(username=data["username"], email=data["email"])
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Utilisateur créé avec succès"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.query.filter_by(username=data["username"]).first()

    if user and user.check_password(data["password"]):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200

    return jsonify({"msg": "Identifiants invalides"}), 401


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return {"msg": "Utilisateur non trouvé"}, 404
    user_dict = user.to_dict()
    # Ajoute la liste des événements où il participe
    user_dict["events_participated"] = [e.to_dict() for e in user.events_participated]
    return user_dict, 200


@auth_bp.route("/change-password", methods=["POST"])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Utilisateur non trouvé"}), 404

    data = request.get_json()
    new_password = data.get("new_password")
    if not new_password or len(new_password) < 6:
        return jsonify(
            {"msg": "Le mot de passe doit contenir au moins 6 caractères."}
        ), 400

    user.set_password(new_password)
    db.session.commit()
    return jsonify({"msg": "Mot de passe modifié avec succès."}), 200
