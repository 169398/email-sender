"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface Recipient {
  name: string;
  email: string;
}

export default function Component() {
  const [recipients, setRecipients] = useState<Recipient[]>([
    { name: "", email: "" },
  ]);
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false); // Add loading state
  const { toast } = useToast();

  const handleRecipientChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRecipients = [...recipients];
    newRecipients[index][e.target.name as keyof Recipient] = e.target.value;
    setRecipients(newRecipients);
  };

  const addRecipient = () => {
    setRecipients([...recipients, { name: "", email: "" }]);
  };

  const removeRecipient = (index: number) => {
    const newRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(newRecipients);
  };

  const sendEmails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true); // Start loading animation

    try {
      const response = await fetch("/api/sendEmails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipients, subject, text }),
      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        toast({
          title: "Success",
          description: "Your personalized emails have been sent successfully.",
        });
      } else {
        throw new Error(data.message || "Failed to send emails");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setIsSending(false); // End loading animation
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Personalized Email Campaign
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={sendEmails} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="text">Email Content</Label>
            <Textarea
              id="text"
              placeholder="Compose your email message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-4">
            <Label>Recipients</Label>
            {recipients.map((recipient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex space-x-2"
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Recipient Name"
                  value={recipient.name}
                  onChange={(e) => handleRecipientChange(index, e)}
                  required
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Recipient Email"
                  value={recipient.email}
                  onChange={(e) => handleRecipientChange(index, e)}
                  required
                />
                {recipients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeRecipient(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
          <Button type="button" variant="outline" onClick={addRecipient}>
            Add Recipient
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          className="w-full flex items-center justify-center"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={(e) => sendEmails(e as any)}
          disabled={isSending}
        >
          {isSending ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
            />
          ) : null}
          {isSending ? "Sending..." : "Send Personalized Emails"}
        </Button>
      </CardFooter>
    </Card>
  );
}
