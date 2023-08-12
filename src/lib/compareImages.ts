import resemble from "resemblejs";

export const compareImages = (imgA: Buffer, imgB: Buffer) => {
  return resemble(imgA).compareTo(imgB).ignoreColors().ignoreAlpha();
};
