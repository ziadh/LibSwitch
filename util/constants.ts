export const LIBRARIES = [
    "Flutter",
    "React Native",
    "React",
    "Vue",
    "Angular",
    "Svelte",
  ] as const;
  
  export type Library = (typeof LIBRARIES)[number];