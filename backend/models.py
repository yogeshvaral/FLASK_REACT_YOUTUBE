from exts import db

"""
class Recipe:
    id:int primary key
    title:str
    descriptioj:str
"""

class Recipe(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    title = db.Column(db.String(),nullable=False)
    description=db.Column(db.String(),nullable=False)

    def __repr__(self):
        return f"<Recipe {self.title}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    def update(self,title,description):
        self.title = title
        self.description = description
        db.session.commit()

""" Class User:
    id:int primary key
    username:string
    password:string
    email:string
"""

class User(db.Model):
    id=db.Column(db.Integer(),primary_key=True)
    username = db.Column(db.String(),nullable=True,unique=True)
    password = db.Column(db.String(),nullable=False)
    email = db.Column(db.String(),nullable=False)
    

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()
