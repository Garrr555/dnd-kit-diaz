import Button from "./Button";

interface ModalConfirmProps {
  onCancel: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
  type?: "Confirm" | "Delete";
}

export default function ModalConfirm(props: ModalConfirmProps) {
  const { onCancel, onConfirm, message, title, type = "Confirm" } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg text-neutral-700 font-bold">{title}</h2>
        <div className="flex flex-col gap-4">
          <p className="text-neutral-700">{message}</p>
          <div className="flex w-full items-center justify-end gap-2">
            <Button onClick={onCancel} className="bg-neutral-500">
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className={type === "Delete" ? "bg-red-500" : ""}
            >
              {type}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
