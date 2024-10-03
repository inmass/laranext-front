import axios from "@/lib/axios";

export function createFileFromImageUrl(imageUrl: string): Promise<File> {
  return new Promise((resolve, reject) => {
    fetch(imageUrl, {
      credentials: 'include',
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Failed to load image');
        }
        response.blob()
      })
      .then(blob => {
        const fileName = imageUrl.split('/').pop() || 'image.jpg';
        const file = new File([blob], fileName, { type: blob.type });
        resolve(file);
      })
      .catch(error => reject(error));
  });
}


export function asset(image: string|File): string {
  if (image instanceof File) {
    return URL.createObjectURL(image);
  } else {
    // You could add more logic here, like checking for external URLs
    if (image.startsWith('http://') || image.startsWith('https://')) {
      return image;
    }
  }

  // Remove leading slash if present
  const cleanPath = image.startsWith('/') ? image.slice(1) : image;

  // In development, we can use the path as is
  if (process.env.NODE_ENV === 'development') {
    return `/${cleanPath}`;
  }

  // In production, you might want to add a CDN URL
  const cdnUrl = process.env.NEXT_PUBLIC_CDN_URL || '';
  return `${cdnUrl}/${cleanPath}`;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

export function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME || 'Laravel';
}

export function getMakeImage(make: string): string {
  // https://raw.githubusercontent.com/filippofilip95/car-logos-dataset/refs/heads/master/logos/thumb/bmw.png
  // https://vl.imgix.net/img/acura-logo.png
  return asset(`https://vl.imgix.net/img/${make.toLowerCase()}-logo.png`);
}
