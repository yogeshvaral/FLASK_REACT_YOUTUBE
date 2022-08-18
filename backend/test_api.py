import email
import json
import unittest
from urllib import response
from config import TestConfig
from main import create_app
from exts import db


class APITestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client(self)

        with self.app.app_context():
            db.init_app(self.app)

            db.create_all()
    
     
    def test_hello_world(self):
        hello_response = self.client.get('/recipe/hello')
        json = hello_response.json

        self.assertEqual(json,{"message":"Hello World"})

    def test_signup(self):
        signup_response = self.client.post('/auth/signup',json={"username":"test","email":"test@example.com","password":"password"})
        status_code = signup_response.status_code
        self.assertEqual(status_code, 201)

    
    def test_login(self):
        signup_response = self.client.post('/auth/signup',json={"username":"test1","email":"test1@example.com","password":"password1"})
        login_response = self.client.post('/auth/login',json={"username":"test1","password":"password1"})
        status_code = login_response.status_code
        self.assertEqual(status_code, 200)

        login_response = self.client.post('/auth/login',json={"username":"test11","password":"password11"})
        status_code = login_response.status_code
        self.assertEqual(status_code, 400)

    def test_get_all_recipes(self):
        response = self.client.get('/recipe/recipies')
        print("ALl recipes")
        print(response.json)
        self.assertEqual(response.status_code, 200)

    def test_get_one_recipe(self):
        signup_response = self.client.post('/auth/signup',json={"username":"test1","email":"test1@example.com","password":"password1"})
        login_response = self.client.post('/auth/login',json={"username":"test1","password":"password1"})
        access_token = login_response.json['access_token']

        id = 1
        response = self.client.get(f"/recipe/recipe/{id}",
        headers={'Authorization': f'Bearer {access_token}'})
        # print("get one ")
        # print(response.json)
        self.assertEqual(response.status_code, 404)

    def test_create_recipe(self):
        signup_response = self.client.post('/auth/signup',json={"username":"test1","email":"test1@example.com","password":"password1"})
        login_response = self.client.post('/auth/login',json={"username":"test1","password":"password1"})
        access_token = login_response.json['access_token']
        create_recipe_response = self.client.post('recipe/recipies',
        json = {"title":"First Recipe", "description":"First Recipe Description"},
        headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(create_recipe_response.status_code, 200)
        # id = 1
        # response = self.client.get(f"/recipe/recipe/{id}",
        # headers={'Authorization': f'Bearer {access_token}'})
        # print("get one ")
        # print(response.json)
        # print(create_recipe_response.json)

    def test_update_recipe(self):
        signup_response = self.client.post('/auth/signup',json={"username":"test1","email":"test1@example.com","password":"password1"})
        login_response = self.client.post('/auth/login',json={"username":"test1","password":"password1"})
        access_token = login_response.json['access_token']
        create_recipe_response = self.client.post('recipe/recipies',
        json = {"title":"First Recipe", "description":"First Recipe Description"},
        headers={'Authorization': f'Bearer {access_token}'})
        id = 1
        update_recipe_response = self.client.put(f"/recipe/recipe/{id}",
        json = {"title":"First Recipe1", "description":"First Recipe Description1"},
        headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(update_recipe_response.status_code, 200)
        print(update_recipe_response.json)

    def test_delete_recipe(self):
        signup_response = self.client.post('/auth/signup',json={"username":"test1","email":"test1@example.com","password":"password1"})
        login_response = self.client.post('/auth/login',json={"username":"test1","password":"password1"})
        access_token = login_response.json['access_token']
        create_recipe_response = self.client.post('recipe/recipies',
        json = {"title":"First Recipe", "description":"First Recipe Description"},
        headers={'Authorization': f'Bearer {access_token}'})
        id = 1
        update_recipe_response = self.client.delete(f"/recipe/recipe/{id}",
        json = {"title":"First Recipe1", "description":"First Recipe Description1"},
        headers={'Authorization': f'Bearer {access_token}'})
        self.assertEqual(update_recipe_response.status_code, 200)
        # print(update_recipe_response.json)

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

if __name__ == '__main__':
    unittest.main()    