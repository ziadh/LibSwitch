export const LIBRARIES = [
  "Flutter",
  "React Native",
  "React",
  "Vue",
  "Angular",
  "Svelte",
] as const;

export type Library = (typeof LIBRARIES)[number];

export const PROMPT_TEMPLATE = `Convert the following {fromLibrary} code to {toLibrary}:

{inputCode}

Provide your response in JSON format with the following structure:
{
  "converted_component": "The raw converted code without any explanations or language declarations",
  "link": "URL to the documentation of the main component used in the conversion"
}
Ensure the JSON is valid and properly escaped.`;
