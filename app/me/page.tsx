"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Shield, Key, Trash2, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-context";
import { supabase } from "@/api/client";

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    yearOfStudy: "",
    bio: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    mentorMessages: true,
    eventReminders: true,
    applicationStatus: true,
    weeklyDigest: false,
  });

  // Load user profile data
  useEffect(() => {
    if (user) {
      const loadProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error loading profile:", error);
            return;
          }

          if (data) {
            setProfile({
              firstName: data.first_name || "",
              lastName: data.last_name || "",
              email: data.email || user.email || "",
              phone: data.phone || "",
              role: data.role || user.role || "",
              department: data.department || "",
              yearOfStudy: data.year_of_study || "",
              bio: data.bio || "",
              location: data.location || "",
              linkedin: data.linkedin || "",
              github: data.github || "",
              website: data.website || "",
            });
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };

      loadProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("users")
        .update({
          first_name: profile.firstName,
          last_name: profile.lastName,
          phone: profile.phone,
          department: profile.department,
          year_of_study: profile.yearOfStudy,
          bio: profile.bio,
          location: profile.location,
          linkedin: profile.linkedin,
          github: profile.github,
          website: profile.website,
        })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating profile:", error);
        return;
      }

      await refreshProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aau-deep-blue mb-2">
          Profile & Settings
        </h1>
        <p className="text-stone">
          Manage your account information and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </div>
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : isEditing ? (
                    "Save Changes"
                  ) : (
                    "Edit Profile"
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {profile.firstName?.[0] || user?.name?.[0] || "U"}
                    {profile.lastName?.[0] || ""}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">
                    {profile.firstName || user?.name || "User"}{" "}
                    {profile.lastName || ""}
                  </h3>
                  <Badge variant="secondary" className="capitalize">
                    {profile.role || user?.role || "No role"}
                  </Badge>
                  <p className="text-sm text-stone mt-1">
                    {profile.department || user?.department || "No department"}{" "}
                    • {profile.yearOfStudy || "Not specified"}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={profile.firstName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={profile.lastName}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, email: e.target.value }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={profile.department}
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, department: value }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">
                        Computer Science
                      </SelectItem>
                      <SelectItem value="Engineering">Engineering</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearOfStudy">Year of Study</Label>
                  <Select
                    value={profile.yearOfStudy}
                    onValueChange={(value) =>
                      setProfile((prev) => ({ ...prev, yearOfStudy: value }))
                    }
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="5th Year">5th Year</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  disabled={!isEditing}
                  rows={3}
                  placeholder="Tell us about yourself and your interests..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Social Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          linkedin: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={profile.github}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          github: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Personal Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about important updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries({
                emailUpdates: "Email Updates",
                mentorMessages: "Mentor Messages",
                eventReminders: "Event Reminders",
                applicationStatus: "Application Status",
                weeklyDigest: "Weekly Digest",
              }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>{label}</Label>
                    <p className="text-sm text-stone">
                      {key === "emailUpdates" &&
                        "Receive important updates via email"}
                      {key === "mentorMessages" &&
                        "Get notified when mentors send messages"}
                      {key === "eventReminders" &&
                        "Reminders for upcoming events"}
                      {key === "applicationStatus" &&
                        "Updates on your application status"}
                      {key === "weeklyDigest" &&
                        "Weekly summary of portal activity"}
                    </p>
                  </div>
                  <Switch
                    checked={notifications[key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      handleNotificationChange(key, checked)
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and privacy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Two-Factor Authentication
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Email Verification
                </Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold text-red-600">Danger Zone</h4>
                <Button variant="destructive" className="w-full justify-start">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Preferences</CardTitle>
              <CardDescription>
                Customize your portal experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="am">አማርኛ (Amharic)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <Select defaultValue="africa/addis_ababa">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa/addis_ababa">
                        Africa/Addis Ababa (EAT)
                      </SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Dashboard View</Label>
                  <Select defaultValue="cards">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cards">Card View</SelectItem>
                      <SelectItem value="list">List View</SelectItem>
                      <SelectItem value="compact">Compact View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
