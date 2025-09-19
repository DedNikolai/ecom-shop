import { ImageScope, uploadImage } from "@/services/files.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUploadImage(scope: ImageScope) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadImage(file, scope),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["images-list", scope] });
    },
  });
}
