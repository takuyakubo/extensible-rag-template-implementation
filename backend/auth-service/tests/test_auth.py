import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock, MagicMock
from app.main import app
from app.config import settings
import jwt

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def mock_redis_manager():
    with patch("app.main.RedisManager") as mock:
        mock_instance = AsyncMock()
        mock.return_value = mock_instance
        mock_instance.connect = AsyncMock()
        mock_instance.disconnect = AsyncMock()
        mock_instance.set_token = AsyncMock()
        mock_instance.get_token = AsyncMock()
        mock_instance.delete_token = AsyncMock()
        yield mock_instance

def test_health_check(client):
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_login_successful(client, mock_redis_manager):
    # テストユーザーデータ
    test_user = {
        "email": "admin@example.com",
        "password": "password123"
    }
    
    # app.main.redis_manager をモックオブジェクトに置き換え
    app.state.redis_manager = mock_redis_manager
    
    # ログインリクエスト
    response = client.post("/auth/login", json=test_user)
    
    # アサーション
    assert response.status_code == 200
    assert "access_token" in response.json()
    assert "token_type" in response.json()
    assert response.json()["token_type"] == "bearer"
    assert "user" in response.json()
    assert response.json()["user"]["email"] == "admin@example.com"
    
    # トークンの検証
    token = response.json()["access_token"]
    payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    assert payload["sub"] == "admin@example.com"
    assert "id" in payload
    assert "role" in payload

def test_login_invalid_credentials(client, mock_redis_manager):
    # 誤ったユーザーデータ
    test_user = {
        "email": "wrong@example.com",
        "password": "wrongpassword"
    }
    
    # app.main.redis_manager をモックオブジェクトに置き換え
    app.state.redis_manager = mock_redis_manager
    
    # ログインリクエスト
    response = client.post("/auth/login", json=test_user)
    
    # アサーション
    assert response.status_code == 401
    assert "detail" in response.json()
    assert response.json()["detail"] == "Incorrect email or password"

def test_register(client):
    # テストユーザーデータ
    test_user = {
        "email": "newuser@example.com",
        "password": "password123",
        "name": "New User"
    }
    
    # 登録リクエスト
    response = client.post("/auth/register", json=test_user)
    
    # アサーション
    assert response.status_code == 200
    assert "message" in response.json()
    assert "user" in response.json()
    assert response.json()["user"]["email"] == "newuser@example.com"
    assert response.json()["user"]["full_name"] == "New User"
