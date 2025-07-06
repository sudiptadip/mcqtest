"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UploadCloud, X } from "lucide-react";
import axios from "axios";

interface UploadResult {
  documentId: number;
  url: string;
}

interface UploadCompProps {
  uploadUrl?: string;
  onUploadSuccess: (result: UploadResult) => void;
  title: string;
}

export default function UploadComp({
  uploadUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/Document/upload",
  onUploadSuccess,
  title,
}: UploadCompProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get("/api/auth/get-token");
        setToken(response.data.token);
      } catch (error) {
        console.error("Failed to get token:", error);
      }
    };
    fetchToken();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
  };

  const handleUpload = async () => {
    if (!selectedFile || !token) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);

    setIsUploading(true);
    setProgress(0);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percent = Math.round((event.loaded * 100) / event.total);
            setProgress(percent);
          }
        },
      });

      const data = response.data;

      if (data?.result?.id && data?.result?.filePath) {
        const finalUrl =
          "https://demo2.upgradedigitalsolutions.in" + data.result.filePath;
        onUploadSuccess({
          documentId: data.result.id,
          url: finalUrl,
        });
        setPreviewUrl(finalUrl); // Replace preview with uploaded URL
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      setSelectedFile(null);
    }
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    setSelectedFile(null);
    setProgress(0);
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="file-upload">Upload File</Label>

      {!previewUrl && (
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          disabled={!!previewUrl || isUploading}
        />
      )}

      {previewUrl && (
        <div className="relative inline-block">
          {previewUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 rounded border shadow"
            />
          ) : (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Uploaded File
            </a>
          )}

          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-1 right-1 bg-white text-red-600 rounded-full p-1 shadow hover:bg-red-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {selectedFile && !isUploading && (
        <Button
          type="button"
          className="flex gap-2"
          onClick={handleUpload}
          disabled={isUploading}
        >
          <UploadCloud className="h-4 w-4" />
          Upload
        </Button>
      )}

      {isUploading && (
        <>
          <Button disabled className="flex gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            Uploading...
          </Button>
          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </>
      )}
    </div>
  );
}