"use client";

import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  label: string;
}

export default function Button({
  children,
  onClick,
  disabled = false,
  label,
}: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      {children}
    </button>
  );
}
Button.displayName = "Button";

