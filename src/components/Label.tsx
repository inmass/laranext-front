import { ReactNode, LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  children: ReactNode;
}

const Label = ({ className, children, ...props }: LabelProps) => (
  <label
    className={`${className} block font-medium text-sm text-muted-foreground`}
    {...props}
  >
    {children}
  </label>
);

export default Label;
