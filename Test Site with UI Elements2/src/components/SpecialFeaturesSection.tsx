import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, ChevronLeft, ChevronRight, X, Keyboard, Delete, Space, ArrowUp } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

// Mock data for infinite scroll
const generateItems = (start: number, count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: start + i,
    title: `아이템 ${start + i}`,
    description: `이것은 ${start + i}번째 아이템의 설명입니다.`,
    image: `https://images.unsplash.com/photo-${1500000000000 + (start + i) * 1000}?w=400&h=300&fit=crop&crop=center`
  }));
};

const slideImages = [
  'https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTMwOTU1Mnww&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5Mzg5NzQzfDA&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTkzODgyMzB8MA&ixlib=rb-4.1.0&q=80&w=800',
  'https://images.unsplash.com/photo-1758923530678-77c76f0ff587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc2hvd2Nhc2UlMjBnYWxsZXJ5fGVufDF8fHx8MTc1OTM5ODUzOHww&ixlib=rb-4.1.0&q=80&w=800'
];

export function SpecialFeaturesSection() {
  // Infinite Scroll State
  const [items, setItems] = useState(() => generateItems(1, 20));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

  // Video Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Virtual Keyboard State
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Mouse Hover State
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Popup State
  const [showPopup, setShowPopup] = useState(false);

  // Infinite Scroll Logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const loadMoreItems = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = generateItems(items.length + 1, 10);
    setItems(prev => [...prev, ...newItems]);
    
    // Stop loading after 100 items for demo
    if (items.length >= 100) {
      setHasMore(false);
    }
    
    setLoading(false);
  };

  // Slideshow Logic
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slideImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay]);

  // Video Player Handlers
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Virtual Keyboard Handlers
  const handleKeyPress = (key: string) => {
    if (key === 'Backspace') {
      setInputValue(prev => prev.slice(0, -1));
    } else if (key === 'Space') {
      setInputValue(prev => prev + ' ');
    } else {
      setInputValue(prev => prev + key);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>특별 기능들</h2>
        <p className="text-muted-foreground">고급 사용자 경험을 제공하는 특별한 기능들</p>
      </div>

      <div className="grid gap-8">
        {/* Infinite Scroll */}
        <Card>
          <CardHeader>
            <CardTitle>무한 스크롤</CardTitle>
            <CardDescription>스크롤하면 자동으로 더 많은 콘텐츠가 로드됩니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 overflow-y-auto border rounded-lg p-4">
              <div className="grid gap-4">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-3 border rounded-lg"
                  >
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                      {item.id}
                    </div>
                    <div>
                      <h4>{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {loading && (
                <div className="text-center py-4">
                  <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-sm text-muted-foreground mt-2">로딩 중...</p>
                </div>
              )}
              
              {hasMore && <div ref={observerRef} className="h-4" />}
              
              {!hasMore && (
                <div className="text-center py-4 text-muted-foreground">
                  모든 아이템을 로드했습니다!
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mouse Hover Elements */}
        <Card>
          <CardHeader>
            <CardTitle>마우스 호버 기반 요소</CardTitle>
            <CardDescription>마우스를 올리면 인터랙티브한 효과가 나타납니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((card) => (
                <motion.div
                  key={card}
                  className="relative p-6 border rounded-lg cursor-pointer overflow-hidden"
                  onMouseEnter={() => setHoveredCard(card)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === card ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <h4>호버 카드 {card}</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      마우스를 올리면 배경색과 크기가 변합니다
                    </p>
                    
                    <AnimatePresence>
                      {hoveredCard === card && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="mt-4"
                        >
                          <Button size="sm">더 보기</Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Player */}
        <Card>
          <CardHeader>
            <CardTitle>동영상 재생 기능</CardTitle>
            <CardDescription>커스텀 비디오 플레이어 컨트롤</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  className="w-full h-64 object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  poster="https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTMwOTU1Mnww&ixlib=rb-4.1.0&q=80&w=800"
                >
                  {/* Using a sample video URL - in real app, you'd use actual video files */}
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  브라우저에서 비디오를 지원하지 않습니다.
                </video>
                
                {/* Custom Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="space-y-2">
                    {/* Progress Bar */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-white/30 rounded-lg appearance-none slider"
                    />
                    
                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = Math.max(0, currentTime - 10);
                            }
                          }}
                          className="text-white hover:bg-white/20"
                        >
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={togglePlay}
                          className="text-white hover:bg-white/20"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = Math.min(duration, currentTime + 10);
                            }
                          }}
                          className="text-white hover:bg-white/20"
                        >
                          <SkipForward className="w-4 h-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={toggleMute}
                          className="text-white hover:bg-white/20"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </Button>
                      </div>
                      
                      <div className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                커스텀 비디오 플레이어로 재생/일시정지, 음소거, 탐색 기능을 제공합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Slideshow */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>슬라이드 쇼</CardTitle>
                <CardDescription>자동 재생과 수동 제어가 가능한 이미지 슬라이드쇼</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoPlay(!autoPlay)}
              >
                {autoPlay ? '자동재생 끄기' : '자동재생 켜기'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <ImageWithFallback
                      src={slideImages[currentSlide]}
                      alt={`슬라이드 ${currentSlide + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slideImages.length)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slideImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            <div className="mt-4 text-center text-sm text-muted-foreground">
              슬라이드 {currentSlide + 1} / {slideImages.length}
            </div>
          </CardContent>
        </Card>

        {/* Virtual Keyboard */}
        <Card>
          <CardHeader>
            <CardTitle>화면 키보드</CardTitle>
            <CardDescription>터치 기기를 위한 가상 키보드</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="여기에 입력하거나 아래 가상 키보드를 사용하세요"
                onFocus={() => setKeyboardVisible(true)}
              />
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setKeyboardVisible(!keyboardVisible)}
                >
                  <Keyboard className="w-4 h-4 mr-2" />
                  가상 키보드 토글
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInputValue('')}
                >
                  지우기
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {keyboardVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  className="p-4 bg-muted rounded-lg"
                >
                  {/* First Row */}
                  <div className="grid grid-cols-10 gap-1 mb-2">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((key) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeyPress(key)}
                        className="aspect-square p-0"
                      >
                        {key}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Second Row */}
                  <div className="grid grid-cols-10 gap-1 mb-2">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeyPress(key.toLowerCase())}
                        className="aspect-square p-0"
                      >
                        {key}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Third Row */}
                  <div className="grid grid-cols-9 gap-1 mb-2">
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeyPress(key.toLowerCase())}
                        className="aspect-square p-0"
                      >
                        {key}
                      </Button>
                    ))}
                  </div>
                  
                  {/* Fourth Row */}
                  <div className="flex gap-1 mb-2">
                    <div className="grid grid-cols-7 gap-1 flex-1">
                      {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => (
                        <Button
                          key={key}
                          variant="outline"
                          size="sm"
                          onClick={() => handleKeyPress(key.toLowerCase())}
                          className="aspect-square p-0"
                        >
                          {key}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleKeyPress('Backspace')}
                      className="px-4"
                    >
                      <Delete className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Space Bar */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleKeyPress('Space')}
                    className="w-full"
                  >
                    <Space className="w-4 h-4 mr-2" />
                    스페이스
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Popup Window */}
        <Card>
          <CardHeader>
            <CardTitle>팝업 창</CardTitle>
            <CardDescription>모달 및 팝업 창 예제</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Modal Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">모달 다이얼로그 열기</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>모달 다이얼로그</DialogTitle>
                    <DialogDescription>
                      이것은 모달 다이얼로그의 예제입니다. 배경을 클릭하거나 ESC 키를 눌러 닫을 수 있습니다.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>모달 다이얼로그는 사용자의 주의를 집중시키고 중요한 정보를 전달하는데 사용됩니다.</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline">취소</Button>
                      <Button>확인</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Custom Popup */}
              <div className="relative">
                <Button 
                  className="w-full"
                  onClick={() => setShowPopup(true)}
                >
                  커스텀 팝업 열기
                </Button>
                
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute top-full left-0 right-0 mt-2 p-4 bg-background border rounded-lg shadow-lg z-50"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4>커스텀 팝업</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPopup(false)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        이것은 애니메이션과 함께 나타나는 커스텀 팝업입니다.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => {
                          toast.success('팝업에서 작업을 실행했습니다!');
                          setShowPopup(false);
                        }}>
                          실행
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowPopup(false)}
                        >
                          닫기
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                팝업과 모달은 사용자에게 중요한 정보를 전달하거나 특별한 작업을 수행할 때 사용됩니다.
                적절한 애니메이션과 함께 사용하면 더 나은 사용자 경험을 제공할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}