import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function GET(req: Request, res: Response) {
  const text = `Hi.\n\nI'm Harrison.\n\nHow? Are? You?\nOkay then f f f f.
This is a weird text to write, but gotta test the splittingggg some how.\n\n
Bye!\n\n-H.`;
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 20,
    chunkOverlap: 1,
  });

  const output = await splitter.createDocuments([text]);

  console.log(output.slice(0, 3));
  return Response.json({ output });
}
