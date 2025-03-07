export function asset(image: string | File): string {
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
    reader.onerror = (error) => reject(error);
  });
}

export function getAppName(): string {
  return process.env.NEXT_PUBLIC_APP_NAME || 'Laravel';
}

export function getMakeImage(make: string): string {
  return asset(`/images/makes/${make}.png`);
}

type TFunction = (key: string) => string;

function camelize(str: string): string {
  str = str.replace(/[^a-zA-Z0-9 ]/g, ' ');

  return str
    .replace(/[-_ ]/g, ' ')
    .toLowerCase()
    .replace(/\s(.)/g, (_, char) => char.toUpperCase())
    .replace(/\s/g, '');
}

export function translateFeatureType(
  featureType: string,
  t: TFunction
): string {
  return t(camelize(featureType));
}

export function translateFeature(feature: string, t: TFunction): string {
  return t(camelize(feature));
}

export function translateConditionType(
  conditionType: string,
  t: TFunction
): string {
  return t(camelize(conditionType));
}

export function translateBodyStyle(bodyStyle: string, t: TFunction): string {
  return t(camelize(bodyStyle));
}

export function translateFuelType(fuelType: string, t: TFunction): string {
  return t(camelize(fuelType));
}

export function translateTransmissionType(
  transmissionType: string,
  t: TFunction
): string {
  return t(camelize(transmissionType));
}
