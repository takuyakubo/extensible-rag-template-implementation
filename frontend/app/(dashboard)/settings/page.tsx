import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="py-6">
      <DashboardHeader
        title="設定"
        description="システムの設定やAPIキーの管理を行います。"
      />

      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="general">基本設定</TabsTrigger>
          <TabsTrigger value="api">外部API設定</TabsTrigger>
          <TabsTrigger value="embeddings">埋め込み設定</TabsTrigger>
          <TabsTrigger value="advanced">高度な設定</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>システム情報</CardTitle>
              <CardDescription>
                基本的なシステム情報と設定を管理します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">システム名</Label>
                <Input id="system-name" defaultValue="拡張性高いRAGシステム" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base-url">ベースURL</Label>
                <Input id="base-url" defaultValue="http://localhost:8000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-lang">デフォルト言語</Label>
                <Input id="default-lang" defaultValue="日本語" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>変更を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>LLM API設定</CardTitle>
              <CardDescription>
                各種LLMプロバイダーとの連携設定を管理します
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API キー</Label>
                <Input id="openai-key" type="password" defaultValue="sk-..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anthropic-key">Anthropic API キー</Label>
                <Input id="anthropic-key" type="password" defaultValue="" placeholder="sk-ant-..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-model">デフォルトモデル</Label>
                <Input id="default-model" defaultValue="gpt-4" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>変更を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="embeddings" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>埋め込みモデル設定</CardTitle>
              <CardDescription>
                テキスト埋め込み生成に使用するモデルとパラメータの設定
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="embedding-model">埋め込みモデル</Label>
                <Input id="embedding-model" defaultValue="text-embedding-3-small" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chunk-size">チャンクサイズ</Label>
                <Input id="chunk-size" defaultValue="512" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="chunk-overlap">チャンク重複</Label>
                <Input id="chunk-overlap" defaultValue="128" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>変更を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>高度な設定</CardTitle>
              <CardDescription>
                システムの詳細設定とパフォーマンスチューニング
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cache-ttl">キャッシュTTL (秒)</Label>
                <Input id="cache-ttl" defaultValue="3600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-tokens">最大トークン数</Label>
                <Input id="max-tokens" defaultValue="4096" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">生成温度</Label>
                <Input id="temperature" defaultValue="0.7" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>変更を保存</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
