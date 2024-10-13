import * as RadixDialog from '@radix-ui/react-dialog'
import Button from '@/components/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DialogProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onClose?: () => void;
  onAction?: () => void;
  cancelText?: string;
  actionText?: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dialog = ({ 
  trigger, 
  title, 
  description, 
  children, 
  onClose, 
  onAction,
  cancelText = "Cancel",
  actionText = "Submit",
  className,
  open,
  onOpenChange,
}: DialogProps) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>
        {trigger}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        {/* <RadixDialog.Content className="fixed top-1/2 left-1/2 overflow-y-auto flex-grow max-h-[90%] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-lg border bg-card shadow-sm z-50"> */}
        <RadixDialog.Content className={cn(
          'fixed top-1/2 left-1/2 overflow-y-auto flex-grow max-h-[90%] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-lg border bg-card shadow-sm z-50',
          className
        )}>
          {title && (
            <RadixDialog.Title className="text-lg font-bold mb-2">{title}</RadixDialog.Title>
          )}
          {description && (
            <RadixDialog.Description className="text-sm text-gray-500 mb-4">
              {description}
            </RadixDialog.Description>
          )}
          {children}
          {
            (onClose || onAction) && (
              <div className="mt-6 flex justify-end space-x-3">
                {
                    onClose && (
                        <RadixDialog.Close asChild>
                            <Button onClick={onClose}>{cancelText}</Button>
                        </RadixDialog.Close>
                    )
                }
                {
                  onAction &&
                  <RadixDialog.Close asChild>
                      <Button 
                          onClick={onAction}
                      >
                          {actionText}
                      </Button>
                  </RadixDialog.Close>
                }
              </div>
            )
          }
          <RadixDialog.Close asChild>
            <button 
              className="absolute top-5 right-5 text-gray-400 hover:text-muted-foreground" 
              aria-label="Close"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

export default Dialog;