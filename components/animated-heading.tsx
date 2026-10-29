'use client';
import BlurText from './react-bits/BlurText';
export function AnimatedHeading(){return <h2 aria-label="Find your kind of neighborhood"><BlurText text="Find your kind of neighborhood" delay={70} animateBy="words" direction="bottom" className="neighborhood-heading"/></h2>;}
