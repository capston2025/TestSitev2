import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, Layout, FormInput, MousePointer, BarChart3 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const pages = [
    {
      id: 'basics',
      title: '기본 기능',
      description: '핵심 기능과 네비게이션 컴포넌트',
      icon: Layout,
      color: 'bg-blue-500',
      features: ['검색', '로그인/회원가입', '장바구니', '페이지네이션', '탭 메뉴', '아코디언', '사이드바']
    },
    {
      id: 'forms',
      title: '폼과 피드백',
      description: '폼 요소들과 사용자 피드백 컴포넌트',
      icon: FormInput,
      color: 'bg-green-500',
      features: ['라디오 버튼', '토글 스위치', '드롭다운', '날짜 피커', '파일 업로드', '토스트', '프로그레스 바']
    },
    {
      id: 'interactions',
      title: '인터랙션과 데이터',
      description: '인터랙티브 요소들과 데이터 표시 컴포넌트',
      icon: MousePointer,
      color: 'bg-purple-500',
      features: ['드래그 앤 드롭', '컨텍스트 메뉴', '키보드 단축키', '테이블', '차트', '갤러리', '동영상 재생']
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium">
            UI 컴포넌트 테스트 사이트
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mt-6 leading-relaxed">
            포괄적인 UI 컴포넌트와 인터랙션을 테스트할 수 있는 데모 사이트입니다.
            각 카테고리별로 정리된 기능들을 체험해보세요.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground"
        >
          <span className="bg-muted/50 px-4 py-2 rounded-full">⌘+/ : 사이드바 토글</span>
          <span className="bg-muted/50 px-4 py-2 rounded-full">ESC : 사이드바 닫기</span>
          <span className="bg-muted/50 px-4 py-2 rounded-full hidden sm:inline-block">우클릭 : 컨텍스트 메뉴</span>
        </motion.div>
      </div>

      {/* Page Cards */}
      <div className="grid gap-8 lg:grid-cols-3">
        {pages.map((page, index) => {
          const Icon = page.icon;
          return (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${page.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{page.title}</CardTitle>
                  <CardDescription className="text-base">{page.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">포함된 기능:</h4>
                    <div className="flex flex-wrap gap-1">
                      {page.features.slice(0, 4).map((feature) => (
                        <span key={feature} className="bg-muted px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {page.features.length > 4 && (
                        <span className="bg-muted px-2 py-1 rounded text-xs">
                          +{page.features.length - 4}개 더
                        </span>
                      )}
                    </div>
                  </div>
                  <Button 
                    onClick={() => onNavigate(page.id)} 
                    className="w-full"
                  >
                    둘러보기
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-muted/30 rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-medium mb-6">구현된 컴포넌트 현황</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">UI 컴포넌트</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">인터랙션</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">8+</div>
            <div className="text-muted-foreground">폼 요소</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">5+</div>
            <div className="text-muted-foreground">데이터 표시</div>
          </div>
        </div>
      </motion.div>

      {/* Getting Started */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-2xl font-medium">시작하기</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          위의 카테고리 중 하나를 선택해서 다양한 UI 컴포넌트들을 체험해보세요. 
          각 페이지에서는 실제로 작동하는 컴포넌트들과 상호작용할 수 있습니다.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {pages.map((page) => (
            <Button
              key={page.id}
              variant="outline"
              onClick={() => onNavigate(page.id)}
              className="min-w-32"
            >
              {page.title}
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}