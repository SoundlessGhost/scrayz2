"use client";
import { toast } from "sonner";
import React, { useState, useEffect, useCallback } from "react";
import type { LucideIcon } from "lucide-react";
import {
  X,
  Clock,
  Upload,
  XCircle,
  Loader2,
  FileText,
  Download,
  Calendar,
  RefreshCw,
  TrendingUp,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

// CONFIGURATION - UPDATE THESE VALUES
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8777";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "replace_with_your_api_key";

interface Job {
  job_id: string;
  file_name: string;
  state: string;
  total: number;
  done: number;
  success: number;
  failed: number;
  created_at: number;
  finished_at?: number;
  last_error?: string;
}

interface DayData {
  total: number;
  jobs: string[];
}

interface UsageData {
  totals: {
    today: number;
    this_month: number;
    this_year: number;
    lifetime: number;
  };
  monthly_breakdown: Record<string, Record<string, DayData>>;
}

type JobScope = "all" | "today" | "yesterday" | "day_before_yesterday" | "this_month";

const LinkedInScraperDashboard = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [retries, setRetries] = useState(3);
  const [timeoutSeconds, setTimeoutSeconds] = useState(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [jobScope, setJobScope] = useState<JobScope>("all");
  const [usageData, setUsageData] = useState<UsageData | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("jobs");
  const [concurrency, setConcurrency] = useState(50);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  // FETCH JOBS
  const fetchJobs = useCallback(async (showLoader: boolean = false) => {
    if (showLoader) {
      setLoading(true);
    }
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/jobs?limit=50&scope=${jobScope}`, {
        headers: { "X-API-Key": API_KEY, accept: "application/json" },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setJobs(data);
      } else {
        console.error("API returned non-array data:", data);
        setJobs([]);
        setApiError("API returned invalid data format");
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
      setJobs([]);
      setApiError(
        "Failed to connect to API. Make sure the backend is running.",
      );
    } finally {
      if (showLoader) {
        setLoading(false);
      }
      setInitialLoading(false);
    }
  }, [jobScope]);

  // FETCH USAGE DATA
  const fetchUsage = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const res = await fetch(`${API_BASE}/me/usage`, {
        headers: { "X-API-Key": API_KEY },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setUsageData(data);
    } catch (err) {
      console.error("Failed to fetch usage:", err);
      setUsageData(null);
      setApiError(
        "Failed to connect to API. Make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  // UPLOAD CSV AND CREATE JOB
  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setApiError(null);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("concurrency", concurrency.toString());
    formData.append("retries", retries.toString());
    formData.append("timeout_s", timeoutSeconds.toString());

    try {
      const res = await fetch(`${API_BASE}/jobs`, {
        method: "POST",
        headers: { "X-API-Key": API_KEY },
        body: formData,
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Upload failed: ${res.status} - ${errorText}`);
      }

      const data = await res.json();
      toast(`Job created successfully! Job ID: ${data.job_id}`);
      setSelectedFile(null);
      fetchJobs(false); // ✅ Background refresh, no loader
    } catch (err) {
      console.error("Upload error:", err);
      setApiError("Failed to upload file");
      toast("Failed to create job: " + "Unknown error");
    } finally {
      setUploading(false);
    }
  };

  // CANCEL JOB
  const cancelJob = async (jobId: string | number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}/cancel`, {
        method: "POST",
        headers: { "X-API-Key": API_KEY },
      });
      // Optionally handle response if needed:
      // const data: CancelJobResponse = await res.json();
      fetchJobs(false); // ✅ Background refresh, no loader
    } catch (err) {
      console.error("Failed to cancel job:", err);
    }
  };

  // DOWNLOAD JOB RESULTS
  interface DownloadResultsResponse {
    results_json_url: string;
    summary_csv_url: string;
  }

  const downloadResults = async (jobId: string | number): Promise<void> => {
    try {
      const res = await fetch(`${API_BASE}/jobs/${jobId}/download`, {
        headers: { "X-API-Key": API_KEY },
      });
      const data: DownloadResultsResponse = await res.json();
      window.open(data.results_json_url, "_blank");
      window.open(data.summary_csv_url, "_blank");
    } catch (err) {
      console.error("Failed to get download links:", err);
    }
  };

  // 1. FILTER LABEL SHOWER
  type FilterLabels = {
    [key in JobScope]: string;
  };

  const getFilterLabel = (value: JobScope): string => {
    const labels: FilterLabels = {
      all: "All",
      today: "Today",
      yesterday: "Yesterday",
      day_before_yesterday: "Day Before Yesterday",
      this_month: "This Month",
    };
    return labels[value] || "All";
  };

  // 2. FILTER SELECTION HANDLER
  interface HandleFilterSelect {
    (value: JobScope): void;
  }

  const handleFilterSelect: HandleFilterSelect = (value) => {
    setJobScope(value);
    setDropdownOpen(false);
    fetchJobs(true);
  };

  // FORMAT DATE
  interface FormatDate {
    (timestamp: number): string;
  }

  const formatDate: FormatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // GET STATE BADGE
  interface StateBadge {
    bg: string;
    text: string;
    icon: LucideIcon;
  }

  type JobState =
    | "queued"
    | "waiting_capacity"
    | "running"
    | "completed"
    | "partial_completed"
    | "cancelled"
    | string;

  interface StateBadges {
    [key: string]: StateBadge;
  }

  const getStateBadge = (state: JobState): StateBadge => {
    const badges: StateBadges = {
      queued: { bg: "bg-gray-100", text: "text-gray-700", icon: Clock },
      waiting_capacity: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: Clock,
      },
      running: { bg: "bg-blue-100", text: "text-blue-700", icon: Loader2 },
      completed: {
        bg: "bg-green-100",
        text: "text-green-700",
        icon: CheckCircle,
      },
      partial_completed: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        icon: CheckCircle,
      },
      cancelled: { bg: "bg-red-100", text: "text-red-700", icon: XCircle },
    };
    return badges[state] || badges.queued;
  };

  // INITIAL LOAD FETCH JOBS
  useEffect(() => {
    fetchJobs(true);
  }, [fetchJobs]);

  // PERIODICALLY FETCH JOBS EVERY 5 SECONDS
  useEffect(() => {
    const hasActiveJobs = jobs.some(
      (job) =>
        job.state === "running" ||
        job.state === "queued" ||
        job.state === "waiting_capacity",
    );

    if (hasActiveJobs) {
      const intervalId = setInterval(() => fetchJobs(false), 5000);
      return () => clearInterval(intervalId);
    }
  }, [fetchJobs, jobs]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* TABS */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
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
              fetchUsage();
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

        {/* API ERROR DISPLAY */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-red-100 rounded-full p-2">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-red-900 font-semibold text-lg mb-2">
                  Connection Error
                </h3>
                <p className="text-red-700 mb-4">{apiError}</p>
                <div className="bg-red-100 rounded-lg p-4 text-sm text-red-800 font-mono">
                  <p className="font-semibold mb-2">Troubleshooting:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Backend server is running at {API_BASE}</li>
                    <li>API_KEY is correct</li>
                    <li>CORS is enabled on backend</li>
                    <li>Firewall/Network allows connection</li>
                  </ul>
                </div>
              </div>
              <button
                onClick={() => setApiError(null)}
                className="text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* JOBS TAB */}
        {activeTab === "jobs" && (
          <div className="space-y-8">
            {/* UPLOAD SECTION */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Upload CSV
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    CSV File
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".csv"
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      className="w-full cursor-pointer bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                  </div>
                  {selectedFile && (
                    <p className="text-sm text-gray-600 mt-2 flex items-center">
                      <FileText className="h-4 w-4 mr-1" />
                      {selectedFile.name}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Concurrency
                    </label>
                    <input
                      type="number"
                      value={concurrency}
                      onChange={(e) => setConcurrency(Number(e.target.value))}
                      className="w-full  bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Retries
                    </label>
                    <input
                      type="number"
                      value={retries}
                      onChange={(e) => setRetries(Number(e.target.value))}
                      className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Timeout (s)
                    </label>
                    <input
                      type="number"
                      value={timeoutSeconds}
                      onChange={(e) => setTimeoutSeconds(Number(e.target.value))}
                      className="w-full bg-gray-50 text-gray-900 rounded-lg px-4 py-3 border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="mt-6 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
              >
                {uploading ? (
                  <>
                    <Loader2 className="inline animate-spin mr-2 h-5 w-5" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="inline mr-2 h-5 w-5" />
                    Upload & Start Job
                  </>
                )}
              </button>
            </div>

            {/* Filter Section */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <label className="text-gray-700 font-semibold">Filter:</label>
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-white cursor-pointer text-gray-900 rounded-lg px-4 py-2.5 border border-gray-300 hover:border-teal-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all flex items-center gap-2 min-w-50 justify-between"
                  >
                    <span>{getFilterLabel(jobScope)}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDropdownOpen(false)}
                      />
                      <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                        <button
                          onClick={() => handleFilterSelect("all")}
                          className={`w-full text-left px-4 py-2.5 cursor-pointer hover:bg-teal-50 transition-colors ${
                            jobScope === "all"
                              ? "bg-teal-50 text-teal-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => handleFilterSelect("today")}
                          className={`w-full cursor-pointer text-left px-4 py-2.5 hover:bg-teal-50 transition-colors ${
                            jobScope === "today"
                              ? "bg-teal-50 text-teal-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          Today
                        </button>
                        <button
                          onClick={() => handleFilterSelect("yesterday")}
                          className={`w-full cursor-pointer text-left px-4 py-2.5 hover:bg-teal-50 transition-colors ${
                            jobScope === "yesterday"
                              ? "bg-teal-50 text-teal-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          Yesterday
                        </button>
                        <button
                          onClick={() =>
                            handleFilterSelect("day_before_yesterday")
                          }
                          className={`w-full cursor-pointer text-left px-4 py-2.5 hover:bg-teal-50 transition-colors ${
                            jobScope === "day_before_yesterday"
                              ? "bg-teal-50 text-teal-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          Day Before Yesterday
                        </button>
                        <button
                          onClick={() => handleFilterSelect("this_month")}
                          className={`w-full cursor-pointer text-left px-4 py-2.5 hover:bg-teal-50 transition-colors ${
                            jobScope === "this_month"
                              ? "bg-teal-50 text-teal-700 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          This Month
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <button
                onClick={() => fetchJobs(true)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer px-4 py-2 rounded-lg transition-all border border-gray-300"
              >
                <RefreshCw className="inline h-5 w-5" />
              </button>
            </div>

            {/* Jobs List */}
            <div className="space-y-6">
              {initialLoading ? (
                <div className="text-center py-20">
                  <Loader2 className="inline animate-spin h-12 w-12 text-teal-600" />
                </div>
              ) : jobs.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                  <FileText className="mx-auto h-16 w-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No jobs found</p>
                </div>
              ) : (
                jobs.map((job) => {
                  const badge = getStateBadge(job.state);
                  const IconComponent = badge.icon;

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
                        {job.last_error && (
                          <p className="text-red-600 mt-2 bg-red-50 p-3 rounded-lg">
                            Error: {job.last_error}
                          </p>
                        )}
                      </div>

                      <div className="flex gap-3">
                        {(job.state === "completed" ||
                          job.state === "partial_completed") && (
                          <button
                            onClick={() => downloadResults(job.job_id)}
                            className="bg-teal-600 cursor-pointer hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
                          >
                            <Download className="inline mr-2 h-4 w-4" />
                            Download Results
                          </button>
                        )}
                        {(job.state === "running" ||
                          job.state === "queued" ||
                          job.state === "waiting_capacity") && (
                          <button
                            onClick={() => cancelJob(job.job_id)}
                            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md"
                          >
                            <X className="inline mr-2 h-4 w-4" />
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
            {loading ? (
              <div className="text-center py-20">
                <Loader2 className="inline animate-spin h-12 w-12 text-teal-600" />
              </div>
            ) : usageData ? (
              <>
                {/* TOTALS */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Usage Statistics
                  </h2>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-linear-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                      <p className="text-purple-100 text-sm mb-2 font-medium">
                        Today
                      </p>
                      <p className="text-white text-4xl font-bold">
                        {usageData.totals.today}
                      </p>
                    </div>
                    <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                      <p className="text-blue-100 text-sm mb-2 font-medium">
                        This Month
                      </p>
                      <p className="text-white text-4xl font-bold">
                        {usageData.totals.this_month}
                      </p>
                    </div>
                    <div className="bg-linear-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                      <p className="text-green-100 text-sm mb-2 font-medium">
                        This Year
                      </p>
                      <p className="text-white text-4xl font-bold">
                        {usageData.totals.this_year}
                      </p>
                    </div>
                    <div className="bg-linear-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                      <p className="text-orange-100 text-sm mb-2 font-medium">
                        Lifetime
                      </p>
                      <p className="text-white text-4xl font-bold">
                        {usageData.totals.lifetime}
                      </p>
                    </div>
                  </div>
                </div>

                {/* MONTHLY BREAKDOWN */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Monthly Breakdown
                  </h2>
                  {Object.entries(usageData.monthly_breakdown).map(
                    ([month, days]: [string, Record<string, DayData>]) => (
                      <div key={month} className="mb-8 last:mb-0">
                        <h3 className="text-xl font-bold text-teal-600 mb-4 flex items-center">
                          <Calendar className="mr-2 h-6 w-6" />
                          {month}
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(days).map(([day, data]: [string, DayData]) => (
                            <div
                              key={day}
                              className="bg-gray-50 rounded-xl p-5 border border-gray-200"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-900 font-semibold text-lg">
                                  Day {day}
                                </span>
                                <span className="text-teal-600 font-bold text-lg">
                                  {data.total} items
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {data.jobs.length} job
                                {data.jobs.length !== 1 ? "s" : ""}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
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
