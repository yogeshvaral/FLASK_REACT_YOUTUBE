from flask_restx import Resource,Namespace,fields
from models import User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required
from flask import Flask,request,jsonify

auth_ns = Namespace('auth',description='Namespace for authentication')

signup_model = auth_ns.model(
    "SignUp",
    {
        "id":fields.Integer(),
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model = auth_ns.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)

@auth_ns.route('/signup')
class Signup(Resource):
    
    @auth_ns.expect(signup_model)
    def post(self):
        data = request.get_json()
        new_username = data['username']
        db_user = User.query.filter_by(username=new_username).first()
        if db_user is not None:
            return jsonify({"Message":f"User {new_username} is already exists"})
        new_user = User(
            username=data['username'],
            email =data['email'],
            password=generate_password_hash(data['password'])
        )
        new_user.save()
        return jsonify({"message":f"User create successfully"})



@auth_ns.route('/login')
class login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        db_user = User.query.filter_by(username=data['username']).first()
        if db_user is not None and check_password_hash(db_user.password, data['username']):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return jsonify({"message":f"Login successfully","access_token":access_token, 
            "refresh_token":refresh_token,"refresh_token":refresh_token})
