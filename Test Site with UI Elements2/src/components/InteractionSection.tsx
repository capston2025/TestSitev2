import React, { useState, useRef } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger, ContextMenuSeparator } from './ui/context-menu';
import { toast } from 'sonner@2.0.3';
import { Copy, Scissors, Clipboard, Delete, Edit, Share, Download, Star, Heart, Move, RotateCcw, ZoomIn, Trash2, Archive, RefreshCw } from 'lucide-react';

const ItemType = 'CARD';

interface DragItem {
  id: string;
  title: string;
  description: string;
}

function DraggableCard({ item, index, moveCard }: { 
  item: DragItem; 
  index: number; 
  moveCard: (dragIndex: number, hoverIndex: number) => void 
}) {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) return;
      
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const dragRef = drag(drop(ref));

  return (
    <div
      ref={dragRef}
      data-handler-id={handlerId}
      className={`p-4 border rounded-lg cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Move className="w-4 h-4 text-muted-foreground" />
        <h4>{item.title}</h4>
      </div>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
  );
}

export function InteractionSection() {
  const [cards, setCards] = useState<DragItem[]>([
    { id: '1', title: '작업 1', description: '첫 번째 작업입니다' },
    { id: '2', title: '작업 2', description: '두 번째 작업입니다' },
    { id: '3', title: '작업 3', description: '세 번째 작업입니다' },
    { id: '4', title: '작업 4', description: '네 번째 작업입니다' },
  ]);

  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [mouseStart, setMouseStart] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = cards[dragIndex];
    const newCards = [...cards];
    newCards.splice(dragIndex, 1);
    newCards.splice(hoverIndex, 0, dragCard);
    setCards(newCards);
  };

  const handleDoubleClick = () => {
    setDoubleClickCount(prev => prev + 1);
    toast.info(`더블클릭 ${doubleClickCount + 1}번째!`);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (Math.abs(deltaX) > minSwipeDistance) {
        const direction = deltaX > 0 ? '오른쪽' : '왼쪽';
        setSwipeDirection(direction);
        toast.info(`${direction}으로 스와이프!`);
      }
    } else {
      if (Math.abs(deltaY) > minSwipeDistance) {
        const direction = deltaY > 0 ? '아래' : '위';
        setSwipeDirection(direction);
        toast.info(`${direction}로 스와이프!`);
      }
    }

    setTouchStart(null);
    setTimeout(() => setSwipeDirection(null), 2000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setMouseStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return;
    
    const deltaX = e.clientX - mouseStart.x;
    const deltaY = e.clientY - mouseStart.y;
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        const direction = deltaX > 0 ? '오른쪽' : '왼쪽';
        setSwipeDirection(direction);
        toast.info(`${direction}으로 드래그!`);
      } else {
        const direction = deltaY > 0 ? '아래' : '위';
        setSwipeDirection(direction);
        toast.info(`${direction}로 드래그!`);
      }
      
      setIsDragging(false);
      setMouseStart(null);
      setTimeout(() => setSwipeDirection(null), 2000);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setMouseStart(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>인터랙션 컴포넌트</h2>
        <p className="text-muted-foreground">다양한 사용자 인터랙션을 처리하는 컴포넌트들</p>
      </div>

      <div className="grid gap-8">
        {/* Drag and Drop */}
        <Card>
          <CardHeader>
            <CardTitle>드래그 앤 드롭</CardTitle>
            <CardDescription>카드를 드래그하여 순서를 변경할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <DndProvider backend={HTML5Backend}>
              <div className="space-y-3">
                {cards.map((card, index) => (
                  <DraggableCard
                    key={card.id}
                    item={card}
                    index={index}
                    moveCard={moveCard}
                  />
                ))}
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  위 카드들을 드래그하여 순서를 변경해보세요. 
                  마우스로 카드를 클릭하고 드래그하면 다른 위치로 이동할 수 있습니다.
                </p>
              </div>
            </DndProvider>
          </CardContent>
        </Card>

        {/* Double Click */}
        <Card>
          <CardHeader>
            <CardTitle>더블 클릭</CardTitle>
            <CardDescription>더블 클릭으로 특별한 동작을 실행합니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-8 border-2 border-dashed border-muted-foreground/50 rounded-lg text-center cursor-pointer hover:border-muted-foreground transition-colors"
              onDoubleClick={handleDoubleClick}
            >
              <div className="space-y-2">
                <div className="text-4xl">🎯</div>
                <h4>여기를 더블클릭하세요!</h4>
                <p className="text-sm text-muted-foreground">
                  빠르게 두 번 클릭하면 특별한 일이 일어납니다
                </p>
              </div>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                더블클릭 횟수: <span className="font-medium">{doubleClickCount}번</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div 
                className="p-4 border rounded-lg text-center cursor-pointer hover:bg-accent"
                onDoubleClick={() => toast.success('좋아요를 눌렀습니다!')}
              >
                <Heart className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">더블클릭으로 좋아요</p>
              </div>
              
              <div 
                className="p-4 border rounded-lg text-center cursor-pointer hover:bg-accent"
                onDoubleClick={() => toast.success('즐겨찾기에 추가했습니다!')}
              >
                <Star className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm">더블클릭으로 즐겨찾기</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Click Context Menu */}
        <Card>
          <CardHeader>
            <CardTitle>우클릭 컨텍스트 메뉴</CardTitle>
            <CardDescription>우클릭하면 상황에 맞는 메뉴가 나타납니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ContextMenu>
                <ContextMenuTrigger className="p-6 border-2 border-dashed border-muted-foreground/50 rounded-lg text-center cursor-pointer hover:border-muted-foreground">
                  <div className="space-y-2">
                    <Edit className="w-6 h-6 mx-auto" />
                    <p className="text-sm">텍스트 편집기</p>
                    <p className="text-xs text-muted-foreground">우클릭으로 편집 메뉴</p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => toast.info('복사했습니다')}>
                    <Copy className="w-4 h-4 mr-2" />
                    복사
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info('잘라냈습니다')}>
                    <Scissors className="w-4 h-4 mr-2" />
                    잘라내기
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info('붙여넣었습니다')}>
                    <Clipboard className="w-4 h-4 mr-2" />
                    붙여넣기
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => toast.warning('삭제했습니다')}>
                    <Delete className="w-4 h-4 mr-2" />
                    삭제
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>

              <ContextMenu>
                <ContextMenuTrigger className="p-6 border-2 border-dashed border-muted-foreground/50 rounded-lg text-center cursor-pointer hover:border-muted-foreground">
                  <div className="space-y-2">
                    <Share className="w-6 h-6 mx-auto" />
                    <p className="text-sm">파일 관리</p>
                    <p className="text-xs text-muted-foreground">우클릭으로 파일 메뉴</p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => toast.info('공유 링크를 생성했습니다')}>
                    <Share className="w-4 h-4 mr-2" />
                    공유하기
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info('다운로드를 시작합니다')}>
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => toast.info('아카이브로 이동했습니다')}>
                    <Archive className="w-4 h-4 mr-2" />
                    아카이브
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.warning('휴지통으로 이동했습니다')}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    삭제
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>

              <ContextMenu>
                <ContextMenuTrigger className="p-6 border-2 border-dashed border-muted-foreground/50 rounded-lg text-center cursor-pointer hover:border-muted-foreground">
                  <div className="space-y-2">
                    <ZoomIn className="w-6 h-6 mx-auto" />
                    <p className="text-sm">이미지 뷰어</p>
                    <p className="text-xs text-muted-foreground">우클릭으로 뷰어 메뉴</p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem onClick={() => toast.info('확대했습니다')}>
                    <ZoomIn className="w-4 h-4 mr-2" />
                    확대
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info('90도 회전했습니다')}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    회전
                  </ContextMenuItem>
                  <ContextMenuItem onClick={() => toast.info('새로고침했습니다')}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    새로고침
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                위의 영역들을 우클릭하면 상황에 맞는 컨텍스트 메뉴가 나타납니다. 
                각 영역마다 다른 메뉴 항목들이 제공됩니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Swipe Gestures */}
        <Card>
          <CardHeader>
            <CardTitle>스와이프 제스처</CardTitle>
            <CardDescription>터치 기기에서 스와이프 동작을 인식합니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div 
              className="p-12 border-2 border-dashed border-muted-foreground/50 rounded-lg text-center touch-pan-x touch-pan-y select-none cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={() => setTouchStart(null)}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ touchAction: 'pan-x pan-y' }}
            >
              <div className="space-y-4">
                <div className="text-6xl">👆</div>
                <h4>스와이프 영역</h4>
                <p className="text-sm text-muted-foreground">
                  터치 기기에서 이 영역을 상하좌우로 스와이프해보세요
                </p>
                {swipeDirection && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-3 py-1 bg-primary text-primary-foreground rounded-full"
                  >
                    {swipeDirection} 스와이프!
                  </motion.div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-sm">
              <div className="p-2 bg-muted rounded">← 왼쪽</div>
              <div className="p-2 bg-muted rounded">→ 오른쪽</div>
              <div className="p-2 bg-muted rounded">↑ 위</div>
              <div className="p-2 bg-muted rounded">↓ 아래</div>
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                모바일 기기에서 위 영역을 터치하고 스와이프하면 방향을 감지합니다. 
                데스크톱에서는 마우스로 클릭하고 드래그해도 동작합니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts Info */}
        <Card>
          <CardHeader>
            <CardTitle>키보드 단축키</CardTitle>
            <CardDescription>사이트에서 사용할 수 있는 키보드 단축키들</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4>전역 단축키</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>사이드바 토글</span>
                    <kbd className="bg-muted px-2 py-1 rounded">⌘ + /</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>검색</span>
                    <kbd className="bg-muted px-2 py-1 rounded">⌘ + K</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>사이드바 닫기</span>
                    <kbd className="bg-muted px-2 py-1 rounded">ESC</kbd>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4>미래 기능</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>새 항목 생성</span>
                    <kbd className="bg-muted px-2 py-1 rounded">⌘ + N</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>저장</span>
                    <kbd className="bg-muted px-2 py-1 rounded">⌘ + S</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>실행취소</span>
                    <kbd className="bg-muted px-2 py-1 rounded">⌘ + Z</kbd>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                위의 단축키들을 사용하여 더 빠르게 사이트를 탐색할 수 있습니다. 
                Mac에서는 ⌘ 키를, Windows에서는 Ctrl 키를 사용합니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}