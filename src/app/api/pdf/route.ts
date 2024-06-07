import { NextResponse } from "next/server";
import pdf from "pdf-parse";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env["TOGETHER_API_KEY"],
});

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
  const reportData = await pdf(reportDataBuffer, options);
  const rubricData = await pdf(rubricDataBuffer, options);
  try {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are known as Rubric Syncer. You will provided with a report made a university student and a marking rubric for that report. The feedback should clearly explain what the report lacks in according to rubric and which area's can be improved. 
           Here's the report : (${reportData.text})
           and 
           Here's the marking rubric: (${rubricData.text})
           Rubric might possibly contain a lot more information about the assignment. Ignore all of them and just compare the rubric and provide feedback. Also estimate the score. Return the data in markup format.
          `,
        },
      ],
      model: "mistralai/Mixtral-8x22B-Instruct-v0.1",
    });

    if (response.choices)
      return NextResponse.json(
        { message: "Success", feedback: response.choices[0].message?.content },
        { status: 201 }
      );
    else {
      throw new Error("Some error while matching rubric with report");
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
