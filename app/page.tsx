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
import { Button } from "react-daisyui";
import { MdErrorOutline } from "react-icons/md";
import { LIBRARIES, Library } from "@/util/constants";
import { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";
import CodeEditor from "@/components/CodeEditor";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

export interface ConversionHistoryItem {
  from: Library;
  to: Library;
  input: string;
  output: string;
  timestamp: string;
}

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
  const [docLink, setDocLink] = useState<string>("");
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
  function isTodayLaunchDay(): boolean {
    const today = new Date();
    const isLaunchDay =
      today.getFullYear() === 2024 &&
      today.getMonth() === 7 &&
      today.getDate() === 11;
    return isLaunchDay;
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 text-white overflow-y-auto">
      <div className="flex flex-col gap-4 bg-gray-800 shadow-lg p-4 sm:p-6 rounded-lg w-full sm:w-4/5 lg:w-3/5 mx-auto my-4 max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center justify-center mb-4 sm:mb-0">
            <Link href="/">
              <Image src="/logo-trans.png" alt="Logo" width={50} height={50} />
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-400">
              LibSwitch
            </h1>
            <Button color="ghost" size="sm" onClick={() => setShowInfo(true)}>
              <FaInfoCircle />
            </Button>
            <p className="text-sm text-gray-400">v{version}</p>
          </div>
          {isTodayLaunchDay() && (
            <a
              href="https://www.producthunt.com/posts/libswitch?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-libswitch"
              target="_blank"
            >
              <Image
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=478202&theme=dark"
                alt="LibSwitch - Seamlessly convert code between libraries | Product Hunt"
                width={250}
                height={54}
              />
            </a>
          )}
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
          <SubmitButton
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            inputCode={inputCode}
            fromLibrary={fromLibrary}
            toLibrary={toLibrary}
            setError={setError}
            setOutputCode={setOutputCode}
            setConversionHistory={setConversionHistory}
            conversionHistory={conversionHistory}
            setDocLink={setDocLink}
          />
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
            <div className="m-4 flex gap-3 items-center justify-center bg-gray-800 rounded-lg p-4 shadow-md">
              <a
                className="text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200 font-semibold"
                target="_blank"
                href={docLink}
                rel="noopener noreferrer"
              >
                Read Documentation
              </a>
              <p className="text-xs text-gray-400 italic max-w-xs text-center sm:text-left">
                This link was generated by AI and it might not be accurate.
              </p>
            </div>
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
