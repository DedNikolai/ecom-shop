
import Image from "next/image";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImageList } from "@/hooks/files/useImageList";
import { useUploadImage } from "@/hooks/files/useUploadImage";
import { ImageScope } from "@/services/files.service";

type Props = {
  scope: ImageScope;
  value?: string;
  onSelect: (url: string) => void;
  trigger?: React.ReactNode;
};

export function ImagePickerDialog({ scope, value, onSelect, trigger }: Props) {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useImageList(scope);
  const upload = useUploadImage(scope);

  return (
    <Dialog open={open} onOpenChange={(o) => !upload.isPending && setOpen(o)}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Set photo</Button>}
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Select or upload image</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="gallery">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-4">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading images…</div>
            ) : (
              <ScrollArea className="h-[360px]">
                <div className="grid grid-cols-3 gap-3">
                  {data?.map((src) => (
                    <button
                      key={src}
                      type="button"
                      className={`relative aspect-square rounded overflow-hidden border ${
                        value === src ? "ring-2 ring-primary" : "hover:border-primary"
                      }`}
                      onClick={() => {
                        onSelect(src);
                        setOpen(false);
                      }}
                    >
                      <Image src={`${process.env.NEXT_PUBLIC_API_URL}/${src}`} alt="image" fill className="object-cover" unoptimized />
                    </button>
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <div className="grid gap-3">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  upload.mutate(f, {
                    onSuccess: ({ path }) => {
                      onSelect(path);
                      setOpen(false);
                    },
                  });
                }}
                disabled={upload.isPending}
              />
              {upload.isPending && <div className="text-sm">Uploading…</div>}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
