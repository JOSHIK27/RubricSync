import { openai } from "../lib/openai";

export async function ExtractRubricCriteria(rubric: String) {
  const prompt = `Read the following Marking Rubric very carefully: ${rubric}. 
  Identify all the key evaluation metrics i.e critieria for marking carefully and return them as a javascript array of strings.
  Make sure you do not miss any criteria and each criteria should be as detailed as possible.

  Caution!!!
  The returned array should not have any other text or comment. It should only have the array for example: ["a", "b", "c"].
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
    5. Make sure the length of text is almost similar to the original text.

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
