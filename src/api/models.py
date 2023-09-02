from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class Booking (db.Model, SerializerMixin):
   __tablename__ = 'booking'
   id = db.Column(db.Integer, primary_key=True)
   owner= db.Column(db.Integer, ForeignKey('owner.id')) 
   keeper= db.Column(db.Integer, ForeignKey('keeper.id')) 
   
class Schedule(db.Model, SerializerMixin):
   __tablename__ = 'schedule'
   id = db.Column(db.Integer, primary_key=True)
   start_date =db.Column(db.Date, nullable =False)
   end_date =db.Column(db.Date, nullable =False)
   keeper= db.Column(db.Integer, ForeignKey('keeper.id')) 



class User(db.Model, SerializerMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(250), nullable=False)
    last_name = db.Column(db.String(250), nullable=False)
    document_id = db.Column(db.Integer, unique=True,  nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

class Owner (db.Model, SerializerMixin):
   __tablename__ = 'owner'
   id = db.Column(db.Integer, primary_key=True)
   user= db.Column(db.Integer, ForeignKey('user.id')) 
   
class Keeper (db.Model, SerializerMixin):
   __tablename__ = 'keeper'
   id = db.Column(db.Integer, primary_key=True)
   user= db.Column(db.Integer, ForeignKey('user.id'))  
   date_work= db.Column(db.Date, ForeignKey('datesRange.id'))
   daily_pay= db.Column(db.Integer, nullable=False)
   
  
class Category (str, Enum):
   small = 'small 0-15 lbs'
   medium = 'medium 16-40 lbs'
   large = 'large 41-100 lbs'
   giant = 'giant 101+ lbs'

   def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }