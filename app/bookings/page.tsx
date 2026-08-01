"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AuthGuard } from "@/components/auth/auth-guard";
import { getBookings, updateBooking } from "@/lib/api";
import { getToken } from "@/lib/auth";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-600",
};

function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const data = await getBookings(token);
      setBookings(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      setError("Failed to load your bookings. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    const token = getToken();
    if (!token) return;
    if (!confirm("Cancel this booking?")) return;

    setCancellingId(bookingId);
    try {
      await updateBooking(token, bookingId, { status: "cancelled" });
      await fetchBookings();
    } catch (err) {
      console.error("Failed to cancel booking:", err);
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#005081]">My Bookings</h1>
          <p className="text-muted-foreground">
            Resource bookings you've requested
          </p>
        </div>

        {loading ? (
          <p className="text-muted-foreground text-center py-8">
            Loading your bookings...
          </p>
        ) : error ? (
          <p className="text-red-600 text-center py-8">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            You haven't booked any resources yet. Browse the{" "}
            <a href="/resources" className="text-[#005081] underline">
              resources page
            </a>{" "}
            to get started.
          </p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{booking.resource_name}</CardTitle>
                      <CardDescription className="pt-1">
                        {new Date(booking.start_time).toLocaleString()} –{" "}
                        {new Date(booking.end_time).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Badge className={statusColors[booking.status] || ""}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {booking.purpose || "No purpose specified"}
                  </p>
                  {booking.status !== "cancelled" && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={cancellingId === booking.id}
                      onClick={() => handleCancel(booking.id)}
                    >
                      {cancellingId === booking.id ? "Cancelling..." : "Cancel"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <AuthGuard>
      <MyBookings />
    </AuthGuard>
  );
}
