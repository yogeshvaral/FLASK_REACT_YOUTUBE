from flask import Flask,request,jsonify
from flask_restx import Api,Resource,fields
from config import DevConfig
from models import Recipe,User
from exts import db
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,jwt_required
app = Flask(__name__)
app.config.from_object(DevConfig)

db.init_app(app)
api = Api(app,doc='/docs')
migrate = Migrate(app,db)
jwt = JWTManager(app)
#model serializer for exposing our models as Json objects
recipe_model = api.model(
    "Recipe",
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)

signup_model = api.model(
    "SignUp",
    {
        "id":fields.Integer(),
        "username":fields.String(),
        "email":fields.String(),
        "password":fields.String()
    }
)

login_model = api.model(
    "Login",
    {
        "username":fields.String(),
        "password":fields.String()
    }
)

@api.route('/hello')
class HelloResouce(Resource):
    def get(self):
        return {"message":"Hello World"}


@api.route('/recipies')

class RecipiesResouce(Resource):
    @api.marshal_list_with(recipe_model)
    @api.expect(recipe_model)
    def get(self):
        """Get all recipes from database"""
        recipies = Recipe.query.all()
        return recipies
    @jwt_required()
    def post(self):
        """"Create new Recipe"""
        data = request.get_json()
        new_recipies = Recipe(
            title=data['title'],
            description=data['description']
        )    
        new_recipies.save()
    
@api.route('/recipe/<int:id>')
class recipeResource(Resource):
    @api.marshal_with(recipe_model)
    @jwt_required()
    def get(self, id):
        """Get a recipe from database by id"""
        recipe = Recipe.query.get_or_404(id)
        return recipe
    @jwt_required()
    def put(self,id):
        """Update Recipe"""
        data = request.get_json()
        recipe = Recipe.query.get_or_404(id)
        # recipe.title = data['title']
        # recipe.description = data['description']
        # recipe.save()
        recipe.update(data['title'],data['description'])
    @jwt_required()
    def delete(self,id):
        """Delete Recipe"""
        recipe = Recipe.query.get_or_404(id)
        recipe.delete()

@api.route('/signup')
class Signup(Resource):
    
    @api.expect(signup_model)
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

@api.route('/login')
class login(Resource):
    @api.expect(login_model)
    def post(self):
        data = request.get_json()
        db_user = User.query.filter_by(username=data['username']).first()
        if db_user is not None and check_password_hash(db_user.password, data['username']):
            access_token = create_access_token(identity=db_user.username)
            refresh_token = create_refresh_token(identity=db_user.username)
            return jsonify({"message":f"Login successfully","access_token":access_token, 
            "refresh_token":refresh_token,"refresh_token":refresh_token})


@app.shell_context_processor
def make_shell_context():
    return {
        "db": db,
        "Recipe": Recipe
    }

if __name__=='__main__':
    app.run()