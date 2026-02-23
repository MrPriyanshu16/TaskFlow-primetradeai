from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, jwt, bcrypt


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    CORS(app, resources = {r"/api/*":{"origins":"http://localhost:5173"}})

    import models
    from routes.auth import auth_bp
    from routes.tasks import tasks_bp
    
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(tasks_bp, url_prefix="/api/tasks")

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)