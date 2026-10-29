'use client';
import {Heart} from 'lucide-react';import {useSaved} from './providers';
export function FavoriteButton({id,full=false}:{id:string;full?:boolean}){const {ids,busy,toggle,ready}=useSaved();const saved=ids.includes(id);return <button className={full?'button outline favorite-full':`favorite ${saved?'is-saved':''}`} disabled={Boolean(busy)||!ready} aria-label={saved?'Remove from saved homes':'Save home'} aria-pressed={saved} onClick={()=>void toggle(id)}><Heart size={19} fill={saved?'currentColor':'none'}/>{full&&(saved?'Saved home':'Save home')}</button>;}
