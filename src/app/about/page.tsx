'use client';

import { useEffect } from 'react';
import { trace } from '@opentelemetry/api';
import Link from 'next/link';

export default function About() {
  useEffect(() => {
    const tracer = trace.getTracer('next-app-tracer');
    const span = tracer.startSpan('about-page-view');
    
    span.setAttribute('page.name', 'about');
    span.setAttribute('page.type', 'static');
    
    return () => {
      span.end();
    };
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">About Page</h1>
      <p className="mb-4">This is the about page with OpenTelemetry tracking.</p>
      <Link 
        href="/" 
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Back to Home
      </Link>
    </main>
  );
}