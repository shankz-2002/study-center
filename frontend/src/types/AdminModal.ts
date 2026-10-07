export type AdminModalProps = {
  open: boolean;
  title: string;
  fields: FormField[];
  initialData?: Record<string, unknown>;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => void | Promise<void>;
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select";
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
};
