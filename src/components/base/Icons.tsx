import React, { useMemo } from "react";
import * as SolidIcons from "@heroicons/react/24/solid";
import * as OutlineIcons from "@heroicons/react/24/outline";
import MdiIcon from "@mdi/react";
import * as mdi from "@mdi/js";
import { cn } from "../../lib/tailwind-merge";

interface IconProps {
  name: string;
  size?: string;
  color?: string;
  mode?: "heroicons" | "mdi";
  outline?: boolean;
}

const toMdiExportName = (input?: string) => {
  const raw = (input || "").replace(/^mdi:/, "");
  const parts = raw.split(/[^a-z0-9]+/i).filter(Boolean);
  const pascal = parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
  return "mdi" + pascal;
};

const Icon: React.FC<IconProps> = ({
  name,
  size = "20",
  color,
  mode = "heroicons",
  outline = false,
}) => {
  const formattedIconName = useMemo(() => {
    const inputStr = name?.replace("heroicons:", "") || "";
    const words = inputStr.split("-");
    const pascalCaseStr = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    return pascalCaseStr + "Icon";
  }, [name]);

  const HeroiconComponent = useMemo(() => {
    const iconSet = outline ? OutlineIcons : SolidIcons;
    return (iconSet as any)[formattedIconName] as
      | React.ComponentType<React.SVGProps<SVGSVGElement>>
      | undefined;
  }, [outline, formattedIconName]);

  const isTailwindTextClass = Boolean(color && /\btext(?:-|:|\[)/.test(color));
  const sizePx = /^\d+$/.test(size) ? `${size}px` : size;

  if (mode === "mdi") {
    const exportName = toMdiExportName(name);
    const path = (mdi as any)[exportName] as string | undefined;
    if (!path) return null;
    const mdiColor = isTailwindTextClass ? "currentColor" : color;
    const mdiClass = isTailwindTextClass ? color : undefined;
    return (
      <MdiIcon
        path={path}
        size={sizePx}
        color={mdiColor}
        className={cn(mdiClass, "inline-flex")}
        style={{
          color: !isTailwindTextClass && color ? color : undefined,
          display: "inline-flex",
          alignItems: "center",
        }}
      />
    );
  }

  if (!HeroiconComponent) return null;

  return (
    <HeroiconComponent
      className={cn(isTailwindTextClass ? color : undefined, "inline-flex")}
      style={{
        width: `${sizePx}`,
        height: `${sizePx}`,
        color: !isTailwindTextClass && color ? color : undefined,
      }}
    />
  );
};

export default Icon;
