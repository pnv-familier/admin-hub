import React, { useState } from "react";
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Input } from "@/components/common";
import { Settings, Save, RotateCcw, AlertCircle, Check, Sparkles, MessageSquare, Calendar, DollarSign } from "lucide-react";

interface AIFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  prompt: string;
  icon: React.ReactNode;
}

const AIControl = () => {
  const [features, setFeatures] = useState<AIFeature[]>([
    {
      id: "chat-assistant",
      name: "Family Chat Assistant",
      description: "General-purpose AI assistant for family conversations and queries",
      enabled: true,
      prompt: "You are a helpful family assistant. Be warm, supportive, and provide practical advice for family-related topics. Keep responses concise and actionable. Always prioritize safety and well-being of family members.",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      id: "activity-suggestions",
      name: "Activity Suggestions",
      description: "AI-powered suggestions for family activities and entertainment",
      enabled: true,
      prompt: "Suggest engaging family activities based on the user's preferences, age groups in the family, and local weather/season. Provide a mix of indoor and outdoor options. Consider budget-friendly alternatives.",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: "meal-planning",
      name: "Meal Planning",
      description: "Intelligent meal planning and recipe recommendations",
      enabled: false,
      prompt: "Help families plan nutritious and delicious meals. Consider dietary restrictions, preferences, and cooking skill levels. Provide simple, family-friendly recipes with common ingredients.",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "budget-helper",
      name: "Budget Helper",
      description: "Family budget management and financial advice",
      enabled: true,
      prompt: "Assist families with budget planning and financial decisions. Provide practical money-saving tips and help track expenses. Focus on family-specific financial goals like education savings and vacation planning.",
      icon: <DollarSign className="h-5 w-5" />,
    },
  ]);

  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    );
    setHasChanges(true);
    setSaved(false);
  };

  const updatePrompt = (id: string, prompt: string) => {
    setFeatures((prev) =>
      prev.map((f) => (f.id === id ? { ...f, prompt } : f))
    );
    setHasChanges(true);
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setHasChanges(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    // Reset to default prompts
    setFeatures((prev) =>
      prev.map((f) => ({
        ...f,
        prompt: getDefaultPrompt(f.id),
      }))
    );
    setHasChanges(true);
  };

  const getDefaultPrompt = (id: string): string => {
    const defaults: Record<string, string> = {
      "chat-assistant": "You are a helpful family assistant. Be warm, supportive, and provide practical advice for family-related topics.",
      "activity-suggestions": "Suggest engaging family activities based on the user's preferences and local conditions.",
      "meal-planning": "Help families plan nutritious and delicious meals. Consider dietary restrictions and preferences.",
      "budget-helper": "Assist families with budget planning and financial decisions. Provide practical money-saving tips.",
    };
    return defaults[id] || "";
  };

  const enabledCount = features.filter((f) => f.enabled).length;

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI Feature Control</h1>
          <p className="text-muted-foreground mt-1">Configure and customize AI behavior and prompts</p>
        </div>
        <div className="flex items-center gap-2">
          {saved && (
            <div className="flex items-center gap-2 text-sm text-status-success animate-fade-in">
              <Check className="h-4 w-4" />
              Changes saved
            </div>
          )}
          <Button variant="outline" onClick={handleReset} disabled={saving}>
            <RotateCcw className="h-4 w-4" />
            Reset Defaults
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges || saving} loading={saving}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Status overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Settings className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">AI Features Status</p>
              <p className="text-sm text-muted-foreground">
                {enabledCount} of {features.length} features are currently active
              </p>
            </div>
          </div>
          {hasChanges && (
            <Badge variant="warning" className="gap-1">
              <AlertCircle className="h-3 w-3" />
              Unsaved changes
            </Badge>
          )}
        </div>
      </Card>

      {/* Feature cards */}
      <div className="space-y-4">
        {features.map((feature, index) => (
          <Card
            key={feature.id}
            className="animate-fade-in overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg transition-colors ${
                      feature.enabled ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                      <Badge variant={feature.enabled ? "success" : "secondary"}>
                        {feature.enabled ? "Active" : "Disabled"}
                      </Badge>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </div>

                {/* Toggle switch */}
                <button
                  onClick={() => toggleFeature(feature.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    feature.enabled ? "bg-accent" : "bg-muted"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                      feature.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </CardHeader>

            <CardContent className="border-t pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                  Custom AI Prompt
                </label>
                <textarea
                  value={feature.prompt}
                  onChange={(e) => updatePrompt(feature.id, e.target.value)}
                  disabled={!feature.enabled}
                  className="w-full min-h-[120px] p-3 rounded-lg border border-input bg-background text-sm resize-y focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter custom instructions for this AI feature..."
                />
                <p className="text-xs text-muted-foreground">
                  {feature.prompt.length} / 500 characters
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips section */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-accent" />
            Tips for Writing Effective AI Prompts
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Be specific about the tone and style you want the AI to use
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Include any restrictions or topics to avoid
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Specify the target audience (families with young children, teens, etc.)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent mt-0.5">•</span>
              Test changes with a small group before deploying to all users
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIControl;
