// src/services/files.ts
import { serverRoutes } from "@/app/api/server.routes";
import { api } from "@/lib/axios";


export type ImageScope = "category" | "product";

export async function listImages(scope: ImageScope): Promise<string[]> {
  const { data } = await api.get<string[]>(`${serverRoutes._FILE_IMAGES}/${scope}`);
  return data;
}

export async function uploadImage(file: File, scope: ImageScope): Promise<{ path: string }> {
  const fd = new FormData();
  fd.append("file", file);
  const { data } = await api.post<{ path: string }>(`${serverRoutes._IMAGE_UPLOAD}/${scope}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}
