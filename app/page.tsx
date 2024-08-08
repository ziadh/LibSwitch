"use client";
import Image from "next/image";
import "./globals.css";
import InfoModal from "@/components/InfoModal";
import HistoryModal from "@/components/History_Modal";
import {
  FaCheckCircle,
  FaHistory,
  FaInfoCircle,
  FaRegCopy,
} from "react-icons/fa";
import { Button, Loading } from "react-daisyui";
import { TbSwitch } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { LIBRARIES, Library } from "@/util/constants";
import { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import CodeEditor from "@/components/CodeEditor";

export interface ConversionHistoryItem {
  from: Library;
  to: Library;
  input: string;
  output: string;
  timestamp: string;
}

const PROMPT_TEMPLATE = `Convert the following {fromLibrary} code to {toLibrary}:
{inputCode}
Please provide only the converted component without any explanations or any language declaration or any other text or any . Only the raw code.`;

export default function Home() {
  const [fromLibrary, setFromLibrary] = useState<Library>(LIBRARIES[0]);
  const [toLibrary, setToLibrary] = useState<Library>(LIBRARIES[1]);
  const [inputCode, setInputCode] = useState<string>("");
  const [outputCode, setOutputCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [conversionHistory, setConversionHistory] = useState<
    ConversionHistoryItem[]
  >([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const version = "1.0";

  useEffect(() => {
    const savedHistory = localStorage.getItem("conversionHistory");
    if (savedHistory) {
      setConversionHistory(JSON.parse(savedHistory));
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowHistory(false);
        setShowInfo(false);
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

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
      const cleanedText = data.response
        .replace(/```(jsx?|tsx?)?|```/g, "")
        .trim();

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

  const handleCopy = () => {
    navigator.clipboard.writeText(outputCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDeleteHistoryItem = (index: number) => {
    const updatedHistory = conversionHistory.filter((_, i) => i !== index);
    setConversionHistory(updatedHistory);
    localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
  };

  const handleHistoryItemClick = (item: ConversionHistoryItem) => {
    setFromLibrary(item.from);
    setToLibrary(item.to);
    setInputCode(item.input);
    setOutputCode(item.output);
    setShowHistory(false);
  };

  const closeModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 text-white overflow-y-auto">
      <div className="flex flex-col gap-4 bg-gray-800 shadow-lg p-4 sm:p-6 rounded-lg w-full sm:w-4/5 lg:w-3/5 mx-auto my-4 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center justify-center mb-4 sm:mb-0">
            <Image src="/logo-trans.png" alt="Logo" width={50} height={50} />
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">
              LibSwitch
            </h1>
            <Button color="ghost" size="sm" onClick={() => setShowInfo(true)}>
              <FaInfoCircle />
            </Button>
            <p className="text-sm text-gray-400">v{version}</p>
          </div>
          <div className="flex items-center gap-2">
            {outputCode && (
              <Button
                color="error"
                onClick={() => {
                  setInputCode("");
                  setOutputCode("");
                  setError("");
                }}
              >
                <FaDeleteLeft />
                Clear All
              </Button>
            )}
            <Button color="secondary" onClick={() => setShowHistory(true)}>
              <FaHistory />
            </Button>
          </div>
        </div>

        <div className="flex sm:flex-row gap-4">
          <div className="form-control w-full sm:w-1/3">
            <label className="label">
              <span className="label-text font-semibold text-gray-300 text-lg">
                From
              </span>
            </label>
            <select
              className="select select-bordered bg-gray-700 text-white rounded-md p-2 w-full"
              value={fromLibrary}
              onChange={(e) => setFromLibrary(e.target.value as Library)}
            >
              {LIBRARIES.map((lib) => (
                <option key={lib} value={lib}>
                  {lib}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full sm:w-1/3">
            <label className="label">
              <span className="label-text font-semibold text-gray-300 text-lg">
                To
              </span>
            </label>
            <select
              className="select select-bordered bg-gray-700 text-white rounded-md p-2 w-full"
              value={toLibrary}
              onChange={(e) => setToLibrary(e.target.value as Library)}
            >
              {LIBRARIES.map((lib) => (
                <option key={lib} value={lib}>
                  {lib}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-control w-full">
          <CodeEditor
            value={inputCode}
            onChange={(value) => setInputCode(value)}
          />
        </div>
        <div
          className={`flex ${error ? "justify-between" : "justify-end"} gap-2`}
        >
          {error && (
            <div className="text-red-500 mt-4 flex gap-2 items-center justify-center ">
              <MdErrorOutline />
              {error}
            </div>
          )}

          <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
            {!isLoading && <TbSwitch />}
            {isLoading ? <Loading color="accent" /> : "Convert"}
          </Button>
        </div>
        {outputCode && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg sm:text-xl font-semibold">
                Converted Code
              </h2>
              <button
                onClick={handleCopy}
                className={`btn ${
                  copied ? "btn-success" : "btn-secondary"
                } transition-colors duration-300`}
              >
                {copied ? <FaCheckCircle /> : <FaRegCopy />}
              </button>
            </div>
            <CodeEditor
              value={outputCode}
              onChange={(value) => setOutputCode(value)}
              readOnly={true}
            />
          </div>
        )}
      </div>
      <HistoryModal
        showHistory={showHistory}
        setShowHistory={setShowHistory}
        conversionHistory={conversionHistory}
        handleHistoryItemClick={handleHistoryItemClick}
        handleDeleteHistoryItem={handleDeleteHistoryItem}
      />
      <InfoModal
        showInfo={showInfo}
        setShowInfo={setShowInfo}
        version={version}
      />
    </div>
  );
}
