from flask_restx import Resource,Namespace,fields
from models import User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import (JWTManager,
create_access_token,create_refresh_token, get_jwt_identity,jwt_required)
from flask import Flask,request,jsonify,make_response

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
        return make_response(jsonify({"message":f"User create successfully"}),201)



@auth_ns.route('/login')
class login(Resource):
    @auth_ns.expect(login_model)
    def post(self):
        data = request.get_json()
        db_user = User.query.filter_by(username=data['username']).first()
        if db_user is not None and check_password_hash(db_user.password, data['password']):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return make_response(jsonify({"message":f"Login successfully","access_token":access_token, 
            "refresh_token":refresh_token,"refresh_token":refresh_token}),200)
        else:
            return make_response(jsonify({"message":f"Invalid username"}),400)

@auth_ns.route('/refresh')
class RefreshResource(Resource):
    @jwt_required(refresh=True)
    def post(self):
        current_user = get_jwt_identity() 

        new_access_token = create_access_token(identity=current_user)
        return make_response(jsonify({"access_token":new_access_token}),200)