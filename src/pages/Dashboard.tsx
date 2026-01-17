import React from "react";
import { StatCard, Card, CardHeader, CardTitle, CardContent } from "@/components/common";
import { Users, UsersRound, MessageSquare, ThumbsUp, TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      icon: <Users className="h-5 w-5" />,
      change: { value: 12.5, type: "increase" as const },
    },
    {
      title: "Family Groups",
      value: "3,429",
      icon: <UsersRound className="h-5 w-5" />,
      change: { value: 8.2, type: "increase" as const },
    },
    {
      title: "AI Interactions",
      value: "89,234",
      icon: <MessageSquare className="h-5 w-5" />,
      change: { value: 23.1, type: "increase" as const },
    },
    {
      title: "AI Feedback",
      value: "4,521",
      icon: <ThumbsUp className="h-5 w-5" />,
      change: { value: 5.4, type: "decrease" as const },
    },
  ];

  const activityData = [
    { name: "Mon", users: 1200, interactions: 4000 },
    { name: "Tue", users: 1350, interactions: 4500 },
    { name: "Wed", users: 1100, interactions: 3800 },
    { name: "Thu", users: 1450, interactions: 5200 },
    { name: "Fri", users: 1600, interactions: 5800 },
    { name: "Sat", users: 900, interactions: 3200 },
    { name: "Sun", users: 850, interactions: 2900 },
  ];

  const feedbackData = [
    { name: "Jan", positive: 320, negative: 45 },
    { name: "Feb", positive: 410, negative: 52 },
    { name: "Mar", positive: 380, negative: 38 },
    { name: "Apr", positive: 520, negative: 61 },
    { name: "May", positive: 590, negative: 48 },
    { name: "Jun", positive: 680, negative: 55 },
  ];

  const recentActivities = [
    { user: "Sarah Johnson", action: "Created new family group", time: "2 min ago" },
    { user: "Mike Chen", action: "Submitted AI feedback", time: "15 min ago" },
    { user: "Emily Davis", action: "Added 3 family members", time: "1 hour ago" },
    { user: "John Smith", action: "Updated AI preferences", time: "2 hours ago" },
    { user: "Lisa Wang", action: "Joined a family group", time: "3 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">User Activity</CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-chart-1" />
                  <span className="text-muted-foreground">Users</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-chart-2" />
                  <span className="text-muted-foreground">Interactions</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUsers)"
                  />
                  <Area
                    type="monotone"
                    dataKey="interactions"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorInteractions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Chart */}
        <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">AI Feedback Overview</CardTitle>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-status-success" />
                  <span className="text-muted-foreground">Positive</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-status-error" />
                  <span className="text-muted-foreground">Negative</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="positive" fill="hsl(var(--status-success))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="negative" fill="hsl(var(--status-error))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="animate-fade-in" style={{ animationDelay: "600ms" }}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Recent Activity</CardTitle>
            <button className="text-sm text-accent hover:underline">View all</button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-xs font-medium text-secondary-foreground">
                      {activity.user.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
