from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Task

tasks_bp = Blueprint("tasks", __name__)

@tasks_bp.route("/", methods=["POST"])
@jwt_required()
def create_task():
    user_id = int(get_jwt_identity())
    data = request.get_json()

    title = data.get("title")
    priority = data.get("priority", "Medium")
    due_date = data.get("due_date")
    if not title:
        return jsonify({"message": "Title is required"}), 400

    from datetime import datetime
    parsed_date = None
    if due_date:
        parsed_date = datetime.strptime(due_date, "%Y-%m-%d").date()

    new_task = Task(
        title=title,
        priority=priority,
        due_date=parsed_date,
        user_id=user_id
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created"}), 201

#Task completed
@tasks_bp.route("/", methods=["GET"])
@jwt_required()
def get_tasks():
    user_id = int(get_jwt_identity())

    tasks = Task.query.filter_by(user_id=user_id).all()

    result = []
    for task in tasks:
        result.append({
            "id": task.id,
            "title": task.title,
            "completed": task.completed,
            "priority": task.priority,
            "due_date": task.due_date.strftime("%Y-%m-%d") if task.due_date else None
        })

    return jsonify(result), 200

#Update task
@tasks_bp.route("/<int:task_id>", methods=["PUT"])
@jwt_required()
def update_task(task_id):
    user_id = int(get_jwt_identity())
    data = request.get_json()

    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    task.title = data.get("title", task.title)
    task.completed = data.get("completed", task.completed)
    task.priority = data.get("priority", task.priority)

    from datetime import datetime
    if data.get("due_date"):
        task.due_date = datetime.strptime(data["due_date"], "%Y-%m-%d").date()

    db.session.commit()

    return jsonify({"message": "Task updated"})

#Delete Task
@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
@jwt_required()
def delete_task(task_id):
    user_id = int(get_jwt_identity())

    task = Task.query.filter_by(id=task_id, user_id=user_id).first()

    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"}), 200