import { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export function TermsCheckbox({ checked, onCheckedChange }) {
  const dialogCloseRef = useRef(null);

  const handleAccept = () => {
    onCheckedChange(true);
    dialogCloseRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-start gap-2 mt-4 cursor-pointer hover:opacity-80">
          <div 
            className={`w-4 h-4 border rounded flex items-center justify-center ${
              checked ? "bg-teal-600 border-teal-600" : "bg-white border-gray-300"
            }`}
          >
            {checked && (
              <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>

          <Label className="text-sm text-white leading-tight hover:text-teal-400 transition-colors">
            I agree to the Terms and Conditions
          </Label>
        </div>
      </DialogTrigger>

      {/* Hidden trigger to close the dialog */}
      <DialogTrigger ref={dialogCloseRef} className="hidden" />

      <DialogContent className="w-[90vw] max-w-sm sm:max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Terms & Community Guidelines</DialogTitle>
        </DialogHeader>
        <div className="text-sm space-y-3 max-h-[60vh] overflow-y-auto">
          <p className="font-bold text-base italic text-green-500">I confirm that I have been at the very least 12 years and/or use the page with parental consent.</p>
          <p>✓ By using this platform, I agree to treat others with respect, empathy, and understanding.</p>
          <p>✓ I will not share or encourage content that promotes self-harm, suicide, violence, harassment, hate speech, or any illegal activity.</p>
          <p>✓ I understand that if I threaten others, incite harm, or share harmful messages, this behavior may be reported to law enforcement.</p>
          <p>✓ I understand that this platform does not provide professional psychological, medical, or legal advice.</p>
          <p>✓ I agree to use this platform responsibly, contributing positively to the community.</p>
          <p className="text-muted-foreground pt-2 text-xs text-red-500 font-semibold">
            Any attempt to misuse the platform, any violations action may result in account suspension or legal action.
          </p>
          <div className="pt-4 text-center">
            <button
              type="button"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm"
              onClick={handleAccept}
            >
              I Understand and Accept
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}