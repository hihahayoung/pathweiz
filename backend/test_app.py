import pytest
from app import app
from unittest.mock import patch

@pytest.fixture
def client():
    """Test client for Flask app."""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


def test_submit_form_no_auth(client):
    """Test /submit_form without Authorization header."""
    response = client.post('/submit_form', json={})
    assert response.status_code == 500
    assert "Invalid Authorization header" in response.json["error"]


def test_submit_form_no_data(client):
    """Test /submit_form with no data."""
    headers = {"Authorization": "Bearer fake_token"}

    # Mock get_user_id_from_token to return a fake user_id
    with patch("app.get_user_id_from_token", return_value="test_user_id"):
        response = client.post('/submit_form', json={}, headers=headers)
        assert response.status_code == 500


def test_get_recommendations_no_auth(client):
    """Test /get_recommendations without Authorization header."""
    response = client.get('/get_recommendations')
    assert response.status_code == 500
    assert "Invalid Authorization header" in response.json["error"]


def test_get_action_items_missing_recommendation_id(client):
    """Test /get_action_items with no recommendation_id."""
    response = client.get('/get_action_items')
    assert response.status_code == 400
    assert response.json["error"] == "recommendation_id is required"
