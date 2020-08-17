"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test.py


import os
from unittest import TestCase

from models import db, connect_db, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///capstone1_test"

# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class UserTestCase(TestCase):
    """Test views for User signup/ login/ logout."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        self.client = app.test_client()
        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser")
    db.session.commit()

    def tearDown(self):
        db.session.rollback()

    def test_signup(self):
        with self.client as c:
            resp = c.post("/signup", data={"username": "user9", "email" : "email@email.com", "password" : "hashedword"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)
            users = User.query.all()
            user = User.query.order_by(User.id.desc()).first()
            self.assertIn(user, users)

    def test_login(self):
        with self.client as c:
            resp = c.post("/login", data={"username": "testuser", "password" : "testuser"})
            self.assertEqual(resp.status_code, 302)

    def test_logout(self):
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id
            resp = c.get("/logout")
            self.assertEqual(resp.status_code, 302)