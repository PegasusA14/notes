import { Button } from './Button';
import { Modal } from './Modal';

interface ConfirmDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description: string;
    onConfirm: () => void;
    isLoading?: boolean;
}

export const ConfirmDialog = ({
    isOpen,
    onOpenChange,
    title,
    description,
    onConfirm,
    isLoading,
}: ConfirmDialogProps) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} title={title} description={description}>
            <div className="flex justify-end space-x-2 pt-4">
                <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isLoading}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm} isLoading={isLoading}>
                    Confirm
                </Button>
            </div>
        </Modal>
    );
};
