/* eslint-disable @typescript-eslint/no-explicit-any */
// src/utils/imageUploadAdapter.ts

export class ImageUploadAdapter {
  private loader: any;

  constructor(loader: any) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file: File) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result as string;
            // Save the image in local storage
            const images = JSON.parse(
              localStorage.getItem("uploadedImages") || "[]"
            );
            images.push(base64);
            localStorage.setItem("uploadedImages", JSON.stringify(images));
            resolve({ url: base64 });
          };
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        })
    );
  }

  abort() {
    // Reject the promise if the upload is aborted
  }
}

export function CustomImageUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new ImageUploadAdapter(loader);
  };
}
