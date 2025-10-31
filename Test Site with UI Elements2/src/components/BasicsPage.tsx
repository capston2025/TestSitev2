import React from 'react';
import { EssentialFeaturesSection } from './EssentialFeaturesSection';
import { NavigationSection } from './NavigationSection';

export function BasicsPage() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
          기본 기능
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          웹 애플리케이션의 핵심이 되는 기본 기능들과 네비게이션 컴포넌트를 체험해보세요.
        </p>
      </div>

      {/* Essential Features Section */}
      <section id="essential-features" className="scroll-mt-20">
        <EssentialFeaturesSection />
      </section>

      {/* Navigation Section */}
      <section id="navigation" className="scroll-mt-20">
        <NavigationSection />
      </section>
    </div>
  );
}