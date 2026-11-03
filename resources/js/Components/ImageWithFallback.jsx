import { useEffect, useState } from 'react';

// If the image file is missing, hide the broken icon and let the grey placeholder behind it show.
export default function ImageWithFallback({ src, alt, ...props }) {
    const [failed, setFailed] = useState(false);
    useEffect(() => setFailed(false), [src]);
    if (!src || failed) return null;
    return <img src={src} alt={alt} onError={() => setFailed(true)} {...props} />;
}
