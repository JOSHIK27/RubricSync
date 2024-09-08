import { openai } from "../lib/openai";

export async function ExtractRubricCriteria(rubric: String) {
  const prompt = `Read the following Marking Rubric very carefully: ${rubric}. 
  Identify all the key evaluation metrics i.e critieria for marking carefully and list them in the following format (javascript array format)
  
  For Example:

  Here's the Evaluation metrics of the given marking rubric:

  ["Clear thesis statement",  "Well-structured arguments", "Use of evidence to support claims", "Proper citation of sources", "Coherent conclusion"]
 
  `;

  const result: any = await openai.chat.completions.create({
    messages: [
      {
        role: "assistant",
        content: prompt,
      },
    ],
    model: "gpt-4o-mini",
  });

  return result;
}
