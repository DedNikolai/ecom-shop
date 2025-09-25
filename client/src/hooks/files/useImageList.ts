import { ImageScope, listImages } from "@/services/files.service";
import { useQuery } from "@tanstack/react-query";

export function useImageList(scope: ImageScope) {
  return useQuery({
    queryKey: ["images-list", scope],
    queryFn: () => listImages(scope),
    refetchOnWindowFocus: false,
  });
}
