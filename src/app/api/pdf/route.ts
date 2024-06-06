import { NextResponse } from "next/server";
import pdf from "pdf-parse";

function render_page(pageData: any) {
  //check documents https://mozilla.github.io/pdf.js/
  let render_options = {
    //replaces all occurrences of whitespace with standard spaces (0x20). The default value is `false`.
    normalizeWhitespace: false,
    //do not attempt to combine same line TextItem's. The default value is `false`.
    disableCombineTextItems: false,
  };

  return pageData
    .getTextContent(render_options)
    .then(function (textContent: any) {
      let lastY,
        text = "";
      for (let item of textContent.items) {
        if (lastY == item.transform[5] || !lastY) {
          text += item.str + " ";
        } else {
          text += "\n" + item.str;
        }
        lastY = item.transform[5];
      }
      return text;
    });
}

let options = {
  pagerender: render_page,
};

export async function POST(req: Request) {
  const { reportDataBuffer, rubricDataBuffer } = await req.json();
  pdf(reportDataBuffer, options).then(function (data: any) {
    // number of pages
    console.log(data.numpages);
    // number of rendered pages
    console.log(data.numrender);
    // PDF info
    console.log(data.info);
    // PDF text
    console.log(data.text);
  });

  return NextResponse.json({ message: "Success" }, { status: 201 });
}
