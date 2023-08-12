const svg2img = require("svg2img");

export const convertCodeToPng = (inp: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    svg2img(inp, (err: any, buffer: Buffer) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(buffer);
    });
  });
};
