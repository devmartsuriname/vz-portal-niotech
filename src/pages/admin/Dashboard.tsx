import { useAuth } from '@/integrations/supabase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  BarChart3, 
  FileText, 
  Settings,
  LogOut,
  Layout,
  Folder,
  MessageSquare
} from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/auth/sign-in');
  };

  const stats = [
    { title: 'Total Users', value: '2,543', icon: Users, color: 'text-blue-500' },
    { title: 'Projects', value: '142', icon: Folder, color: 'text-green-500' },
    { title: 'Messages', value: '1,253', icon: MessageSquare, color: 'text-purple-500' },
    { title: 'Analytics', value: '98.5%', icon: BarChart3, color: 'text-orange-500' },
  ];

  const quickLinks = [
    { title: 'Content Management', icon: FileText, description: 'Manage pages and content' },
    { title: 'User Management', icon: Users, description: 'View and manage users' },
    { title: 'Analytics', icon: BarChart3, description: 'View site analytics' },
    { title: 'Settings', icon: Settings, description: 'System configuration' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">VZ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-slate-400">Welcome back, {user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-slate-700 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-purple-500 transition-colors cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mb-3">
                    <link.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{link.title}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {link.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-slate-400">
              Latest updates and changes to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New user registered', time: '2 minutes ago', type: 'user' },
                { action: 'Content updated', time: '15 minutes ago', type: 'content' },
                { action: 'System backup completed', time: '1 hour ago', type: 'system' },
                { action: 'New project created', time: '3 hours ago', type: 'project' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <span className="text-slate-300">{activity.action}</span>
                  </div>
                  <span className="text-sm text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
