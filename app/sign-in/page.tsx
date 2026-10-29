import {Suspense} from 'react';import Image from 'next/image';import {AuthForm} from '@/components/auth-form';
export const metadata={title:'Welcome home'};
export default function SignIn(){return <div className="shell auth-page"><div className="auth-photo"><Image src="/images/hero.webp" alt="Sunlit contemporary home" fill sizes="50vw"/><div><h2>Every new chapter<br/>starts somewhere.</h2><p>Make yourself at home.</p></div></div><Suspense fallback={<p>Loading sign in…</p>}><AuthForm/></Suspense></div>;}
