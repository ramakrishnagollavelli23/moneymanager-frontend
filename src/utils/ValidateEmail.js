export const ValidateEmail = (mail) => {
    if (mail.trim()) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(mail);
    }
    return false;
}