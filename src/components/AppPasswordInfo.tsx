import React from "react";
import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AppPasswordInfo: React.FC = () => {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertDescription>
        Use an App Password instead of your regular email password. To get an
        App Password:
        <ol className="list-decimal list-inside mt-2">
          <li>Go to your Google Account</li>
          <li>Click on &quot;Security&quot;</li>
          <li>Under &quot;Signing in to Google,&quot; select &quot;App Passwords&quot;</li>
          <li>
            At the bottom, choose &quot;Select app&quot; and pick the app you&apos;re using
          </li>
          <li>Choose &quot;Select device&quot; and pick the device you&apos;re using</li>
          <li>Select &quot;Generate&quot;</li>
          <li>Copy and paste the 16-character code</li>
        </ol>
        Note: You need 2-Step Verification enabled on your Google Account to use
        App Passwords.Do the same for Outlook.
      </AlertDescription>
    </Alert>
  );
};

export default AppPasswordInfo;
