import { openai } from "./openai";

export async function ExtractRubricCriteria(rubric: String) {
  const prompt = `Read the following Marking Rubric very carefully: ${rubric}. 
  Identify all the key evaluation metrics i.e critieria for marking carefully and list them in the following format
  
  For Example:

  Here's the Evaluation matrics of the give marking rubric:
  1) Clear thesis statement
  2) Well-structured arguments
  3) Use of evidence to support claims
  4) Proper citation of sources
  5) Coherent conclusion
  `;

  const result = await openai.chat.completions.create({
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
