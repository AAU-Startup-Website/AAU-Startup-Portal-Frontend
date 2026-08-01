"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getResourceById, createBooking } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function BookResourcePage() {
  const params = useParams<{ id: string }>();
  const resourceId = params.id;

  const [resource, setResource] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  useEffect(() => {
    const fetchResource = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getResourceById(token, resourceId);
        setResource(data);
      } catch (err) {
        console.error("Failed to fetch resource:", err);
        setLoadError("Failed to load this resource. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [resourceId]);

  const handleSubmitBooking = async () => {
    const token = getToken();
    if (!token || !startTime || !endTime) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const booking = await createBooking(token, {
        resource: resourceId,
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
        purpose,
      });
      setConfirmedBooking(booking);
    } catch (err: any) {
      console.error("Failed to create booking:", err);
      setSubmitError(
        err.message || "Failed to create the booking. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading resource...</p>
      </div>
    );
  }

  if (loadError || !resource) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="text-center py-8 space-y-4">
            <AlertCircle className="h-8 w-8 text-red-600 mx-auto" />
            <p className="text-red-600">{loadError || "Resource not found."}</p>
            <Button variant="outline" asChild>
              <Link href="/resources">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Resources
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (confirmedBooking) {
    return (
      <div className="min-h-screen bg-background">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <Card>
              <CardContent className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-4">Booking Requested!</h1>
                <p className="text-muted-foreground mb-6">
                  Your booking for {resource.name} has been submitted with
                  status "{confirmedBooking.status}". You'll be notified once
                  incubator staff confirm it.
                </p>

                <div className="bg-muted/50 rounded-lg p-6 mb-6 text-left text-sm space-y-2">
                  <div>
                    <span className="text-muted-foreground">Resource: </span>
                    <span className="font-medium">{resource.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">From: </span>
                    <span className="font-medium">
                      {new Date(confirmedBooking.start_time).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">To: </span>
                    <span className="font-medium">
                      {new Date(confirmedBooking.end_time).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-4 justify-center">
                  <Button variant="outline" asChild>
                    <Link href="/bookings">View My Bookings</Link>
                  </Button>
                  <Button className="bg-aau-blue hover:bg-aau-blue/90" asChild>
                    <Link href="/resources">Book Another Resource</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-muted/30 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Button variant="outline" asChild className="mb-6">
            <Link href="/resources">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Resources
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-2">Book {resource.name}</h1>
          {resource.description && (
            <p className="text-muted-foreground mb-4">{resource.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm">
            {resource.capacity && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-aau-blue" />
                <span>{resource.capacity} people</span>
              </div>
            )}
            <Badge variant="outline" className="capitalize">
              {resource.type?.replace("_", " ")}
            </Badge>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
              <CardDescription>
                Choose a time and describe what you'll use it for. Staff will
                confirm your booking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {submitError && (
                <p className="text-sm text-red-600">{submitError}</p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="datetime-local"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="purpose">Purpose of Booking</Label>
                <Textarea
                  id="purpose"
                  placeholder="Describe what you'll be using this resource for..."
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="mt-1"
                />
              </div>

              <Button
                className="w-full bg-aau-blue hover:bg-aau-blue/90"
                size="lg"
                disabled={!startTime || !endTime || submitting}
                onClick={handleSubmitBooking}
              >
                {submitting ? "Submitting..." : "Request Booking"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
