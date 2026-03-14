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
    const layerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const isHorizontal = direction === 'left';
        const axis = isHorizontal ? 'x' : 'y';

        const travelDistance = isHorizontal ? '100%' : '-100%';
        const exitDistance = isHorizontal ? '-100%' : '100%';


        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            const targetColor = getComputedStyle(document.documentElement).getPropertyValue('--background').trim() || '#1a1b26';

            if (mode === 'entrance') {
                gsap.set(layerRef.current, {
                    [axis]: travelDistance,
                    opacity: 0,
                    backgroundColor: hostColor
                });

                tl.to(layerRef.current, {
                    [axis]: '0%',
                    opacity: 1,
                    duration: 0.5, // 0.7 -> 0.5
                    ease: 'power2.out',
                    onComplete: () => onCovered?.()
                })
                .to(layerRef.current, {
                    backgroundColor: targetColor,
                    duration: 0.35 // 0.5 -> 0.35
                })
                .add(() => onReveal?.())
                .to(layerRef.current, {
                    [axis]: exitDistance,
                    duration: 0.55, // 0.8 -> 0.55
                    ease: 'power2.inOut'
                }, '+=0.15');

            } else {
                gsap.set(layerRef.current, { [axis]: travelDistance, opacity: 0 });

                tl.to(layerRef.current, {
                    [axis]: '0%',
                    opacity: 1,
                    backgroundColor: targetColor,
                    duration: 0.45, // 0.6 -> 0.45
                    ease: 'power2.in',
                    onComplete: () => onCovered?.()
                })
                .to(layerRef.current, {
                    backgroundColor: hostColor,
                    duration: 0.35 // 0.5 -> 0.35
                })
                .to(layerRef.current, {
                    [axis]: exitDistance,
                    duration: 0.55, // 0.8 -> 0.55
                    ease: 'power2.out'
                }, '+=0.1');
            }
        }, containerRef);

        return () => ctx.revert();
    }, [mode, direction, onComplete, onReveal, onCovered, hostColor]);

    return (
        <div className="engram-curtain-container" ref={containerRef}>
            <div ref={layerRef} className="engram-curtain-slice bottom" style={{ width: '100%', height: '100%' }} />
        </div>
    );
});

