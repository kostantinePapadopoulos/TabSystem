import CustomTabSystem from "./components/CustomTabSystem/CustomTabSystem";

function App() {
  const tabItems = [
    {
      tabTitle: "Dashboard Overview",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Dashboard Overview
          </h3>
          <p className="text-gray-600">
            Welcome to your dashboard! Here you can see all your important
            metrics and data.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">Total Users</h4>
              <p className="text-2xl font-bold text-blue-600">1,234</p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Revenue</h4>
              <p className="text-2xl font-bold text-green-600">$12,345</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Orders</h4>
              <p className="text-2xl font-bold text-purple-600">567</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: "Analytics and Performance Metrics",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Analytics Report
          </h3>
          <p className="text-gray-600">
            Deep dive into your performance metrics and trends.
          </p>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Monthly Growth</h4>
            <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded flex items-end justify-center">
              <p className="text-white font-semibold mb-4">
                📈 +24% this month
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <h4 className="font-semibold mb-2">Additional Metrics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Page Views</span>
                <span className="font-semibold">45,678</span>
              </div>
              <div className="flex justify-between">
                <span>Unique Visitors</span>
                <span className="font-semibold">12,345</span>
              </div>
              <div className="flex justify-between">
                <span>Bounce Rate</span>
                <span className="font-semibold">32.5%</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: "User Management Settings",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Application Settings
          </h3>
          <p className="text-gray-600">
            Configure your application preferences and options.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <span className="text-gray-700">Email notifications</span>
              <div className="w-12 h-6 bg-blue-500 rounded-full flex items-center justify-end px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <span className="text-gray-700">Dark mode</span>
              <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center justify-start px-1">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: "Help and Support Documentation",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Help & Support
          </h3>
          <p className="text-gray-600">
            Find answers to common questions and get support.
          </p>
          <div className="space-y-2">
            <div className="p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-gray-800">
                Getting Started Guide
              </h4>
              <p className="text-sm text-gray-600">
                Learn the basics of using the application
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-gray-800">FAQ</h4>
              <p className="text-sm text-gray-600">
                Frequently asked questions and answers
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-gray-800">Contact Support</h4>
              <p className="text-sm text-gray-600">
                Get in touch with our support team
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-gray-800">Documentation</h4>
              <p className="text-sm text-gray-600">
                Comprehensive guides and API documentation
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-gray-800">Community Forums</h4>
              <p className="text-sm text-gray-600">
                Connect with other users and share tips
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer">
              <h4 className="font-semibold text-gray-800">Video Tutorials</h4>
              <p className="text-sm text-gray-600">
                Step-by-step video guides for common tasks
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      tabTitle: "Reports and Data Export",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Reports</h3>
          <p className="text-gray-600">Generate and export various reports.</p>
        </div>
      ),
    },
    {
      tabTitle: "System Administration Panel",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Admin Panel</h3>
          <p className="text-gray-600">
            Administrative tools and system management.
          </p>
        </div>
      ),
    },
    {
      tabTitle: "Quick Note",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Quick Note</h3>
          <p className="text-gray-600">
            This is a much shorter tab to demonstrate height transitions.
          </p>
        </div>
      ),
    },
    {
      tabTitle: "Integration and API Management",
      tabContent: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Integrations</h3>
          <p className="text-gray-600">
            Manage third-party integrations and API connections.
          </p>
        </div>
      ),
    },
    {
      tabTitle: "Disabled Tab with Long Name",
      tabContent: <div>This tab is disabled</div>,
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen w-screen max-w-screen flex flex-col p-10 gap-5">
      <CustomTabSystem tabItems={tabItems} defaultActiveIndex={1} />
      <div className="bg-yellow-100 p-10">Div below tab</div>
    </div>
  );
}

export default App;
