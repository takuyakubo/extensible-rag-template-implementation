import logging
from typing import Dict, List, Any, AsyncGenerator, Optional, Union
import json
import random
import numpy as np

logger = logging.getLogger(__name__)

class LLMManager:
    """
    LLMマネージャークラス
    異なるLLMプロバイダーへの統一インターフェースを提供する
    """
    
    def __init__(self, openai_api_key: str, anthropic_api_key: Optional[str] = None):
        self.openai_api_key = openai_api_key
        self.anthropic_api_key = anthropic_api_key
        
        # 実際の実装ではOpenAI APIクライアントやAnthropic APIクライアントを初期化
        # self.openai_client = OpenAI(api_key=openai_api_key)
        # self.anthropic_client = Anthropic(api_key=anthropic_api_key) if anthropic_api_key else None
        
        # サポートするモデルのリスト
        self.models = [
            {
                "id": "gpt-4",
                "provider": "openai",
                "type": "chat",
                "description": "OpenAIのGPT-4モデル",
                "capabilities": ["chat", "coding", "reasoning"],
                "max_tokens": 8192
            },
            {
                "id": "gpt-3.5-turbo",
                "provider": "openai",
                "type": "chat",
                "description": "OpenAIのGPT-3.5 Turboモデル",
                "capabilities": ["chat", "coding"],
                "max_tokens": 4096
            },
            {
                "id": "claude-3-opus",
                "provider": "anthropic",
                "type": "chat",
                "description": "AnthropicのClaude 3 Opusモデル",
                "capabilities": ["chat", "coding", "reasoning"],
                "max_tokens": 4096
            },
            {
                "id": "claude-3-sonnet",
                "provider": "anthropic",
                "type": "chat",
                "description": "AnthropicのClaude 3 Sonnetモデル",
                "capabilities": ["chat", "coding"],
                "max_tokens": 4096
            },
            {
                "id": "text-embedding-3-small",
                "provider": "openai",
                "type": "embedding",
                "description": "OpenAIのテキスト埋め込みモデル",
                "capabilities": ["embedding"],
                "max_tokens": 8191
            },
            {
                "id": "text-embedding-3-large",
                "provider": "openai",
                "type": "embedding",
                "description": "OpenAIのテキスト埋め込み大規模モデル",
                "capabilities": ["embedding"],
                "max_tokens": 8191
            }
        ]
    
    def list_models(self) -> List[Dict[str, Any]]:
        """
        利用可能なモデル一覧を返す
        """
        return self.models
    
    async def generate_completion(self, model: str, prompt: str, temperature: float = 0.7, max_tokens: int = 1024, stream: bool = False) -> Dict[str, Any]:
        """
        指定されたモデルを使用してテキスト生成を行う
        
        実際の実装ではOpenAI APIやAnthropic APIを呼び出す
        ここではモックレスポンスを返す
        """
        try:
            # モデルごとの分岐処理
            provider = next((m["provider"] for m in self.models if m["id"] == model), None)
            if not provider:
                raise ValueError(f"Unknown model: {model}")
            
            # モックレスポンス
            mock_content = ""
            est_tokens = 0
            
            # プロンプトの簡易解析
            if "会社の沿革" in prompt or "沿革" in prompt:
                mock_content = "当社は2010年に設立され、肥沙太郎が初代社長を務めました。主にITソリューション事業から始まり、2015年には海外事業部を立ち上げ、アジア地域での事業展開を始めました。その後、2018年にはAI事業部を新設し、現在は各種産業向けのAIソリューションを提供しています。社員数は当初の10名から現在は500名を超える規模に成長し、東証マザーズ市場への上場も検討しています。"
                est_tokens = 350
            elif "料金" in prompt or "価格" in prompt:
                mock_content = "当社のサービス料金は次の通りです：\n\nベーシックプラン：月額5,000円（税抜）\n- 基本機能のお使い放題\n- 月間クエリ数上限：1,000件\n- 標準サポート\n\nプロプラン：月額12,000円（税抜）\n- 全機能のお使い放題\n- 月間クエリ数上限：5,000件\n- 優先サポート\n\nエンタープライズプラン：カスタム価格\n- 完全カスタマイズ可能\n- 専属サポート担当者\n- SLA保証\n\n年間契約の場合は全プランで10%の割引が適用されます。詳しい内容は営業担当までお問い合わせください。"
                est_tokens = 320
            elif "問い合わせ" in prompt or "連絡" in prompt:
                mock_content = "当社へのお問い合わせは以下の方法で承っております：\n\n1. メール: support@example.com\n営業時間内のお問い合わせは24時間以内に回答いたします。\n\n2. 電話: 03-1234-5678\n受付時間: 平日 9:00～18:00 (土日祭日、年末年始を除く)\n\n3. 問い合わせフォーム: 当社ウェブサイトのお問い合わせページから送信いただけます。\n\nお問い合わせの際には、お客様IDや利用中のプランなどの情報をご用意いただくとスムーズに対応できます。緊急の場合はお電話でのお問い合わせをお勧めします。"
                est_tokens = 280
            else:
                # 汎用的なレスポンス
                mock_content = f"ご質問いただきありがとうございます。「{prompt[:30]}...」についてお答えします。\n\nこの質問に対する回答として、当社のサービスでは...（ここに結果が生成されます）\n\nさらに詳しい情報が必要な場合は、お気軽にお問い合わせください。"
                est_tokens = 200 + int(len(prompt) * 0.15)  # 長さに応じてトークン数を計算
            
            return {
                "id": f"cmpl_{random.randint(1000, 9999)}",
                "content": mock_content,
                "usage": {
                    "prompt_tokens": len(prompt) // 3,  # 簡易的なトークン数の計算
                    "completion_tokens": est_tokens,
                    "total_tokens": len(prompt) // 3 + est_tokens
                }
            }
            
        except Exception as e:
            logger.error(f"Error in generate_completion: {str(e)}")
            raise
    
    async def generate_streaming_completion(self, model: str, prompt: str, temperature: float = 0.7, max_tokens: int = 1024) -> AsyncGenerator[Dict[str, Any], None]:
        """
        指定されたモデルを使用してストリーミングテキスト生成を行う
        
        実際の実装ではOpenAI APIやAnthropic APIのストリーミングを返す
        ここではモックレスポンスをシミュレートする
        """
        try:
            # 想定される完全なレスポンスを生成
            full_response = await self.generate_completion(
                model=model,
                prompt=prompt,
                temperature=temperature,
                max_tokens=max_tokens,
                stream=False
            )
            
            content = full_response["content"]
            
            # 全レスポンスをチャンクに分割
            chunks = []
            current_chunk = ""
            for char in content:
                current_chunk += char
                if len(current_chunk) >= 5 or char in ["."]
                    chunks.append(current_chunk)
                    current_chunk = ""
            
            if current_chunk:  # 最後のチャンクが残っていれば追加
                chunks.append(current_chunk)
            
            # 各チャンクを順番に生成
            for i, chunk in enumerate(chunks):
                yield {
                    "id": f"cmpl_{random.randint(1000, 9999)}",
                    "model": model,
                    "chunk": chunk,
                    "index": i,
                    "finish_reason": "stop" if i == len(chunks) - 1 else None
                }
            
        except Exception as e:
            logger.error(f"Error in generate_streaming_completion: {str(e)}")
            yield {
                "error": str(e),
                "model": model
            }
    
    async def generate_embedding(self, model: str, text: Union[str, List[str]]) -> Dict[str, Any]:
        """
        指定されたモデルを使用してテキスト埋め込みを生成する
        
        実際の実装ではOpenAI APIを呼び出す
        ここではモック埋め込みを返す
        """
        try:
            # モック埋め込みを生成
            is_batch = isinstance(text, list)
            texts = text if is_batch else [text]
            
            # モデルによる次元数の設定
            if model == "text-embedding-3-small":
                dim = 1536
            elif model == "text-embedding-3-large":
                dim = 3072
            else:
                dim = 1024  # デフォルト
            
            # モック埋め込みベクトルの生成
            mock_embeddings = []
            for _ in texts:
                # 正規分布からランダムなベクトルを生成
                vector = np.random.normal(0, 1, dim)
                # ベクトルを正規化
                vector = vector / np.linalg.norm(vector)
                mock_embeddings.append(vector.tolist())
            
            return {
                "embedding": mock_embeddings[0] if not is_batch else mock_embeddings,
                "usage": {
                    "prompt_tokens": sum(len(t) // 3 for t in texts),
                    "total_tokens": sum(len(t) // 3 for t in texts)
                }
            }
            
        except Exception as e:
            logger.error(f"Error in generate_embedding: {str(e)}")
            raise
