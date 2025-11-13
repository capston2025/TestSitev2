import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, Menu, X, Share2, Home, ArrowLeft } from 'lucide-react';
import { Button } from './components/ui/button';
import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger, SidebarProvider } from './components/ui/sidebar';
import { HomePage } from './components/HomePage';
import { BasicsPage } from './components/BasicsPage';
import { FormsPage } from './components/FormsPage';
import { InteractionsPage } from './components/InteractionsPage';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { toast } from 'sonner@2.0.3';

type Page = 'home' | 'basics' | 'forms' | 'interactions';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation handler - defined before useEffects that use it
  const handleNavigate = useCallback((page: string) => {
    // Update URL hash
    window.location.hash = page === 'home' ? '' : page;
    setCurrentPage(page as Page);
    setMobileMenuOpen(false);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shareContent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'UI Components Test Site',
          text: 'Check out this comprehensive UI components test site!',
          url: window.location.href,
        });
        // 버그 유도 : 공유 후 클립보드를 빈 문자열로 덮어씀
        await navigator.clipboard.writeText('');
        toast.success('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(''); // 실패
        toast.success('링크가 클립보드에 복사되었습니다!');
      } catch (err) {
        toast.error('링크 복사에 실패했습니다.');
      }
    }
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== 'home') {
        return; // 버그: 홈이 아니면 스크롤 진행 상태를 업데이트하지 않음
      }
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setShowScrollToTop(scrollTop > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Reset scroll position when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // URL hash navigation - handle hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove '#'
      if (hash === 'basics' || hash === 'forms' || hash === 'interactions') {
        setCurrentPage(hash as Page);
      } else {
        setCurrentPage('home');
      }
    };

    // Listen for hash changes (back/forward button)
    window.addEventListener('hashchange', handleHashChange);
    
    // Handle initial load
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'k':
            e.preventDefault();
            // Focus search (if implemented)
            break;
          case '/':
            e.preventDefault();
            // Toggle sidebar on mobile
            setMobileMenuOpen(!mobileMenuOpen);
            break;
          case 'h':
            e.preventDefault();
            handleNavigate('home');
            break;
        }
      }
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, handleNavigate]);

  const pageInfo = {
    home: { title: 'UI 컴포넌트 테스트 사이트', showBackButton: false },
    basics: { title: '기본 기능', showBackButton: true },
    forms: { title: '폼과 피드백', showBackButton: true },
    interactions: { title: '인터랙션과 데이터', showBackButton: true },
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'basics':
        return <BasicsPage />;
      case 'forms':
        return <FormsPage />;
      case 'interactions':
        return <InteractionsPage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <TooltipProvider>
      <SidebarProvider defaultOpen={currentPage !== 'home'}>
        <div className="min-h-screen bg-background flex w-full">
          {/* Scroll Progress Bar */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
            <motion.div
              className="h-full bg-primary"
              style={{ width: `${scrollProgress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${scrollProgress}%` }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            />
          </div>

          {/* Desktop Sidebar - Only show on non-home pages */}
          {currentPage !== 'home' && (
            <Sidebar className="hidden lg:flex" collapsible="icon">
              <SidebarHeader className="p-4">
                <h2 className="group-data-[collapsible=icon]:hidden text-sm font-medium">네비게이션</h2>
              </SidebarHeader>
              <SidebarContent className="p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="flex items-center p-2 rounded-md hover:bg-sidebar-accent transition-colors text-sm w-full text-left"
                    title="홈"
                  >
                    <Home className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="group-data-[collapsible=icon]:hidden">홈</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('basics')}
                    className={`flex items-center p-2 rounded-md hover:bg-sidebar-accent transition-colors text-sm w-full text-left ${
                      currentPage === 'basics' ? 'bg-sidebar-accent' : ''
                    }`}
                    title="기본 기능"
                  >
                    <span className="group-data-[collapsible=icon]:hidden">기본 기능</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('forms')}
                    className={`flex items-center p-2 rounded-md hover:bg-sidebar-accent transition-colors text-sm w-full text-left ${
                      currentPage === 'forms' ? 'bg-sidebar-accent' : ''
                    }`}
                    title="폼과 피드백"
                  >
                    <span className="group-data-[collapsible=icon]:hidden">폼과 피드백</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('interactions')}
                    className={`flex items-center p-2 rounded-md hover:bg-sidebar-accent transition-colors text-sm w-full text-left ${
                      currentPage === 'interactions' ? 'bg-sidebar-accent' : ''
                    }`}
                    title="인터랙션과 데이터"
                  >
                    <span className="group-data-[collapsible=icon]:hidden">인터랙션과 데이터</span>
                  </button>
                </nav>
              </SidebarContent>
            </Sidebar>
          )}

          {/* Mobile Menu Overlay */}
          {mobileMenuOpen && currentPage !== 'home' && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="fixed inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
              <div className="fixed left-0 top-0 bottom-0 w-72 bg-sidebar border-r p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">네비게이션</h2>
                  <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <nav className="space-y-2">
                  <button
                    onClick={() => handleNavigate('home')}
                    className="flex items-center p-3 rounded-md hover:bg-sidebar-accent transition-colors w-full text-left"
                  >
                    <Home className="w-4 h-4 mr-3" />
                    홈
                  </button>
                  <button
                    onClick={() => handleNavigate('basics')}
                    className={`block p-3 rounded-md hover:bg-sidebar-accent transition-colors w-full text-left ${
                      currentPage === 'basics' ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    기본 기능
                  </button>
                  <button
                    onClick={() => handleNavigate('forms')}
                    className={`block p-3 rounded-md hover:bg-sidebar-accent transition-colors w-full text-left ${
                      currentPage === 'forms' ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    폼과 피드백
                  </button>
                  <button
                    onClick={() => handleNavigate('interactions')}
                    className={`block p-3 rounded-md hover:bg-sidebar-accent transition-colors w-full text-left ${
                      currentPage === 'interactions' ? 'bg-sidebar-accent' : ''
                    }`}
                  >
                    인터랙션과 데이터
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 flex flex-col">
            {/* Header */}
            <header className="sticky top-1 z-40 bg-background/80 backdrop-blur-sm border-b flex-shrink-0">
              <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 xl:px-12 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  {currentPage !== 'home' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="lg:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <Menu className="w-5 h-5" />
                      </Button>
                      <SidebarTrigger className="hidden lg:flex" />
                    </>
                  )}
                  
                  {pageInfo[currentPage].showBackButton && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNavigate('home')}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">홈으로</span>
                    </Button>
                  )}
                  
                  <h1 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-medium truncate">
                    {pageInfo[currentPage].title}
                  </h1>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <Button variant="outline" size="sm" onClick={shareContent} className="text-xs sm:text-sm">
                    <Share2 className="w-4 h-4 mr-0 sm:mr-2" />
                    <span className="hidden sm:inline">공유하기</span>
                  </Button>
                </div>
              </div>
            </header>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto">
              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderPage()}
                </motion.div>
              </div>
            </div>
          </main>

          {/* Scroll to Top Button */}
          {showScrollToTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <Button
                onClick={scrollToTop}
                size="lg"
                className="rounded-full shadow-lg w-12 h-12 sm:w-14 sm:h-14"
              >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
            </motion.div>
          )}

          {/* Toast Notifications */}
          <Toaster />
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}
