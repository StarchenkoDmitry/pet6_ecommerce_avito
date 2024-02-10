export function validateEmail(email: string): boolean {
    // Regular expression for email verification
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
}
