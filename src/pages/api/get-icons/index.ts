import { convertCodeToPng } from "@svgcomp/lib/convertCodeToPng";
import { FaSvgs } from "@svgcomp/lib/iconExporter";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import iconsJson from "../../../icons.json";
import Resemble from "resemblejs";

export default async function handler(
  request: NextApiRequest,
  res: NextApiResponse
) {
  const body = request.body;
  const { svg_code } = JSON.parse(body);
  const pngImage = await convertCodeToPng(svg_code);

  const difference = await Promise.all(
    iconsJson["list"].slice(0, 100).map(
      (FaIcon) =>
        new Promise(async (resolve) => {
          Resemble(pngImage)
            .compareTo(await convertCodeToPng(FaIcon.markup))
            .onComplete(async (data) => {
              resolve({
                difference: data.misMatchPercentage,
                name: FaIcon.name,
              });
            });
        })
    )
  );
  res.status(200).json({
    list: (difference as { difference: number; name: string }[]).sort(
      (iconA, iconB) => iconA.difference - iconB.difference
    ),
  });
}
