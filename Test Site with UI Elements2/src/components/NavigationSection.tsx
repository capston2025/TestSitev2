import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Home, ChevronRight, Settings, User, Bell, Mail } from 'lucide-react';

export function NavigationSection() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>네비게이션 컴포넌트</h2>
        <p className="text-muted-foreground">탭 메뉴, 아코디언, 브레드크럼 등의 네비게이션 요소들</p>
      </div>

      <div className="grid gap-8">
        {/* Tabs Menu */}
        <Card>
          <CardHeader>
            <CardTitle>탭 메뉴</CardTitle>
            <CardDescription>다양한 콘텐츠 영역을 전환할 수 있는 탭 인터페이스</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">개요</TabsTrigger>
                <TabsTrigger value="analytics">분석</TabsTrigger>
                <TabsTrigger value="reports">보고서</TabsTrigger>
                <TabsTrigger value="notifications">알림</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="p-4 border rounded-lg">
                  <h3>프로젝트 개요</h3>
                  <p className="text-muted-foreground mt-2">
                    현재 진행 중인 프로젝트의 전반적인 상황과 주요 지표를 확인할 수 있습니다.
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-sm text-muted-foreground">활성 작업</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-sm text-muted-foreground">팀 멤버</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-sm text-muted-foreground">완료율</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="analytics" className="mt-4">
                <div className="p-4 border rounded-lg">
                  <h3>분석 데이터</h3>
                  <p className="text-muted-foreground mt-2">
                    프로젝트 성과와 관련된 상세한 분석 데이터를 제공합니다.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span>일일 활성 사용자</span>
                      <span className="font-medium">1,234</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>전환율</span>
                      <span className="font-medium">3.45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>평균 세션 시간</span>
                      <span className="font-medium">4분 32초</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reports" className="mt-4">
                <div className="p-4 border rounded-lg">
                  <h3>보고서</h3>
                  <p className="text-muted-foreground mt-2">
                    정기적으로 생성되는 보고서를 확인하고 다운로드할 수 있습니다.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>주간 성과 보고서</span>
                      <Button variant="outline" size="sm">다운로드</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>월간 분석 리포트</span>
                      <Button variant="outline" size="sm">다운로드</Button>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded">
                      <span>사용자 피드백 요약</span>
                      <Button variant="outline" size="sm">다운로드</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notifications" className="mt-4">
                <div className="p-4 border rounded-lg">
                  <h3>알림 설정</h3>
                  <p className="text-muted-foreground mt-2">
                    다양한 알림 설정을 관리하고 구성할 수 있습니다.
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4" />
                      <span>이메일 알림</span>
                      <Button variant="outline" size="sm" className="ml-auto">설정</Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4" />
                      <span>푸시 알림</span>
                      <Button variant="outline" size="sm" className="ml-auto">설정</Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4" />
                      <span>멘션 알림</span>
                      <Button variant="outline" size="sm" className="ml-auto">설정</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>아코디언</CardTitle>
            <CardDescription>접을 수 있는 콘텐츠 섹션으로 공간을 효율적으로 활용</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>자주 묻는 질문 1: 서비스 이용 방법</AccordionTrigger>
                <AccordionContent>
                  서비스 이용을 위해서는 먼저 회원가입을 진행하신 후, 로그인하여 다양한 기능을 사용하실 수 있습니다. 
                  첫 이용자를 위한 튜토리얼도 제공하고 있어 쉽게 시작하실 수 있습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>자주 묻는 질문 2: 요금 및 결제</AccordionTrigger>
                <AccordionContent>
                  기본 서비스는 무료로 제공되며, 프리미엄 기능 이용 시 월 단위 구독 요금이 발생합니다. 
                  결제는 신용카드, 계좌이체, 간편결제 등 다양한 방법을 지원합니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>자주 묻는 질문 3: 데이터 보안</AccordionTrigger>
                <AccordionContent>
                  사용자의 개인정보와 데이터는 최고 수준의 보안 시스템으로 보호됩니다. 
                  모든 데이터는 암호화되어 저장되며, 정기적인 보안 점검을 통해 안전성을 유지합니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>자주 묻는 질문 4: 고객 지원</AccordionTrigger>
                <AccordionContent>
                  24/7 고객 지원을 제공하며, 이메일, 채팅, 전화를 통해 언제든지 문의하실 수 있습니다. 
                  또한 상세한 도움말 문서와 커뮤니티 포럼도 운영하고 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Breadcrumb */}
        <Card>
          <CardHeader>
            <CardTitle>브레드크럼</CardTitle>
            <CardDescription>현재 페이지의 위치를 계층적으로 표시하는 네비게이션</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2">기본 브레드크럼</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">
                      <Home className="w-4 h-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products">제품</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/products/laptops">노트북</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>MacBook Pro</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>
              <h4 className="mb-2">설정 페이지 브레드크럼</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">대시보드</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/settings">설정</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/settings/account">계정</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>프로필 편집</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div>
              <h4 className="mb-2">프로젝트 구조 브레드크럼</h4>
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/workspace">워크스페이스</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/workspace/projects">프로젝트</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/workspace/projects/ui-components">UI 컴포넌트</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>테스트 사이트</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}