import React, { useState } from "react";
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/common";
import { Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { registerAdmin } from "@/services/authService";

const CreateAdmin = () => {
  const { getToken } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await registerAdmin(fullName, email, password, getToken()!);
      setSuccess("Admin account created successfully");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-xl">Create Admin Account</CardTitle>
          <CardDescription>Register a new admin user</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                <CheckCircle className="h-4 w-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <Input
              label="Full Name"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              leftIcon={<User className="h-4 w-4" />}
            />
            <Input
              type="email"
              label="Email Address"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
            />

            <Button type="submit" className="w-full" loading={loading}>
              Create Admin
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAdmin;
