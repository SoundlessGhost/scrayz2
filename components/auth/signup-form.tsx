"use client";

import Link from "next/link";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { toast } from "sonner";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";

export function SignupForm() {
  const [formData, setFormData] = useState<{ name: string; email: string; password: string; confirmPassword: string }>({

    email: "",
    password: "",
    lastName: "",
    firstName: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) score += 25;
    else feedback.push("At least 8 characters");

    if (/[A-Z]/.test(password)) score += 25;
    else feedback.push("One uppercase letter");

    if (/[a-z]/.test(password)) score += 25;
    else feedback.push("One lowercase letter");

    if (/[0-9]/.test(password)) score += 25;
    else feedback.push("One number");

    let color = "bg-destructive";
    if (score >= 75) color = "bg-green-500";
    else if (score >= 50) color = "bg-yellow-500";
    else if (score >= 25) color = "bg-orange-500";

    return { score, feedback, color };
  };

  const passwordStrength = calculatePasswordStrength(formData.password);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength.score < 75) {
      newErrors.password = "Please create a stronger password";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast("Account created successfully", {
        description:
          "Welcome to Scrayz! Please check your email to verify your account.",
      });

      // In a real app, redirect to verification page or dashboard
      window.location.href = "/dashboard";
    }, 2000);
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Create your account
        </CardTitle>
        <CardDescription className="text-center">
          Get started with your free Scrayz account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className={
                  errors.password ? "border-destructive pr-10" : "pr-10"
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3
             text-muted-foreground hover:text-muted-foreground cursor-pointer
             hover:bg-transparent focus-visible:ring-0 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {formData.password && (
              <div className="space-y-2">
                {/* <div className="flex items-center space-x-2">
                  <Progress
                    value={passwordStrength.score}
                    className="flex-1 h-2"
                  />
                  <span className="text-xs text-muted-foreground">
                    {passwordStrength.score < 25
                      ? "Weak"
                      : passwordStrength.score < 50
                      ? "Fair"
                      : passwordStrength.score < 75
                      ? "Good"
                      : "Strong"}
                  </span>
                </div> */}
                {passwordStrength.feedback.length > 0 && (
                  <div className="space-y-1">
                    {passwordStrength.feedback.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-xs"
                      >
                        <X className="h-3 w-3 text-destructive" />
                        <span className="text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  updateFormData("confirmPassword", e.target.value)
                }
                className={
                  errors.confirmPassword ? "border-destructive pr-10" : "pr-10"
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3
             text-muted-foreground hover:text-muted-foreground cursor-pointer
             hover:bg-transparent focus-visible:ring-0 focus:outline-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {formData.confirmPassword &&
              formData.password === formData.confirmPassword && (
                <div className="flex items-center space-x-2 text-xs text-green-600">
                  <Check className="h-3 w-3" />
                  <span>Passwords match</span>
                </div>
              )}
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the{" "}
                <Link href="/toc" className=" hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className=" hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.terms && (
              <p className="text-sm text-destructive">{errors.terms}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?{" "}
          </span>
          <Link href="/login" className=" hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
