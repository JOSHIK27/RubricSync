export function RubricPrompt(rubric: string) {
  return `
  You are given a rubric text that contains different evaluation criteria and their corresponding specifications. The rubric may follow different formats such as:

  Think very carefully while deciding which of the below 2 types is suitable here
  1. A performance-based format with categories like ("Excellent", "Good", "Average", "Bad"), (A+, A, B+, B, C), (90%, 80%, 70%, 60% etc) etc each containing several specifications. To be more precise, there has to an order explaining best to worst.
  2. A section-based format with criteria such as "Introduction", "Literature Review", "Methodology", "Results", "Discussion", and "Conclusion", each containing their own specifications.
  
  Your task is to extract the text and structure it in a logical manner, regardless of the format. Here is the format you should use for the output:
  
  [
    {
      "criterion": "Criterion Name",
      "specification": "Specification text"
    },
    ...
  ]
  
  Examples of expected output structure:
  
  1. For a performance-based rubric, there has to be only one i.e best performance specifications, ignore all others.
    {
        "criterion": "Excellent",
        "specification": "The introduction is clear and engaging."
    }
  
  2. For a section-based rubric:
  [
    {
      "criterion": "Introduction",
      "specification": "Clear definition of the problem and its significance."
    },
    {
      "criterion": "Literature Review",
      "specification": "Comprehensive review of relevant studies."
    },
    ...
  ]
  
  Here is the rubric text to be processed:
  
  ${rubric}
  
`;
}
