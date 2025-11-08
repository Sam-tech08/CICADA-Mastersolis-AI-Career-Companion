import React from "react";
import "./InteractiveProductCard.css";

export interface InteractiveProductCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  imageUrl?: string; // can be an emoji or url
  logoUrl?: string;
  title: string;
  description?: string;
  price?: string;
  onActionClick?: () => void;
}

export const cn = (...parts: Array<string | false | null | undefined>) =>
  parts.filter(Boolean).join(" ");

export default function InteractiveProductCard({
  imageUrl,
  logoUrl,
  title,
  description,
  price,
  onActionClick,
  className,
  ...props
}: InteractiveProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [style, setStyle] = React.useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = ((y - height / 2) / (height / 2)) * -8;
    const rotateY = ((x - width / 2) / (width / 2)) * 8;
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`,
      transition: "transform 0.12s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform:
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  const isEmoji = (s?: string) => !!s && s.length <= 2 && /[^\w\s]/.test(s);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cn("ipc-card", className)}
      {...props}
    >
      <div className="ipc-image">
        {imageUrl ? (
          isEmoji(imageUrl) ? (
            <div className="ipc-emoji">{imageUrl}</div>
          ) : (
            <img src={imageUrl} alt={title} />
          )
        ) : (
          <div className="ipc-placeholder" />
        )}
        <div className="ipc-gradient" />
      </div>

      <div className="ipc-content">
        <div className="ipc-header">
          <div>
            <h3 className="ipc-title">{title}</h3>
            {description && <p className="ipc-desc">{description}</p>}
          </div>
          {logoUrl && <img src={logoUrl} alt="logo" className="ipc-logo" />}
        </div>

        {price && <div className="ipc-price">{price}</div>}

        <div className="ipc-footer">
          <button className="ipc-action" onClick={onActionClick}>
            View
          </button>
        </div>
      </div>
    </div>
  );
}
