"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import {
  X,
  Key,
  Eye,
  Clock,
  Check,
  Trash2,
  Upload,
  EyeOff,
  XCircle,
  Loader2,
  FileText,
  Download,
  Calendar,
  RefreshCw,
  TrendingUp,
  StopCircle,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ==================== TYPES ====================

interface Job {
  job_id: string;
  file_name: string;
  state: JobState;
  total: number;
  done: number;
  success: number;
  failed: number;
  created_at: number;
  finished_at?: number;
  last_error?: string;
}

type JobState =
  | "queued"
  | "waiting_capacity"
  | "running"
  | "completed"
  | "partial_completed"
  | "cancelled";

interface StateBadge {
  bg: string;
  text: string;
  icon: LucideIcon;
}

interface DayData {
  total: number;
  jobs: string[];
}

interface UsageTotals {
  today: number;
  this_month: number;
  this_year: number;
  lifetime: number;
}

interface UsageData {
  totals: UsageTotals;
  monthly_breakdown: Record<string, Record<string, DayData>>;
}

type TabType = "jobs" | "usage";

type FilterScope =
  | "all"
  | "today"
  | "yesterday"
  | "day_before_yesterday"
  | "this_month";

type ConfirmModalType = "warning" | "danger";

interface ConfirmModal {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: (() => void) | null;
  type: ConfirmModalType;
}

// ==================== CONSTANTS ====================

const API_BASE: string =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8777";

const FILTER_LABELS: Record<FilterScope, string> = {
  all: "All",
  today: "Today",
  yesterday: "Yesterday",
  day_before_yesterday: "Day Before Yesterday",
  this_month: "This Month",
};

const STATE_BADGES: Record<JobState, StateBadge> = {
  queued: { bg: "bg-gray-100", text: "text-gray-700", icon: Clock },
  waiting_capacity: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    icon: Clock,
  },
  running: { bg: "bg-blue-100", text: "text-blue-700", icon: Loader2 },
  completed: { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle },
  partial_completed: {
    bg: "bg-orange-100",
    text: "text-orange-700",
    icon: CheckCircle,
  },
  cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
};

const FILTER_OPTIONS: FilterScope[] = [
  "all",
  "today",
  "yesterday",
  "day_before_yesterday",
  "this_month",
];

// ==================== COMPONENT ====================

const LinkedInScraperDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [jobScope, setJobScope] = useState<FilterScope>("all");
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>("jobs");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState<boolean>(false);

  // API Key States
  const [apiKey, setApiKey] = useState<string>("");
  const [tempApiKey, setTempApiKey] = useState<string>("");
  const [showApiKey, setShowApiKey] = useState<boolean>(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState<boolean>(false);
  const [isApiKeySaved, setIsApiKeySaved] = useState<boolean>(false);

  // Upload Success State
  const [lastUploadSuccess, setLastUploadSuccess] = useState<boolean>(false);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<ConfirmModal>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    type: "warning",
  });

  // ==================== API KEY MANAGEMENT ====================

  useEffect(() => {
    const savedApiKey = localStorage.getItem("scrayz_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setTempApiKey(savedApiKey);
      setIsApiKeySaved(true);
    }
  }, []);

  const handleSaveApiKey = async (): Promise<void> => {
    if (!tempApiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }

    const newApiKey: string = tempApiKey.trim();
    setLoading(true);

    try {
      const res: Response = await fetch(`${API_BASE}/jobs?limit=1&scope=all`, {
        headers: { "X-API-Key": newApiKey, accept: "application/json" },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          toast.error("Invalid API key! Please check and try again.");
        } else {
          toast.error(`API Error: ${res.status}`);
        }
        setLoading(false);
        return;
      }

      localStorage.setItem("scrayz_api_key", newApiKey);
      setApiKey(newApiKey);
      setIsApiKeySaved(true);
      setApiKeyModalOpen(false);
      toast.success("API key verified and saved!");

      setHasLoadedOnce(true);
      fetchJobsWithKey(newApiKey);
    } catch (err: unknown) {
      console.error("Failed to validate API key:", err);
      toast.error("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClearApiKey = (): void => {
    setConfirmModal({
      isOpen: true,
      title: "Clear API Key",
      message:
        "Are you sure you want to clear your API key? You'll need to enter it again.",
      type: "danger",
      onConfirm: () => {
        localStorage.removeItem("scrayz_api_key");
        setApiKey("");
        setTempApiKey("");
        setIsApiKeySaved(false);
        setHasLoadedOnce(false);
        setJobs([]);
        toast.success("API key cleared!");
      },
    });
  };

  // ==================== JOBS ====================

  const fetchJobs = async (showLoader: boolean = false): Promise<void> => {
    if (!apiKey.trim()) return;
    if (showLoader) setLoading(true);
    setApiError(null);
    try {
      const res: Response = await fetch(
        `${API_BASE}/jobs?limit=50&scope=${jobScope}`,
        {
          headers: { "X-API-Key": apiKey, accept: "application/json" },
        },
      );
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data: unknown = await res.json();
      setJobs(Array.isArray(data) ? (data as Job[]) : []);
    } catch (err: unknown) {
      console.error("Failed to fetch jobs:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setApiError(message || "Failed to connect to API");
      setJobs([]);
    } finally {
      if (showLoader) setLoading(false);
      setInitialLoading(false);
    }
  };

  const fetchJobsWithKey = async (key: string): Promise<void> => {
    if (!key.trim()) return;
    setLoading(true);
    setApiError(null);
    try {
      const res: Response = await fetch(
        `${API_BASE}/jobs?limit=50&scope=${jobScope}`,
        {
          headers: { "X-API-Key": key, accept: "application/json" },
        },
      );
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data: unknown = await res.json();
      setJobs(Array.isArray(data) ? (data as Job[]) : []);
    } catch (err: unknown) {
      console.error("Failed to fetch jobs:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setApiError(message || "Failed to connect to API");
      setJobs([]);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  // ==================== USAGE ====================

  const fetchUsage = async (): Promise<void> => {
    if (!apiKey.trim()) return;
    setLoading(true);
    setApiError(null);
    try {
      const res: Response = await fetch(`${API_BASE}/me/usage`, {
        headers: { "X-API-Key": apiKey, accept: "application/json" },
      });
      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data: UsageData = await res.json();
      setUsageData(data);
    } catch (err: unknown) {
      console.error("Failed to fetch usage:", err);
      setUsageData(null);
      const message = err instanceof Error ? err.message : "Unknown error";
      setApiError(message || "Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  // ==================== JOBS ACTIONS ====================

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile || !apiKey.trim()) return;
    setUploading(true);
    setApiError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res: Response = await fetch(`${API_BASE}/jobs`, {
        method: "POST",
        headers: { "X-API-Key": apiKey },
        body: formData,
      });
      if (!res.ok) {
        const errorText: string = await res.text();
        throw new Error(`Upload failed: ${res.status} - ${errorText}`);
      }
      const data: { job_id: string } = await res.json();
      toast.success(`Job created! ID: ${data.job_id}`);

      setSelectedFile(null);
      setLastUploadSuccess(true);

      const fileInput = document.getElementById(
        "csv-file-input",
      ) as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";

      fetchJobs(false);
    } catch (err: unknown) {
      console.error("Upload error:", err);
      const message = err instanceof Error ? err.message : "Unknown error";
      setApiError(message || "Failed to upload file");
      toast.error("Failed to create job: " + message);
    } finally {
      setUploading(false);
    }
  };

  const handleCreateNewOne = (): void => {
    setLastUploadSuccess(false);
    setSelectedFile(null);
    const fileInput = document.getElementById(
      "csv-file-input",
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.value = "";
      fileInput.click();
    }
  };

  const cancelJob = async (jobId: string): Promise<void> => {
    try {
      await fetch(`${API_BASE}/jobs/${jobId}/cancel`, {
        method: "POST",
        headers: { "X-API-Key": apiKey },
      });
      fetchJobs(false);
      toast.success("Job cancelled!");
    } catch (err: unknown) {
      console.error("Failed to cancel job:", err);
      toast.error("Failed to cancel job");
    }
  };

  const stopAllJobs = (): void => {
    setConfirmModal({
      isOpen: true,
      title: "Stop All Jobs",
      message: "This will stop all currently running jobs. Are you sure?",
      type: "warning",
      onConfirm: async () => {
        try {
          const res: Response = await fetch(`${API_BASE}/admin/jobs/stop_all`, {
            method: "POST",
            headers: { "X-API-Key": apiKey },
          });
          if (!res.ok) throw new Error(`API Error: ${res.status}`);
          const data: { count: number } = await res.json();
          toast.success(`Stopped ${data.count} jobs`);
          fetchJobs(false);
        } catch (err: unknown) {
          console.error("Failed to stop jobs:", err);
          toast.error("Failed to stop jobs");
        }
      },
    });
  };

  const clearQueue = (): void => {
    setConfirmModal({
      isOpen: true,
      title: "Clear Queue",
      message: "This will remove all queued jobs. Are you sure?",
      type: "warning",
      onConfirm: async () => {
        try {
          const res: Response = await fetch(
            `${API_BASE}/admin/jobs/clear_queue`,
            {
              method: "POST",
              headers: { "X-API-Key": apiKey },
            },
          );
          if (!res.ok) throw new Error(`API Error: ${res.status}`);
          const data: { count: number } = await res.json();
          toast.success(`Cleared ${data.count} queued jobs`);
          fetchJobs(false);
        } catch (err: unknown) {
          console.error("Failed to clear queue:", err);
          toast.error("Failed to clear queue");
        }
      },
    });
  };

  const downloadResults = async (
    jobId: string,
    type: "json" | "csv" | "both" = "both",
  ): Promise<void> => {
    try {
      const res: Response = await fetch(`${API_BASE}/jobs/${jobId}/download`, {
        headers: { "X-API-Key": apiKey, accept: "application/json" },
      });
      const data: {
        results_json_url: string;
        results_json_filename?: string;
        summary_csv_url: string;
        summary_csv_filename?: string;
      } = await res.json();

      if (type === "json") {
        toast.success("Downloading JSON results...");
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = data.results_json_url;
        link.setAttribute(
          "download",
          data.results_json_filename || "results.json",
        );
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      if (type === "csv") {
        toast.success("Downloading CSV summary...");
        const link: HTMLAnchorElement = document.createElement("a");
        link.href = data.summary_csv_url;
        link.setAttribute(
          "download",
          data.summary_csv_filename || "summary.csv",
        );
        link.setAttribute("target", "_blank");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err: unknown) {
      console.error("Failed to get download links:", err);
      toast.error("Failed to download");
    }
  };

  // ==================== UTILITIES ====================

  const getFilterLabel = (value: string): string => {
    return FILTER_LABELS[value as FilterScope] || "All";
  };

  const handleFilterSelect = (value: FilterScope): void => {
    setJobScope(value);
    setDropdownOpen(false);
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getStateBadge = (state: string): StateBadge => {
    return STATE_BADGES[state as JobState] || STATE_BADGES.queued;
  };

  const maskApiKey = (key: string): string => {
    if (!key || key.length < 8) return "••••••••";
    return key.slice(0, 4) + "••••••••" + key.slice(-4);
  };

  // ==================== EFFECTS ====================

  useEffect(() => {
    if (apiKey.trim() && isApiKeySaved && !hasLoadedOnce) {
      setHasLoadedOnce(true);
      fetchJobs(true);
    }
  }, [apiKey, isApiKeySaved]);

  useEffect(() => {
    if (apiKey.trim() && hasLoadedOnce) {
      fetchJobs(true);
    }
  }, [jobScope]);

  useEffect(() => {
    if (!apiKey.trim() || !hasLoadedOnce) return;

    const hasActiveJobs: boolean = jobs.some(
      (job: Job) =>
        job.state === "running" ||
        job.state === "queued" ||
        job.state === "waiting_capacity",
    );

    if (hasActiveJobs) {
      const intervalId: NodeJS.Timeout = setInterval(
        () => fetchJobs(false),
        5000,
      );
      return () => clearInterval(intervalId);
    }
  }, [jobs, apiKey, hasLoadedOnce]);

  // ==================== RENDER ====================

  return (
    <div className="min-h-screen bg-gray-50">
      {/* API KEY MODAL */}
      {apiKeyModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Key className="h-5 w-5 text-teal-600" />
                Set API Key
              </h3>
              <button
                onClick={() => setApiKeyModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Enter your API key to access the scraper. Your key will be saved
              securely in your browser.
            </p>

            <div className="relative mb-6">
              <input
                type={showApiKey ? "text" : "password"}
                value={tempApiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTempApiKey(e.target.value)
                }
                placeholder="Enter your API key"
                className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 pr-12 border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && handleSaveApiKey()
                }
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showApiKey ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setApiKeyModalOpen(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                disabled={!tempApiKey.trim() || loading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Check className="h-5 w-5" />
                    Save & Load
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOM CONFIRMATION MODAL */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-2 rounded-full ${
                  confirmModal.type === "danger"
                    ? "bg-red-100"
                    : "bg-yellow-100"
                }`}
              >
                <AlertCircle
                  className={`h-6 w-6 ${
                    confirmModal.type === "danger"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                />
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {confirmModal.title}
              </h3>
            </div>

            <p className="text-gray-600 mb-6 ml-11">{confirmModal.message}</p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setConfirmModal({ ...confirmModal, isOpen: false })
                }
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm?.();
                  setConfirmModal({ ...confirmModal, isOpen: false });
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  confirmModal.type === "danger"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-yellow-500 hover:bg-yellow-600 text-white"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* TABS WITH API KEY */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("jobs")}
              className={`px-6 py-3 cursor-pointer font-semibold transition-all border-b-2 ${
                activeTab === "jobs"
                  ? "text-teal-600 border-teal-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <FileText className="inline mr-2 h-5 w-5" />
              Jobs
            </button>
            <button
              onClick={() => {
                setActiveTab("usage");
                if (apiKey.trim()) fetchUsage();
              }}
              className={`px-6 py-3 cursor-pointer font-semibold transition-all border-b-2 ${
                activeTab === "usage"
                  ? "text-teal-600 border-teal-600"
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
            >
              <TrendingUp className="inline mr-2 h-5 w-5" />
              Usage
            </button>
          </div>

          {/* API Key Badge */}
          <div className="flex items-center gap-3 pb-2">
            {isApiKeySaved ? (
              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-green-700 text-sm font-medium">
                  API Key: {maskApiKey(apiKey)}
                </span>
                <button
                  onClick={() => {
                    setTempApiKey(apiKey);
                    setApiKeyModalOpen(true);
                  }}
                  className="text-green-600 hover:text-green-800 ml-1 cursor-pointer"
                  title="Edit API Key"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={handleClearApiKey}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  title="Clear API Key"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setApiKeyModalOpen(true)}
                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer text-sm"
              >
                <Key className="h-4 w-4" />
                Set API Key
              </button>
            )}
          </div>
        </div>

        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div className="space-y-8">
            {/* UPLOAD SECTION */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Upload CSV
              </h2>

              {!isApiKeySaved ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                  <Key className="mx-auto h-12 w-12 text-yellow-500 mb-3" />
                  <p className="text-yellow-700 font-semibold mb-4">
                    Please set your API key to upload files
                  </p>
                  <button
                    onClick={() => setApiKeyModalOpen(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                  >
                    <Key className="inline h-4 w-4 mr-2" />
                    Set API Key
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        CSV File
                      </label>
                      <input
                        id="csv-file-input"
                        type="file"
                        accept=".csv"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSelectedFile(e.target.files?.[0] || null);
                          setLastUploadSuccess(false);
                        }}
                        className="w-full cursor-pointer bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                      />
                      {selectedFile && (
                        <p className="text-sm text-gray-600 mt-2 flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {selectedFile.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {lastUploadSuccess ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-semibold">
                          Job created successfully!
                        </span>
                      </div>
                      <button
                        onClick={handleCreateNewOne}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Upload className="h-5 w-5" />
                        Create New One
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleUpload}
                      disabled={!selectedFile || uploading}
                      className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="animate-spin h-5 w-5" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5" />
                          Upload & Start Job
                        </>
                      )}
                    </button>
                  )}
                </>
              )}
            </div>

            {/* FILTER & ADMIN CONTROLS */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-4 items-center">
                  <label className="text-gray-700 font-semibold">Filter:</label>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      disabled={!isApiKeySaved}
                      className="bg-white text-gray-900 rounded-lg px-4 py-2.5 border border-gray-300 hover:border-teal-500 flex items-center gap-2 min-w-[200px] justify-between disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <span>{getFilterLabel(jobScope)}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {dropdownOpen && isApiKeySaved && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setDropdownOpen(false)}
                        />
                        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                          {FILTER_OPTIONS.map((val: FilterScope) => (
                            <button
                              key={val}
                              onClick={() => handleFilterSelect(val)}
                              className={`w-full text-left px-4 py-2.5 cursor-pointer hover:bg-teal-50 ${
                                jobScope === val
                                  ? "bg-teal-50 text-teal-700 font-semibold"
                                  : "text-gray-700"
                              }`}
                            >
                              {getFilterLabel(val)}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchJobs(true)}
                    disabled={!isApiKeySaved}
                    className="bg-gray-50 cursor-pointer hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg transition-all border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw
                      className={`inline h-5 w-5 ${
                        loading ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                  <button
                    onClick={stopAllJobs}
                    disabled={!isApiKeySaved}
                    className="bg-red-50 cursor-pointer hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-all border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <StopCircle className="inline h-5 w-5 mr-2" />
                    Stop All
                  </button>
                  <button
                    onClick={clearQueue}
                    disabled={!isApiKeySaved}
                    className="bg-orange-50 cursor-pointer hover:bg-orange-100 text-orange-700 px-4 py-2 rounded-lg transition-all border border-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="inline h-5 w-5 mr-2" />
                    Clear Queue
                  </button>
                </div>
              </div>
            </div>

            {/* JOBS LIST */}
            <div className="space-y-6">
              {!isApiKeySaved ? (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-16 text-center">
                  <Key className="mx-auto h-16 w-16 text-blue-400 mb-4" />
                  <p className="text-blue-700 text-lg font-semibold mb-4">
                    Please set your API key to view jobs
                  </p>
                  <button
                    onClick={() => setApiKeyModalOpen(true)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                  >
                    <Key className="inline h-4 w-4 mr-2" />
                    Set API Key
                  </button>
                </div>
              ) : loading && jobs.length === 0 ? (
                <div className="text-center py-20">
                  <Loader2 className="inline animate-spin h-12 w-12 text-teal-600" />
                  <p className="text-gray-500 mt-4">Loading jobs...</p>
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                  <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No jobs found</p>
                </div>
              ) : (
                jobs.map((job: Job) => {
                  const badge: StateBadge = getStateBadge(job.state);
                  const IconComponent: LucideIcon = badge.icon;

                  return (
                    <div
                      key={job.job_id}
                      className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {job.file_name}
                          </h3>
                          <p className="text-gray-500 text-sm">
                            ID: {job.job_id}
                          </p>
                        </div>
                        <span
                          className={`${badge.bg} ${badge.text} px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2`}
                        >
                          <IconComponent
                            className={`h-4 w-4 ${
                              job.state === "running" ? "animate-spin" : ""
                            }`}
                          />
                          {job.state.replace(/_/g, " ")}
                        </span>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <p className="text-gray-600 text-sm mb-1 font-medium">
                            Total
                          </p>
                          <p className="text-gray-900 text-3xl font-bold">
                            {job.total}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                          <p className="text-gray-600 text-sm mb-1 font-medium">
                            Done
                          </p>
                          <p className="text-gray-900 text-3xl font-bold">
                            {job.done}
                          </p>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                          <p className="text-green-700 text-sm mb-1 font-medium">
                            Success
                          </p>
                          <p className="text-green-900 text-3xl font-bold">
                            {job.success}
                          </p>
                        </div>
                        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                          <p className="text-red-700 text-sm mb-1 font-medium">
                            Failed
                          </p>
                          <p className="text-red-900 text-3xl font-bold">
                            {job.failed}
                          </p>
                        </div>
                      </div>

                      {job.total > 0 && (
                        <div className="mb-6">
                          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-teal-600 h-full transition-all duration-500 rounded-full"
                              style={{
                                width: `${(job.done / job.total) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-gray-600 text-sm mt-2 font-medium">
                            {((job.done / job.total) * 100).toFixed(1)}%
                            complete
                          </p>
                        </div>
                      )}

                      <div className="text-sm text-gray-600 mb-6 space-y-1">
                        <p>Created: {formatDate(job.created_at)}</p>
                        {job.finished_at && (
                          <p>Finished: {formatDate(job.finished_at)}</p>
                        )}
                      </div>

                      <div className="flex gap-3 flex-wrap">
                        {(job.state === "completed" ||
                          job.state === "partial_completed") && (
                          <>
                            <button
                              onClick={() =>
                                downloadResults(job.job_id, "json")
                              }
                              className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                            >
                              <Download className="h-4 w-4" />
                              Download JSON Results
                            </button>
                            <button
                              onClick={() => downloadResults(job.job_id, "csv")}
                              className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                            >
                              <FileText className="h-4 w-4" />
                              Download Summary CSV
                            </button>
                          </>
                        )}
                        {(job.state === "running" ||
                          job.state === "queued" ||
                          job.state === "waiting_capacity") && (
                          <button
                            onClick={() => cancelJob(job.job_id)}
                            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
                          >
                            <X className="h-4 w-4" />
                            Cancel Job
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* USAGE TAB */}
        {activeTab === "usage" && (
          <div className="space-y-8">
            {!isApiKeySaved ? (
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-16 text-center">
                <Key className="mx-auto h-16 w-16 text-blue-400 mb-4" />
                <p className="text-blue-700 text-lg font-semibold mb-4">
                  Please set your API key to view usage data
                </p>
                <button
                  onClick={() => setApiKeyModalOpen(true)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  <Key className="inline h-4 w-4 mr-2" />
                  Set API Key
                </button>
              </div>
            ) : loading ? (
              <div className="text-center py-20">
                <Loader2 className="inline animate-spin h-12 w-12 text-teal-600" />
              </div>
            ) : usageData ? (
              <>
                {/* HERO STATS */}
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        Usage Overview
                      </h2>
                      <p className="text-slate-400 text-sm">
                        Your scraping activity at a glance
                      </p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                      <span className="text-slate-300 text-sm">
                        Last updated:{" "}
                      </span>
                      <span className="text-white font-medium text-sm">
                        Just now
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-violet-600 to-violet-500 rounded-2xl p-6 border border-violet-400/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-white/20 rounded-lg p-2">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-violet-200 text-xs font-medium uppercase tracking-wider">
                            Today
                          </span>
                        </div>
                        <p className="text-white text-4xl font-bold mb-1">
                          {usageData.totals.today.toLocaleString()}
                        </p>
                        <p className="text-violet-200 text-sm">
                          profiles scraped
                        </p>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-2xl p-6 border border-cyan-400/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-white/20 rounded-lg p-2">
                            <Calendar className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-cyan-200 text-xs font-medium uppercase tracking-wider">
                            This Month
                          </span>
                        </div>
                        <p className="text-white text-4xl font-bold mb-1">
                          {usageData.totals.this_month.toLocaleString()}
                        </p>
                        <p className="text-cyan-200 text-sm">
                          profiles scraped
                        </p>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-2xl p-6 border border-emerald-400/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-white/20 rounded-lg p-2">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-emerald-200 text-xs font-medium uppercase tracking-wider">
                            This Year
                          </span>
                        </div>
                        <p className="text-white text-4xl font-bold mb-1">
                          {usageData.totals.this_year.toLocaleString()}
                        </p>
                        <p className="text-emerald-200 text-sm">
                          profiles scraped
                        </p>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="relative bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl p-6 border border-amber-400/20">
                        <div className="flex items-center justify-between mb-4">
                          <div className="bg-white/20 rounded-lg p-2">
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-amber-200 text-xs font-medium uppercase tracking-wider">
                            Lifetime
                          </span>
                        </div>
                        <p className="text-white text-4xl font-bold mb-1">
                          {usageData.totals.lifetime.toLocaleString()}
                        </p>
                        <p className="text-amber-200 text-sm">
                          profiles scraped
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* MONTHLY BREAKDOWN */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                      Monthly Breakdown
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                      Detailed view of your daily scraping activity
                    </p>
                  </div>

                  <div className="p-6">
                    {Object.entries(usageData.monthly_breakdown).map(
                      ([month, days]: [string, Record<string, DayData>]) => (
                        <div key={month} className="mb-8 last:mb-0">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-teal-100 rounded-lg p-2">
                              <Calendar className="h-5 w-5 text-teal-600" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {new Date(month + "-01").toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                  },
                                )}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {Object.keys(days).length} active days
                              </p>
                            </div>
                          </div>

                          <div className="grid gap-3">
                            {Object.entries(days).map(
                              ([day, data]: [string, DayData]) => {
                                const percentage: number =
                                  usageData.totals.this_month > 0
                                    ? (data.total /
                                        usageData.totals.this_month) *
                                      100
                                    : 0;

                                return (
                                  <div
                                    key={day}
                                    className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all border border-gray-100 hover:border-gray-200"
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <div className="flex items-center gap-3">
                                        <div className="bg-white rounded-lg px-3 py-1.5 border border-gray-200 shadow-sm">
                                          <span className="text-gray-900 font-bold">
                                            {day}
                                          </span>
                                        </div>
                                        <div>
                                          <p className="text-gray-900 font-semibold">
                                            {new Date(
                                              month +
                                                "-" +
                                                day.padStart(2, "0"),
                                            ).toLocaleDateString("en-US", {
                                              weekday: "long",
                                            })}
                                          </p>
                                          <p className="text-gray-500 text-sm">
                                            {data.jobs.length} job
                                            {data.jobs.length !== 1
                                              ? "s"
                                              : ""}{" "}
                                            completed
                                          </p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-teal-600 font-bold text-xl">
                                          {data.total.toLocaleString()}
                                        </p>
                                        <p className="text-gray-500 text-sm">
                                          profiles
                                        </p>
                                      </div>
                                    </div>

                                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                                      <div
                                        className="bg-gradient-to-r from-teal-500 to-teal-400 h-full rounded-full transition-all duration-500"
                                        style={{
                                          width: `${Math.min(percentage, 100)}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                <TrendingUp className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No usage data available</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkedInScraperDashboard;
