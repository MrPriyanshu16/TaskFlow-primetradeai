from extensions import db
from datetime import datetime

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    tasks = db.relationship("Task", backref="user", lazy=True)


class Task(db.Model):
    __tablename__ = "task"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)

    completed = db.Column(db.Boolean, default=False)

    priority = db.Column(db.String(20), default="Medium")
    due_date = db.Column(db.Date, nullable=True)           

    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)