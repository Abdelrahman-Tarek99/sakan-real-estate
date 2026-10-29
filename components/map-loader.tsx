'use client';
import dynamic from 'next/dynamic';import type {Property} from '@/lib/types';
const PropertyMap=dynamic(()=>import('./property-map'),{ssr:false,loading:()=> <div className="map-loading">Loading the neighborhood map…</div>});
export function MapLoader({properties}:{properties:Property[]}){return <div className="map-wrapper" data-lenis-prevent><PropertyMap properties={properties}/></div>;}
