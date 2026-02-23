import os
class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY","dev-secret")
    JWT_SECRET_KEY = os.environ.get("JWT-SECRET-KEY","dev-jwt-secret")

    SQLALCHEMY_DATABASE_URI = (
    "mssql+pyodbc://@localhost/TaskFlowDB"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"
)

    SQLALCHEMY_TRACK_MODIFICATIONS = False