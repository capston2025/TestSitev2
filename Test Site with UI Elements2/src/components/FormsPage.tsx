import React from 'react';
import { FormSection } from './FormSection';
import { FeedbackSection } from './FeedbackSection';

export function FormsPage() {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium">
          폼과 피드백
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          사용자 입력을 받는 다양한 폼 요소들과 상태를 전달하는 피드백 컴포넌트들을 체험해보세요.
        </p>
      </div>

      {/* Forms Section */}
      <section id="forms" className="scroll-mt-20">
        <FormSection />
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="scroll-mt-20">
        <FeedbackSection />
      </section>
    </div>
  );
}