from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from extensions import db  # Import db from extensions
from models.user import User  # Import User from models

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
