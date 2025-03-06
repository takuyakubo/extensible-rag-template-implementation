"use client";

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatBytes } from '@/lib/utils';
import { Upload, X, File, PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Collection = {
  id: string;
  name: string;
  documentCount: number;
};

type DocumentUploadProps = {
  isOpen: boolean;
  onClose: () => void;
  collections: Collection[];
};

type UploadFile = {
  file: File;
  id: string;
  title: string;
  progress: number;
  error?: string;
};

export function DocumentUpload({ isOpen, onClose, collections }: DocumentUploadProps) {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
      title: file.name.split('.')[0].replace(/[_-]/g, ' '),
      progress: 0,
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'text/plain': ['.txt'],
      'text/html': ['.html', '.htm'],
    },
  });

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const handleTitleChange = (id: string, title: string) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === id ? { ...file, title } : file
      )
    );
  };

  const toggleCollection = (collectionName: string) => {
    setSelectedCollections(prev => 
      prev.includes(collectionName)
        ? prev.filter(c => c !== collectionName)
        : [...prev, collectionName]
    );
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    // 実際の実装ではAPIにファイルをアップロード
    try {
      // ファイルのアップロード進捗をシミュレート
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setFiles(prev => 
          prev.map(file => ({ ...file, progress: Math.min(progress, 100) }))
        );
      }
      
      console.log('Uploaded files:', files);
      console.log('Selected collections:', selectedCollections);
      
      // アップロード完了後に閉じる
      setTimeout(() => {
        onClose();
        setFiles([]);
        setSelectedCollections([]);
        setIsUploading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setFiles(prev => 
        prev.map(file => ({ ...file, error: 'アップロードに失敗しました' }))
      );
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">ドキュメントのアップロード</DialogTitle>
          <DialogDescription>
            ナレッジベースに追加するドキュメントをアップロードしてください。
            PDF、Word、Excel、PowerPointなどのファイル形式がサポートされています。
          </DialogDescription>
        </DialogHeader>

        {/* ドロップゾーン */}
        {files.length === 0 && (
          <div
            {...getRootProps()}
            className={`mt-4 flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed p-4 ${
              isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mb-4 h-8 w-8 text-gray-400" />
            {isDragActive ? (
              <p className="text-sm text-gray-600">ファイルをドロップしてください</p>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600">ここにファイルをドラッグ&ドロップ</p>
                <p className="text-xs text-gray-500">または</p>
                <Button size="sm" variant="outline" className="mt-2">
                  ファイルを選択
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ファイルリスト */}
        {files.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">アップロードするファイル ({files.length})</h3>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setFiles([])}
                disabled={isUploading}
              >
                すべて削除
              </Button>
            </div>
            <div className="mt-2 space-y-3">
              {files.map(file => (
                <div key={file.id} className="rounded-md border p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <File className="h-5 w-5 flex-shrink-0 text-gray-500" />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div>
                          <Label htmlFor={`title-${file.id}`}>タイトル</Label>
                          <Input
                            id={`title-${file.id}`}
                            value={file.title}
                            onChange={(e) => handleTitleChange(file.id, e.target.value)}
                            disabled={isUploading}
                            className="mt-1"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{file.file.name}</span>
                          <span>{formatBytes(file.file.size)}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleRemoveFile(file.id)}
                      disabled={isUploading}
                      className="ml-2 h-8 w-8 rounded-full p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* 進捗バー */}
                  {isUploading && (
                    <div className="mt-2">
                      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <div className="mt-1 text-xs text-gray-500">
                        {file.progress < 100 ? `アップロード中... ${file.progress}%` : 'アップロード完了'}
                      </div>
                    </div>
                  )}
                  
                  {/* エラーメッセージ */}
                  {file.error && (
                    <div className="mt-2 text-xs text-red-600">{file.error}</div>
                  )}
                </div>
              ))}
              
              {!isUploading && (
                <Button
                  variant="outline"
                  className="mt-2 w-full justify-center"
                  onClick={() => getRootProps().onClick?.()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  さらにファイルを追加
                </Button>
              )}
            </div>
          </div>
        )}

        {/* コレクション選択 */}
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium">コレクション</h3>
          <div className="flex flex-wrap gap-2">
            {collections.map(collection => (
              <Badge
                key={collection.id}
                variant={selectedCollections.includes(collection.name) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleCollection(collection.name)}
              >
                {collection.name} ({collection.documentCount})
              </Badge>
            ))}
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            キャンセル
          </Button>
          <Button onClick={handleUpload} disabled={files.length === 0 || isUploading}>
            {isUploading ? 'アップロード中...' : 'アップロード'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
