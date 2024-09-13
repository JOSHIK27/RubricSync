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

export async function ImproveText(text: String, criterion: String) {
  const prompt = `Original text: ${text}

    Your task is to improve this text to make it more semantically similar to the following criterion: ${criterion}, without knowing exactly what that concept is. The improved text should:
    1. Maintain the core message and intent of the original text.
    2. Enhance the content to potentially include more relevant details, terminology, or structure that might align with academic or research standards.
    3. Be more comprehensive and precise in its language and explanations.
    4. Not introduce any false or speculative information.

    Return the response as a string.
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
