import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并 Tailwind CSS 类名工具
 * 结合了 clsx 的条件判断能力和 tailwind-merge 的去重/优先级处理能力
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
