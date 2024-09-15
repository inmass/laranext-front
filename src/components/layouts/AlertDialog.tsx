import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import Button from '@/components/Button';
import { useState } from 'react';

interface AlertDialogProps {
    trigger: React.ReactNode;
    title: string;
    description: string;
    cancelText: string;
    actionText: string;
    onAction: () => void;
}

const AlertDialog = ({ trigger, title, description, cancelText, actionText, onAction }: AlertDialogProps) => {

    const [open, setOpen] = useState(false);

    return (
        <RadixAlertDialog.Root open={open} onOpenChange={setOpen}>
            <RadixAlertDialog.Trigger asChild>
                {trigger}
            </RadixAlertDialog.Trigger>
            <RadixAlertDialog.Portal>
                <RadixAlertDialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setOpen(false)} />
                <RadixAlertDialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] rounded-lg border bg-card text-card-foreground shadow-sm z-50">
                    <RadixAlertDialog.Title className="text-lg font-medium">{title}</RadixAlertDialog.Title>
                    <RadixAlertDialog.Description className="mt-2 mb-5 text-sm text-gray-500">
                        {description}
                    </RadixAlertDialog.Description>
                    <div className="flex justify-end gap-[25px]">
                        <RadixAlertDialog.Cancel asChild>
                            <Button>
                                {cancelText}
                            </Button>
                        </RadixAlertDialog.Cancel>
                        <RadixAlertDialog.Action asChild>
                            <Button onClick={onAction} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300">
                                {actionText}
                            </Button>
                        </RadixAlertDialog.Action>
                    </div>
                </RadixAlertDialog.Content>
            </RadixAlertDialog.Portal>
        </RadixAlertDialog.Root>
    );
}

export default AlertDialog;