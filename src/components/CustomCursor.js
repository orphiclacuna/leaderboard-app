import React, { useState, useEffect, useRef } from 'react';
import '../cursor.css';
const isLightColor = (color) => {
  const rgb = color.match(/\d+/g);
  if (!rgb || rgb.length < 3) return false;
  const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
  return brightness > 140;
};
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOverWhiteBg, setIsOverWhiteBg] = useState(false);
  const dotRef = useRef(null);
  const outlineRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        const bgColor = window.getComputedStyle(element).backgroundColor;
        const bgColorLower = bgColor.toLowerCase();
        let isLight = false;
        if (bgColorLower === 'transparent' || bgColorLower === 'rgba(0, 0, 0, 0)') {
          let parent = element.parentElement;
          while (parent && (!bgColor || bgColor === 'transparent' || bgColor === 'rgba(0, 0, 0, 0)')) {
            const parentBgColor = window.getComputedStyle(parent).backgroundColor;
            if (parentBgColor && parentBgColor !== 'transparent' && parentBgColor !== 'rgba(0, 0, 0, 0)') {
              isLight = isLightColor(parentBgColor);
              break;
            }
            parent = parent.parentElement;
          }
        } else {
          isLight = isLightColor(bgColor);
        }
        setIsOverWhiteBg(isLight);
      }
    };
    const handleMouseDown = () => {
      setIsClicking(true);
    };
    const handleMouseUp = () => {
      setIsClicking(false);
    };
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    const handleHoverStart = () => {
      setIsHovering(true);
    };
    const handleHoverEnd = () => {
      setIsHovering(false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    const interactiveElements = document.querySelectorAll('button, a, select, input, .interactive-element');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
      el.classList.add('hover-effect');
      el.classList.add('clickable');
    });
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isVisible]);
  const dotStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: isVisible ? 1 : 0,
    width: isClicking ? '12px' : isHovering ? '0px' : '8px',
    height: isClicking ? '12px' : isHovering ? '0px' : '8px',
  };
  const outlineStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: isVisible ? 1 : 0,
    width: isHovering ? '60px' : isClicking ? '36px' : '40px',
    height: isHovering ? '60px' : isClicking ? '36px' : '40px',
    transform: `translate(-50%, -50%) scale(${isClicking ? 0.9 : isHovering ? 1.2 : 1})`
  };
  return (
    <>
      <div 
        ref={dotRef}
        className={`cursor-dot ${isVisible ? 'cursor-active' : ''} ${isOverWhiteBg ? 'white-bg' : ''}`} 
        style={dotStyle}
      ></div>
      <div 
        ref={outlineRef}
        className={`cursor-outline ${isVisible ? 'cursor-active' : ''} ${isOverWhiteBg ? 'white-bg' : ''}`} 
        style={outlineStyle}
      ></div>
    </>
  );
};
export default CustomCursor;
