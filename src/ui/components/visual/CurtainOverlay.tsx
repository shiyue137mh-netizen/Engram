import React, { useLayoutEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';

interface CurtainOverlayProps {
    mode: 'entrance' | 'exit';
    onComplete?: () => void;
    onReveal?: () => void;
    onCovered?: () => void; // 当遮罩完全遮住屏幕时触发
    hostColor?: string; // 宿主环境背景色
    direction?: 'left' | 'top'; // V10: 极致精简 (左/下落)
}

/**
 * CurtainOverlay Component (V10 - Final Rhythm)
 * 极致收敛与呼吸感调优
 */
export const CurtainOverlay: React.FC<CurtainOverlayProps> = memo(({
    mode,
    onComplete,
    onReveal,
    onCovered,
    hostColor = '#000',
    direction = 'left'
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const middleRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        // --- V10: Controlled Direction (Left or Top-Down) ---
        const isHorizontal = direction === 'left';
        const axis = isHorizontal ? 'x' : 'y';
        
        // left: 200 -> 0 -> -200 (Right to Left)
        // top: -200 -> 0 -> 200 (Top to Bottom)
        const travelDistance = isHorizontal ? '200%' : '-200%';
        const exitDistance = isHorizontal ? '-200%' : '200%';

        // 动态羽化映射
        const featherConfig = {
            'left': { dir: 'left',   inset: '0 0 0 -150px', w: '150px', h: '100%' },
            'top':  { dir: 'bottom', inset: '-150px 0 0 0', w: '100%',  h: '150px' }
        };
        const f = featherConfig[direction];

        if (containerRef.current) {
            containerRef.current.style.setProperty('--feather-dir', f.dir);
            containerRef.current.style.setProperty('--feather-inset', f.inset);
            containerRef.current.style.setProperty('--feather-w', f.w);
            containerRef.current.style.setProperty('--feather-h', f.h);
        }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            const targetColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#3b82f6';

            if (mode === 'entrance') {
                gsap.set([bottomRef.current, middleRef.current], { 
                    [axis]: travelDistance, 
                    opacity: 0 
                });

                // 1. 底层色块先起步
                tl.to(bottomRef.current, {
                    [axis]: '0%',
                    opacity: 1,
                    backgroundColor: hostColor,
                    duration: 0.9,
                    ease: 'expo.out',
                    onComplete: () => onCovered?.()
                })
                // 2. 中层毛玻璃随后“追逐” (V10: 显著起步延迟，制造间隔)
                .to(middleRef.current, {
                    [axis]: '0%',
                    opacity: 0.98,
                    duration: 0.9,
                    ease: 'expo.out'
                }, 0.35) // 在底层起步 0.35s 后开始
                
                .to(bottomRef.current, {
                    backgroundColor: targetColor,
                    duration: 1.2,
                    ease: 'power2.inOut'
                }, '+=0.1')
                
                .add(() => onReveal?.(), '-=0.3')
                
                .to([bottomRef.current, middleRef.current], {
                    [axis]: exitDistance,
                    duration: 1.2,
                    stagger: 0.35, // 揭开时的色块间隔也拉大
                    ease: 'expo.inOut'
                }, '+=0.2');

            } else {
                gsap.set([bottomRef.current, middleRef.current], { [axis]: travelDistance, opacity: 0 });

                tl.to(bottomRef.current, {
                    [axis]: '0%',
                    opacity: 1,
                    backgroundColor: targetColor,
                    duration: 0.8,
                    ease: 'expo.in'
                })
                .to(middleRef.current, {
                    [axis]: '0%',
                    opacity: 0.98,
                    duration: 0.8,
                    ease: 'expo.in',
                    onComplete: () => onCovered?.()
                }, 0.3) // 闭幕时的追逐间隔
                
                .to(bottomRef.current, {
                    backgroundColor: hostColor,
                    duration: 1.0,
                    ease: 'power2.inOut'
                }, '+=0.1')
                .to([bottomRef.current, middleRef.current], {
                    [axis]: exitDistance,
                    duration: 1.2,
                    stagger: 0.3, 
                    ease: 'expo.out'
                });
            }
        }, containerRef);

        return () => ctx.revert();
    }, [mode, direction, onComplete, onReveal, onCovered, hostColor]);

    return (
        <div className="engram-curtain-container" ref={containerRef}>
            <div ref={bottomRef} className="engram-curtain-slice bottom" />
            <div ref={middleRef} className="engram-curtain-slice middle" />
        </div>
    );
});

