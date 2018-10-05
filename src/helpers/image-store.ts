
export function loadJsonpDataUri(imageId: string, jsonpUrl: string, cb: (dataUri: string) => void) {
  if (completedImages.has(imageId)) {
    cb(completedImages.get(imageId));
    return;
  }

  if (pendingImages.has(imageId)) {
    const pendingImage = pendingImages.get(imageId);
    pendingImage.push(cb);
    return;
  }

  pendingImages.set(imageId, [cb]);

  const jsonp = document.createElement('script');
  jsonp.src = jsonpUrl;
  document.head.appendChild(jsonp);
}

(window as any).loadScreenshot = (imageId: string, dataUri: string) => {
  const callbacks = pendingImages.get(imageId);
  if (callbacks) {
    callbacks.forEach(cb => cb(dataUri));
    pendingImages.delete(imageId);
  }

  completedImages.set(imageId, dataUri);
};

const pendingImages = new Map<string, ((dataUri: string) => void)[]>();
const completedImages = new Map<string, string>();
