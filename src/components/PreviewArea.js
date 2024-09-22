import React from "react";
import { useSelector } from "react-redux";

export default function PreviewArea() {
  const sprites = useSelector((state) => state.sprite);
  return (
    <div className="relative flex-none h-screen w-full overflow-y-auto p-2">
      { sprites.map((sprite, index) => (
          <img key={`sprite_${index}`} src={sprite.img} className="absolute w-28 h-28" alt={`Sprite ${index + 1}`} />
        ))
      }
    </div>
  );
}
