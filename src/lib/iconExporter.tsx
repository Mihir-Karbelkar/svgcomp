import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import FaIcons from "react-icons/fa6";
import { convertCodeToPng } from "./convertCodeToPng";

export const FaSvgs = Object.entries(FaIcons).map(([iconName, Icon]) => ({
  name: iconName,
  markup: renderToStaticMarkup(<Icon />),
}));

console.log(FaSvgs?.[0]);
