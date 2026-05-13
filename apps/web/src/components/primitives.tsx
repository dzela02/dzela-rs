import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

import { Icon, type IconName } from './icon';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', className, children, ...rest },
  ref,
) {
  const cls = ['btn', `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(' ');
  return (
    <button ref={ref} className={cls} {...rest}>
      {children}
    </button>
  );
});

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const cls = ['btn', `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(' ');
  return (
    <a className={cls} {...rest}>
      {children}
    </a>
  );
}

type BadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive';
export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}
export function Badge({ variant = 'secondary', children }: BadgeProps) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export interface IconBtnProps {
  icon: IconName;
  label: string;
  active?: boolean;
  onClick?: () => void;
}
export function IconBtn({ icon, label, onClick, active }: IconBtnProps) {
  return (
    <button
      type="button"
      className={`icon-btn ${active ? 'icon-btn-active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon name={icon} size={14} />
    </button>
  );
}
