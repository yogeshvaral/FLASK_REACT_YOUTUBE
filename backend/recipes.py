from flask_restx import Namespace,Resource,fields
from models import Recipe
from flask import request
from flask_jwt_extended import jwt_required
recipe_ns = Namespace('recipe',description='namespace for recipe')

recipe_model = recipe_ns.model(
    "Recipe",
    {
        "id":fields.Integer(),
        "title":fields.String(),
        "description":fields.String()
    }
)



@recipe_ns.route('/hello')
class HelloResouce(Resource):
    def get(self):
        return {"message":"Hello World"}

@recipe_ns.route('/recipies')
class RecipiesResouce(Resource):
    @recipe_ns.marshal_list_with(recipe_model)
    @recipe_ns.expect(recipe_model)
    def get(self):
        """Get all recipes from database"""
        recipies = Recipe.query.all()
        return recipies

    @recipe_ns.marshal_with(recipe_model)    
    @jwt_required()
    def post(self):
        """"Create new Recipe"""
        data = request.get_json()
        new_recipies = Recipe(
            title=data['title'],
            description=data['description']
        )    
        new_recipies.save()
        return new_recipies


@recipe_ns.route('/recipe/<int:id>')
class recipeResource(Resource):
    @recipe_ns.marshal_with(recipe_model)
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