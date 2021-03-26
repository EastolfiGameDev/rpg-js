export class MathUtils {
    public static randRange(start: number, end: number): number {
        return Math.random() * (end - start) + start;
    }

    public static randInt(start: number, end: number): number {
        return Math.round(this.randRange(start, end));
    }

    public static clamp(num: number, min: number, max: number): number {
        return Math.min(Math.max(num, min), max);
    }

    public static sat(num: number): number {
        return MathUtils.clamp(num, 0.0, 1.0);
    }
}
