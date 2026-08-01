"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  Clock,
  Plus,
  ArrowLeft,
  Target,
  Calendar,
} from "lucide-react";
import {
  getPhases,
  getMilestones,
  createMilestone,
  updateMilestone,
} from "@/lib/api";
import { getToken } from "@/lib/auth";

interface StartupProgressTabProps {
  startup: any;
  onBack: () => void;
  userRole: string;
}

export function StartupProgressTab({
  startup,
  onBack,
  userRole,
}: StartupProgressTabProps) {
  const [phases, setPhases] = useState<any[]>([]);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [milestonesLoading, setMilestonesLoading] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newMilestone, setNewMilestone] = useState({
    title: "",
    description: "",
    phase: "",
    due_date: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        if (token) {
          // Fetch phases
          console.log("Fetching phases...");
          const phasesData = await getPhases(token);
          console.log("Phases data:", phasesData);
          setPhases(phasesData);

          // Fetch milestones for this startup
          console.log("Fetching milestones for startup:", startup.id);
          const milestonesData = await getMilestones(token, startup.id);
          console.log("Milestones data:", milestonesData);
          setMilestones(milestonesData);
          setError(null);
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setPhases([]);
        setMilestones([]);
        setError("Failed to load startup progress. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startup.id]);

  const handleCreateMilestone = async () => {
    try {
      const token = getToken();
      if (token) {
        const milestoneData = {
          title: newMilestone.title,
          description: newMilestone.description,
          startup: startup.id,
          phase: parseInt(newMilestone.phase),
          due_date: newMilestone.due_date,
        };

        console.log("Creating milestone:", milestoneData);
        const createdMilestone = await createMilestone(token, milestoneData);
        console.log("Milestone created:", createdMilestone);

        // Add to local state
        setMilestones([...milestones, createdMilestone]);

        // Reset form
        setNewMilestone({
          title: "",
          description: "",
          phase: "",
          due_date: "",
        });
        setCreateDialogOpen(false);
      }
    } catch (error) {
      console.error("Failed to create milestone:", error);
      alert("Failed to create milestone. Please try again.");
    }
  };

  const handleToggleMilestone = async (milestone: any) => {
    // Only founders can complete milestones
    if (userRole !== "founder") {
      alert("Only founders can complete milestones.");
      return;
    }

    try {
      const token = getToken();
      if (token) {
        try {
          await updateMilestone(token, milestone.id, {
            completed: !milestone.completed,
          });
          console.log("Milestone updated successfully");
        } catch (updateError) {
          console.error("Failed to update milestone on server:", updateError);
          // Still update local state for UI feedback
        }
      }
      // Update local state
      setMilestones(
        milestones.map((m) =>
          m.id === milestone.id ? { ...m, completed: !m.completed } : m
        )
      );
    } catch (error) {
      console.error("Failed to update milestone:", error);
      alert("Failed to update milestone. Please try again.");
    }
  };

  const calculateProgress = () => {
    if (milestones.length === 0) return 0;
    const completedCount = milestones.filter((m) => m.completed).length;
    return Math.round((completedCount / milestones.length) * 100);
  };

  const getPhaseName = (phaseId: number) => {
    const phase = phases.find((p) => p.id === phaseId);
    return phase ? phase.name : "Unknown Phase";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-muted-foreground">Loading startup progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Startups
        </Button>
        <div className="flex items-center justify-center py-8">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Startups
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{startup.name}</h1>
            <p className="text-muted-foreground">
              Progress Overview • {calculateProgress()}% Complete
            </p>
          </div>
        </div>
        {userRole === "mentor" && (
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Milestone
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Milestone</DialogTitle>
                <DialogDescription>
                  Add a new milestone for {startup.name}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newMilestone.title}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        title: e.target.value,
                      })
                    }
                    placeholder="Enter milestone title"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        description: e.target.value,
                      })
                    }
                    placeholder="Enter milestone description"
                  />
                </div>
                <div>
                  <Label htmlFor="phase">Phase</Label>
                  <Select
                    value={newMilestone.phase}
                    onValueChange={(value) =>
                      setNewMilestone({ ...newMilestone, phase: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select phase" />
                    </SelectTrigger>
                    <SelectContent>
                      {phases.map((phase) => (
                        <SelectItem key={phase.id} value={phase.id.toString()}>
                          {phase.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="due_date">Due Date</Label>
                  <Input
                    id="due_date"
                    type="date"
                    value={newMilestone.due_date}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        due_date: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setCreateDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateMilestone}>
                  Create Milestone
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completion Rate</span>
              <span className="text-sm text-muted-foreground">
                {milestones.filter((m) => m.completed).length} of{" "}
                {milestones.length} milestones
              </span>
            </div>
            <Progress value={calculateProgress()} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {calculateProgress()}% of milestones completed
            </p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="phases" className="space-y-6">
        <TabsList>
          <TabsTrigger value="phases">Phases</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
        </TabsList>

        {/* Phases Tab */}
        <TabsContent value="phases" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {phases
              .sort((a, b) => a.order - b.order)
              .map((phase) => {
                const phaseMilestones = milestones.filter(
                  (m) => m.phase === phase.id
                );
                const completedMilestones = phaseMilestones.filter(
                  (m) => m.completed
                ).length;
                const phaseProgress =
                  phaseMilestones.length > 0
                    ? Math.round(
                        (completedMilestones / phaseMilestones.length) * 100
                      )
                    : 0;

                return (
                  <Card key={phase.id}>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{phase.name}</CardTitle>
                      <CardDescription>Phase {phase.order}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span>{phaseProgress}%</span>
                        </div>
                        <Progress value={phaseProgress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          {completedMilestones} of {phaseMilestones.length}{" "}
                          milestones
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </TabsContent>

        {/* Milestones Tab */}
        <TabsContent value="milestones" className="space-y-4">
          {milestones.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <div className="text-center">
                  <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    No Milestones Yet
                  </h3>
                  <p className="text-muted-foreground">
                    {userRole === "mentor"
                      ? "Create the first milestone to help track progress."
                      : "No milestones have been created yet."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {phases
                .sort((a, b) => a.order - b.order)
                .map((phase) => {
                  const phaseMilestones = milestones.filter(
                    (m) => m.phase === phase.id
                  );
                  if (phaseMilestones.length === 0) return null;

                  return (
                    <Card key={phase.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Badge variant="outline" className="mr-2">
                            Phase {phase.order}
                          </Badge>
                          {phase.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {phaseMilestones.map((milestone) => (
                            <div
                              key={milestone.id}
                              className="flex items-start space-x-3 p-3 border rounded-lg"
                            >
                              <Checkbox
                                checked={milestone.completed}
                                onCheckedChange={() =>
                                  handleToggleMilestone(milestone)
                                }
                                disabled={userRole !== "founder"}
                                className="mt-1"
                              />
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center space-x-2">
                                  <h4
                                    className={`font-medium ${
                                      milestone.completed
                                        ? "line-through text-muted-foreground"
                                        : ""
                                    }`}
                                  >
                                    {milestone.title}
                                  </h4>
                                  {milestone.completed && (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {milestone.description}
                                </p>
                                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                                  <div className="flex items-center">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    Due:{" "}
                                    {new Date(
                                      milestone.due_date
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
