import { ConversionHistoryItem } from "@/app/page";
import { Library } from "@/util/constants";
import { usePlausible } from "next-plausible";
import React, { Dispatch, SetStateAction } from "react";
import { Button, Loading } from "react-daisyui";
import { TbSwitch } from "react-icons/tb";
interface Props {
  inputCode: string;
  fromLibrary: Library;
  toLibrary: Library;
  setError: Dispatch<SetStateAction<string>>;
  setOutputCode: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  conversionHistory: ConversionHistoryItem[];
  setConversionHistory: Dispatch<SetStateAction<ConversionHistoryItem[]>>;
}
const SubmitButton: React.FC<Props> = ({
  inputCode,
  fromLibrary,
  toLibrary,
  setError,
  isLoading,
  setIsLoading,
  setOutputCode,
  conversionHistory,
  setConversionHistory,
}) => {
  const plausible = usePlausible();
  const PROMPT_TEMPLATE = `Convert the following {fromLibrary} code to {toLibrary}:
  {inputCode}
  Please provide only the converted component without any explanations or any language declaration or any other text or any . Only the raw code.`;

  async function handleSubmit() {
    if (!inputCode) {
      setError("Please enter some code to convert.");
      return;
    }

    if (fromLibrary === toLibrary) {
      setError("Libraries cannot be the same.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      plausible("code_converted", {
        props: { from: fromLibrary, to: toLibrary },
      });
      const prompt = PROMPT_TEMPLATE.replace("{fromLibrary}", fromLibrary)
        .replace("{toLibrary}", toLibrary)
        .replace("{inputCode}", inputCode);

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "API request failed");
      }

      const data = await response.json();
      const cleanedText = data.response.replace(/(jsx?|tsx?)?|/g, "").trim();

      setOutputCode(cleanedText);
      const newConversion = {
        from: fromLibrary,
        to: toLibrary,
        input: inputCode,
        output: cleanedText,
        timestamp: new Date().toISOString(),
      };
      const updatedHistory = [newConversion, ...conversionHistory];
      setConversionHistory(updatedHistory);
      localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
    } catch (error) {
      console.error("Error:", error);
      setError(`An error occurred while processing your request. ${error}`);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
      {!isLoading && <TbSwitch />}
      {isLoading ? <Loading color="accent" /> : "Convert"}
    </Button>
  );
};

export default SubmitButton;
