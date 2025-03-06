import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
from app.main import app

@pytest.fixture
def client():
    return TestClient(app)

def test_health_check(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

@patch("app.main.httpx.AsyncClient")
def test_login_endpoint(mock_client, client):
    # モックのHTTPクライアント設定
    mock_instance = AsyncMock()
    mock_client.return_value = mock_instance
    app.state.http_client = mock_instance
    
    # モックレスポンスの設定
    mock_response = AsyncMock()
    mock_response.json.return_value = {"access_token": "test_token", "token_type": "bearer"}
    mock_response.status_code = 200
    mock_instance.post.return_value = mock_response
    
    # テストリクエスト
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "password"}
    )
    
    # アサーション
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"

@patch("app.main.httpx.AsyncClient")
def test_error_handling(mock_client, client):
    # モックのHTTPクライアント設定
    mock_instance = AsyncMock()
    mock_client.return_value = mock_instance
    app.state.http_client = mock_instance
    
    # モックエラーの設定
    mock_instance.post.side_effect = Exception("Test error")
    
    # テストリクエスト
    response = client.post(
        "/api/auth/login",
        json={"email": "test@example.com", "password": "password"}
    )
    
    # アサーション
    assert response.status_code == 503
    assert "Authentication service unavailable" in response.json()["detail"]
