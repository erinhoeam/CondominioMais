export class StringUtils {
    public static isNullOrEmpty(val: string) : boolean {
        if (val === undefined || val === null || val.trim() === '') {
            return true;
        }
        return false;
    };
    public static generateRandomPassword():string{
        return Math.random().toString(36).slice(-8);
    }
}