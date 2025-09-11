import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import { FileText, MapPin, AlertTriangle, User, Phone, Mail, Calendar, BarChart3, TrendingUp, Users, Map, Shield } from "lucide-react";
import { createDroughtReport, getDroughtReports, getUserStats } from "../utils/auth";

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [reports, setReports] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    severity: "Mild",
    description: "",
    contact_name: "",
    phone: "",
    email: ""
  });

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "report", label: "Report", icon: "📝" },
    { id: "analytics", label: "Analytics", icon: "📈" }
  ];

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchAnalyticsData();
    }
  }, [activeTab]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const [reportsResult, statsResult] = await Promise.all([
        getDroughtReports(),
        getUserStats()
      ]);

      if (reportsResult.success) {
        setReports(reportsResult.reports);
      }

      if (statsResult.success) {
        setUserStats(statsResult.stats);
      }
    } catch (error) {
      alert("An error occurred while fetching analytics data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitReport = async (e) => {
    e.preventDefault();

    if (!formData.location || !formData.description || !formData.contact_name || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const result = await createDroughtReport(formData);
      if (result.success) {
        alert("Drought report submitted successfully!");
        setFormData({
          location: "",
          severity: "Mild",
          description: "",
          contact_name: "",
          phone: "",
          email: ""
        });
      } else {
        alert(result.message || "Failed to submit report");
      }
    } catch (error) {
      alert("An error occurred while submitting the report");
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Mild': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Severe': return 'bg-orange-100 text-orange-800';
      case 'Extreme': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Analytics calculations
  const getAnalyticsData = () => {
    const myReports = reports.filter(r => r.contact_name === user?.name || r.phone === user?.phone);
    const totalReports = reports.length;
    const totalFarmers = userStats.farmers || 0;
    const totalNGOs = userStats.ngos || 0;

    const severityBreakdown = {
      Mild: reports.filter(r => r.severity === 'Mild').length,
      Moderate: reports.filter(r => r.severity === 'Moderate').length,
      Severe: reports.filter(r => r.severity === 'Severe').length,
      Extreme: reports.filter(r => r.severity === 'Extreme').length
    };

    const monthlyReports = {};
    reports.forEach(report => {
      const date = new Date(report.created_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyReports[monthKey] = (monthlyReports[monthKey] || 0) + 1;
    });

    const topLocations = {};
    reports.forEach(report => {
      topLocations[report.location] = (topLocations[report.location] || 0) + 1;
    });

    return {
      myReports: myReports.length,
      totalReports,
      totalFarmers,
      totalNGOs,
      severityBreakdown,
      monthlyReports,
      topLocations,
      myReportsList: myReports
    };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-green-100">We're here to help you manage drought challenges and improve your farm's resilience.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Reports</p>
              <p className="text-2xl font-bold text-gray-900">{getAnalyticsData().myReports}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available NGOs</p>
              <p className="text-2xl font-bold text-gray-900">{getAnalyticsData().totalNGOs}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Farmers</p>
              <p className="text-2xl font-bold text-gray-900">{getAnalyticsData().totalFarmers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab("report")}
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <FileText className="h-5 w-5" />
            Submit Report
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Drought Management Tips */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Drought Management Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Water Conservation</h4>
                <p className="text-sm text-gray-600">Implement drip irrigation and rainwater harvesting systems</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Crop Selection</h4>
                <p className="text-sm text-gray-600">Choose drought-resistant crop varieties</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Soil Management</h4>
                <p className="text-sm text-gray-600">Use mulch and organic matter to retain soil moisture</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Seek Support</h4>
                <p className="text-sm text-gray-600">Contact NGOs and government agencies for assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">My Recent Reports</h3>
        {getAnalyticsData().myReportsList.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reports submitted yet. Submit your first report to get help!</p>
        ) : (
          <div className="space-y-4">
            {getAnalyticsData().myReportsList.slice(0, 3).map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-gray-900">{report.location}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderReport = () => (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Submit Drought Report</h2>
        <p className="text-gray-600">Report drought conditions to get assistance from NGOs and support organizations</p>
      </div>

      {/* Report Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <form onSubmit={handleSubmitReport} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter your farm location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity Level <span className="text-red-500">*</span>
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Extreme">Extreme</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Describe the drought conditions, crop damage, and specific challenges you're facing..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Your phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-6 rounded-lg font-medium transition-colors"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderAnalytics = () => {
    const analytics = getAnalyticsData();

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="text-gray-600">Insights into drought reports and community statistics</p>
          </div>
          <button
            onClick={fetchAnalyticsData}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {loading ? "Loading..." : "Refresh Data"}
          </button>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics data...</p>
          </div>
        ) : (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">My Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.myReports}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Reports</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalReports}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Available NGOs</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalNGOs}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical Cases</p>
                    <p className="text-2xl font-bold text-red-600">{analytics.severityBreakdown.Severe + analytics.severityBreakdown.Extreme}</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-lg">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Severity Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Severity Distribution</h3>
                <div className="space-y-4">
                  {Object.entries(analytics.severityBreakdown).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full ${getSeverityColor(severity).replace('text-', 'bg-').replace('100', '500')}`}></div>
                        <span className="text-sm font-medium text-gray-700">{severity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getSeverityColor(severity).replace('text-', 'bg-').replace('100', '500')}`}
                            style={{ width: `${analytics.totalReports > 0 ? (count / analytics.totalReports) * 100 : 0}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Locations */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Affected Locations</h3>
                <div className="space-y-4">
                  {Object.entries(analytics.topLocations)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5)
                    .map(([location, count]) => (
                      <div key={location} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Map className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-700">{location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${analytics.totalReports > 0 ? (count / analytics.totalReports) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{count}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Monthly Trend */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Report Trend</h3>
              <div className="space-y-4">
                {Object.entries(analytics.monthlyReports)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .slice(-6)
                  .map(([month, count]) => {
                    const [year, monthNum] = month.split('-');
                    const monthName = new Date(year, monthNum - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                    return (
                      <div key={month} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{monthName}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 bg-green-500 rounded-full"
                              style={{ width: `${Math.max(...Object.values(analytics.monthlyReports)) > 0 ? (count / Math.max(...Object.values(analytics.monthlyReports))) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{count}</span>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <DashboardLayout
      title="Farmer Dashboard"
      user={user}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === "overview" && renderOverview()}
      {activeTab === "report" && renderReport()}
      {activeTab === "analytics" && renderAnalytics()}
    </DashboardLayout>
  );
}
