import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import DashboardLayout from "../components/DashboardLayout";
import { FileText, MapPin, AlertTriangle, User, Phone, Mail, Calendar, Eye, PhoneCall, X, BarChart3, TrendingUp, Users, Map, Shield } from "lucide-react";
import { getDroughtReports, getUsers } from "../utils/auth";

export default function NGODashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "reports", label: "Farmer Reports", icon: "📝" },
    { id: "analytics", label: "Analytics", icon: "📈" }
  ];

  useEffect(() => {
    if (activeTab === "reports") {
      fetchReports();
    } else if (activeTab === "analytics") {
      fetchAnalyticsData();
    }
  }, [activeTab]);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const result = await getDroughtReports();
      if (result.success) {
        setReports(result.reports);
      } else {
        alert(result.message || "Failed to fetch reports");
      }
    } catch (error) {
      alert("An error occurred while fetching reports");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const [reportsResult, usersResult] = await Promise.all([
        getDroughtReports(),
        getUsers()
      ]);
      
      if (reportsResult.success) {
        setReports(reportsResult.reports);
      }
      
      if (usersResult.success) {
        setUsers(usersResult.users);
      }
    } catch (error) {
      alert("An error occurred while fetching analytics data");
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

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowViewModal(true);
  };

  const handleContactFarmer = (report) => {
    const contactInfo = `Contact Information:\nName: ${report.contact_name}\nPhone: ${report.phone}${report.email ? `\nEmail: ${report.email}` : ''}`;
    alert(contactInfo);
  };

  // Analytics calculations
  const getAnalyticsData = () => {
    const totalReports = reports.length;
    const totalFarmers = users.filter(u => u.role === 'farmer').length;
    const totalNGOs = users.filter(u => u.role === 'ngo').length;
    
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
      totalReports,
      totalFarmers,
      totalNGOs,
      severityBreakdown,
      monthlyReports,
      topLocations
    };
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100">Help farmers in need by reviewing and responding to drought reports.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Severe Cases</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => r.severity === 'Severe' || r.severity === 'Extreme').length}
              </p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {reports.filter(r => {
                  const reportDate = new Date(r.created_at);
                  const now = new Date();
                  return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear();
                }).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setActiveTab("reports")}
            className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <FileText className="h-5 w-5" />
            View All Reports
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
          >
            <BarChart3 className="h-5 w-5" />
            View Analytics
          </button>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reports</h3>
        {reports.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reports available yet.</p>
        ) : (
          <div className="space-y-4">
            {reports.slice(0, 3).map((report) => (
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
                        <User className="h-3 w-3" />
                        {report.contact_name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(report.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewReport(report)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleContactFarmer(report)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Contact Farmer"
                    >
                      <PhoneCall className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Farmer Reports</h2>
          <p className="text-gray-600">Review and respond to drought reports from farmers</p>
        </div>
        <button
          onClick={fetchReports}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No drought reports available yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">{report.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900 line-clamp-2 max-w-xs">{report.description}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center gap-1 mb-1">
                          <User className="h-3 w-3 text-gray-400" />
                          <span>{report.contact_name}</span>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Phone className="h-3 w-3 text-gray-400" />
                          <span>{report.phone}</span>
                        </div>
                        {report.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{report.email}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(report.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewReport(report)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="View full report"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleContactFarmer(report)}
                          className="text-green-600 hover:text-green-900 p-1 rounded transition-colors"
                          title="Contact farmer"
                        >
                          <PhoneCall className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
            <p className="text-gray-600">Comprehensive insights into drought reports and user activity</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                    <p className="text-2xl font-bold text-gray-900">{analytics.totalFarmers}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total NGOs</p>
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Affected Locations</h3>
                <div className="space-y-4">
                  {Object.entries(analytics.topLocations)
                    .sort(([,a], [,b]) => b - a)
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
                              className="h-2 bg-blue-500 rounded-full"
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
    <>
      <DashboardLayout
        title="NGO Dashboard"
        user={user}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === "overview" && renderOverview()}
        {activeTab === "reports" && renderReports()}
        {activeTab === "analytics" && renderAnalytics()}
      </DashboardLayout>

      {/* View Report Modal */}
      {showViewModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedReport.location}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Severity</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedReport.severity)}`}>
                    {selectedReport.severity}
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{selectedReport.description}</p>
              </div>
              <div className="border-t pt-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedReport.contact_name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedReport.phone}</p>
                  </div>
                  {selectedReport.email && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedReport.email}</p>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Submitted</label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{formatDate(selectedReport.created_at)}</p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200">
              <div className="flex gap-4">
                <button
                  onClick={() => handleContactFarmer(selectedReport)}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Contact Farmer
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
