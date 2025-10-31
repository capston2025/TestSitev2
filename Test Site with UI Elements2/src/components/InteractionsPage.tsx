import React from 'react';
import { InteractionSection } from './InteractionSection';
import { DataDisplaySection } from './DataDisplaySection';
import { SpecialFeaturesSection } from './SpecialFeaturesSection';

export function InteractionsPage() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
          인터랙션과 데이터
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          고급 인터랙션 기능들과 데이터를 효과적으로 표시하는 컴포넌트들, 그리고 특별한 기능들을 체험해보세요.
        </p>
      </div>

      {/* Interactions Section */}
      <section id="interactions" className="scroll-mt-20">
        <InteractionSection />
      </section>

      {/* Data Display Section */}
      <section id="data-display" className="scroll-mt-20">
        <DataDisplaySection />
      </section>

      {/* Special Features Section */}
      <section id="special-features" className="scroll-mt-20">
        <SpecialFeaturesSection />
      </section>
    </div>
  );
}