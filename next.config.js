/** @type {import('next').NextConfig} */
const nextConfig = {};
const { renderToStaticMarkup } = require("react-dom/server");
const FaIcons = require("react-icons/fa6");
const fs = require("fs");
const generateSvgJson = () => {
  FaSvgs = Object.entries(FaIcons).map(([iconName, Icon]) => ({
    name: iconName,
    markup: renderToStaticMarkup(Icon()),
  }));
  fs.writeFileSync("src/icons.json", JSON.stringify({ list: FaSvgs }));
};

generateSvgJson();
module.exports = nextConfig;
