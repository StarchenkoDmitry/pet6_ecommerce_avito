'use client'
import clsx from "clsx";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
}

export function Button({ 
  children, 
  className, 
  disabled, 
  ...rest 
}: ButtonProps) {
    return (
        <button
            className={clsx(
                "px-4 flex h-10 items-center rounded-lg text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
                className,
                "bg-blue-500 text-white hover:bg-blue-400 focus-visible:outline-blue-500 active:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            {...rest}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
