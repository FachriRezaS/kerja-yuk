 "use client"
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Notifications() {
  const router = useRouter();

  const notifications = [
    {
      type: "Reimbursement",
      message: "Your submission \"Lorem ipsum dolor sit amet...\" with a total cost of 50,000 has been paid, please check your BRIMO application, Thank you",
      status: "paid",
      date: "Today",
    },
    {
      type: "Reimbursement",
      message: "Your submission \"description\" has been rejected, please click for details.",
      status: "rejected",
      date: "Yesterday",
    },
    {
      type: "Sickness",
      message: "Your submission has been approved by the Superior.",
      status: "approved",
      date: "2022-10-05",
    },
    {
      type: "Overtime",
      message: "Your submission has been reviewed to the Superior for the approval process, please wait.",
      status: "reviewed",
      date: "2022-10-05",
    },
    {
      type: "Reimbursement",
      message: "Your submission \"description\" has been rejected, please click for details.",
      status: "rejected",
      date: "Yesterday",
    },
    {
      type: "Reimbursement",
      message: "Your submission \"Lorem ipsum dolor sit amet...\" with a total cost of 50,000 has been paid, please check your BRIMO application, Thank you",
      status: "paid",
      date: "Today",
    },
    {
      type: "Reimbursement",
      message: "Your submission \"description\" has been rejected, please click for details.",
      status: "rejected",
      date: "Yesterday",
    },
    {
      type: "Sickness",
      message: "Your submission has been approved by the Superior.",
      status: "approved",
      date: "2022-10-05",
    },
    {
      type: "Overtime",
      message: "Your submission has been reviewed to the Superior for the approval process, please wait.",
      status: "reviewed",
      date: "2022-10-05",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="p-4 bg-white shadow flex items-center">
        <button className="text-gray-600" onClick={() => router.push("/") }>
          <ArrowLeft size={20} />
        </button>
        <h1 className="ml-4 text-red-600 font-bold text-xl">Notification</h1>
      </header>

      {/* Notifications List */}
      <div className="p-4 space-y-4">
        {notifications.map((notif, index) => (
          <Card key={index} className="p-4 bg-white rounded-lg shadow">
            <CardContent>
              <h3 className="font-semibold text-red-500">{notif.type}</h3>
              <p className="text-sm text-gray-600">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-2 text-right">{notif.date}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}