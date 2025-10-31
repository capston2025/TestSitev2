import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner@2.0.3';
import { CheckCircle, AlertCircle, Info, X, Download, RefreshCw, HelpCircle, Settings, User } from 'lucide-react';

export function FeedbackSection() {
  const [progress, setProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  // Progress simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  const simulateDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          toast.success('다운로드가 완료되었습니다!');
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const showSkeletonLoader = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };

  const showCustomSnackbar = () => {
    setShowSnackbar(true);
    setTimeout(() => setShowSnackbar(false), 4000);
  };

  const showToasts = () => {
    toast.success('성공적으로 처리되었습니다!');
    setTimeout(() => {
      toast.error('오류가 발생했습니다. 다시 시도해주세요.');
    }, 1000);
    setTimeout(() => {
      toast.info('새로운 업데이트가 있습니다.');
    }, 2000);
    setTimeout(() => {
      toast.warning('저장하지 않은 변경사항이 있습니다.');
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>피드백 컴포넌트</h2>
        <p className="text-muted-foreground">사용자에게 상태와 정보를 전달하는 피드백 요소들</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Toast Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>토스트 알림</CardTitle>
            <CardDescription>다양한 상황에 맞는 알림 메시지</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => toast.success('성공!')} 
                variant="outline"
                className="text-green-600 hover:bg-green-50"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                성공
              </Button>
              <Button 
                onClick={() => toast.error('오류 발생!')} 
                variant="outline"
                className="text-red-600 hover:bg-red-50"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                오류
              </Button>
              <Button 
                onClick={() => toast.info('정보입니다.')} 
                variant="outline"
                className="text-blue-600 hover:bg-blue-50"
              >
                <Info className="w-4 h-4 mr-2" />
                정보
              </Button>
              <Button 
                onClick={() => toast.warning('주의하세요!')} 
                variant="outline"
                className="text-yellow-600 hover:bg-yellow-50"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                경고
              </Button>
            </div>
            
            <Button onClick={showToasts} className="w-full">
              모든 토스트 보기
            </Button>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                버튼을 클릭하면 화면 오른쪽 하단에 토스트 알림이 나타납니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Custom Snackbar */}
        <Card>
          <CardHeader>
            <CardTitle>스낵바</CardTitle>
            <CardDescription>커스텀 스낵바 알림</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={showCustomSnackbar} className="w-full">
              스낵바 표시
            </Button>

            {showSnackbar && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 left-4 right-4 mx-auto max-w-md z-50 bg-foreground text-background p-4 rounded-lg shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>작업이 성공적으로 완료되었습니다!</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSnackbar(false)}
                  className="text-background hover:bg-background/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Progress Bars */}
        <Card>
          <CardHeader>
            <CardTitle>프로그레스 바</CardTitle>
            <CardDescription>작업 진행률을 표시하는 프로그레스 바</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>자동 진행</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>다운로드 진행률</span>
                <span>{downloadProgress}%</span>
              </div>
              <Progress value={downloadProgress} className="w-full" />
              <Button onClick={simulateDownload} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                다운로드 시뮬레이션
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>업로드 진행률</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="w-full" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>설치 진행률</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="w-full" />
            </div>
          </CardContent>
        </Card>

        {/* Skeleton Loader */}
        <Card>
          <CardHeader>
            <CardTitle>스켈레톤 로더</CardTitle>
            <CardDescription>콘텐츠가 로딩 중일 때 표시되는 스켈레톤</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={showSkeletonLoader} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  로딩 중...
                </>
              ) : (
                '로딩 시뮬레이션'
              )}
            </Button>

            <div className="space-y-4">
              {isLoading ? (
                <>
                  {/* Profile Skeleton */}
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[150px]" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                  </div>

                  {/* Article Skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>

                  {/* Card Skeleton */}
                  <div className="space-y-2">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </>
              ) : (
                <>
                  {/* Actual Content */}
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4>홍길동</h4>
                      <p className="text-sm text-muted-foreground">UI/UX 디자이너</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p>스켈레톤 로더는 사용자에게 콘텐츠가 로딩 중임을 알려주는 시각적 피드백입니다.</p>
                    <p>실제 콘텐츠의 모양과 유사한 형태로 표시되어 더 나은 사용자 경험을 제공합니다.</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4>로딩 완료!</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      실제 콘텐츠가 표시되었습니다.
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tooltips */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>툴팁</CardTitle>
            <CardDescription>요소에 마우스를 올렸을 때 나타나는 도움말 정보</CardDescription>
          </CardHeader>
          <CardContent>
            <TooltipProvider>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <HelpCircle className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>도움말을 확인하려면 클릭하세요</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-sm mt-2">도움말</p>
                </div>

                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>설정 페이지로 이동합니다</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-sm mt-2">설정</p>
                </div>

                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>파일을 다운로드합니다<br />지원 형식: PDF, PNG, JPG</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-sm mt-2">다운로드</p>
                </div>

                <div className="text-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline">
                        <User className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>프로필을 관리하고<br />계정 설정을 변경할 수 있습니다</p>
                    </TooltipContent>
                  </Tooltip>
                  <p className="text-sm mt-2">프로필</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted rounded-lg">
                <h4 className="mb-2">툴팁 사용법</h4>
                <p className="text-sm text-muted-foreground">
                  위의 버튼들에 마우스를 올리면 툴팁이 나타납니다. 
                  툴팁은 사용자에게 해당 요소의 기능이나 추가 정보를 제공하는데 유용합니다.
                </p>
              </div>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}