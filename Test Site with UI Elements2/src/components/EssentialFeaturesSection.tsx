import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Separator } from './ui/separator';
import { toast } from 'sonner@2.0.3';
import { 
  Search, 
  UserPlus, 
  LogIn, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Eye, 
  Star,
  Filter,
  SortAsc,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface SearchResult {
  id: number;
  title: string;
  description: string;
  category: string;
  relevance: number;
}

export function EssentialFeaturesSection() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    category: 'all',
    sortBy: 'relevance'
  });

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '' });

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Products data
  const [products] = useState<Product[]>([
    { id: 1, name: '무선 헤드폰', price: 89000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', description: '고품질 무선 헤드폰', category: '전자제품', rating: 4.5 },
    { id: 2, name: '스마트워치', price: 299000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', description: '최신 스마트워치', category: '전자제품', rating: 4.3 },
    { id: 3, name: '노트북', price: 1299000, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop', description: '고성능 노트북', category: '컴퓨터', rating: 4.7 },
    { id: 4, name: '운동화', price: 159000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop', description: '편안한 운동화', category: '의류', rating: 4.2 },
    { id: 5, name: '커피머신', price: 450000, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop', description: '프리미엄 커피머신', category: '가전제품', rating: 4.6 },
    { id: 6, name: '책상', price: 200000, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop', description: '모던 책상', category: '가구', rating: 4.4 }
  ]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Zoom state
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Checkbox demo state
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Mock search data
  const mockSearchData: SearchResult[] = [
    { id: 1, title: '무선 헤드폰 사용법', description: '무선 헤드폰 연결 및 사용 가이드', category: '가이드', relevance: 0.9 },
    { id: 2, title: '스마트워치 앱 추천', description: '유용한 스마트워치 앱들', category: '앱', relevance: 0.8 },
    { id: 3, title: '노트북 성능 최적화', description: '노트북 성능을 향상시키는 방법', category: '팁', relevance: 0.7 },
    { id: 4, title: '운동화 관리법', description: '운동화를 오래 사용하는 방법', category: '관리', relevance: 0.6 },
    { id: 5, title: '커피 원두 선택', description: '맛있는 커피를 위한 원두 선택법', category: '가이드', relevance: 0.5 },
  ];

  // Search function
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filtered = mockSearchData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase())
    );

    // Sort by relevance or other criteria
    const sorted = [...filtered].sort((a, b) => {
      if (searchFilters.sortBy === 'relevance') {
        return b.relevance - a.relevance;
      }
      return a.title.localeCompare(b.title);
    });

    setSearchResults(sorted);
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchFilters]);

  // Auth functions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authForm.email && authForm.password) {
        setCurrentUser({ name: authForm.name || '사용자', email: authForm.email });
        setIsLoggedIn(true);
        toast.success('로그인되었습니다!');
        setAuthForm({ email: '', password: '', name: '' });
      } else {
        toast.error('이메일과 비밀번호를 입력해주세요.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authForm.email && authForm.password && authForm.name) {
        setCurrentUser({ name: authForm.name, email: authForm.email });
        setIsLoggedIn(true);
        toast.success('회원가입이 완료되었습니다!');
        setAuthForm({ email: '', password: '', name: '' });
      } else {
        toast.error('모든 필드를 입력해주세요.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('회원가입 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCartItems([]);
    toast.info('로그아웃되었습니다.');
  };

  // Cart functions
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name}이(가) 장바구니에 추가되었습니다.`);
  };

  const updateCartQuantity = (id: number, change: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.info('상품이 장바구니에서 제거되었습니다.');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Pagination
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  };

  // Checkbox handling
  const handleCheckboxChange = (productId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, productId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== productId));
    }
  };

  const selectAllItems = () => {
    const currentPageIds = getCurrentPageItems().map(p => p.id);
    setSelectedItems([...new Set([...selectedItems, ...currentPageIds])]);
  };

  const deselectAllItems = () => {
    const currentPageIds = getCurrentPageItems().map(p => p.id);
    setSelectedItems(selectedItems.filter(id => !currentPageIds.includes(id)));
  };

  // Zoom functions
  const openZoomedView = (imageSrc: string) => {
    setZoomedImage(imageSrc);
    setZoomLevel(1);
  };

  const adjustZoom = (delta: number) => {
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>핵심 웹사이트 기능들</h2>
        <p className="text-muted-foreground">
          검색, 인증, 장바구니, 페이지네이션 등 필수 웹사이트 기능들을 체험해보세요.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              검색 기능
            </CardTitle>
            <CardDescription>
              실시간 검색, 필터링, 정렬 기능이 포함된 검색 시스템
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  placeholder="검색어를 입력하세요..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
              <Button variant="outline" onClick={() => setSearchFilters({...searchFilters, sortBy: searchFilters.sortBy === 'relevance' ? 'title' : 'relevance'})}>
                <SortAsc className="w-4 h-4 mr-2" />
                정렬
              </Button>
            </div>

            <div className="flex gap-2 text-sm text-muted-foreground">
              <span>정렬: {searchFilters.sortBy === 'relevance' ? '관련도순' : '제목순'}</span>
              {searchResults.length > 0 && <span>• {searchResults.length}개 결과</span>}
            </div>

            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 max-h-60 overflow-y-auto"
                >
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 border rounded-lg hover:bg-accent cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">{result.title}</h4>
                          <p className="text-sm text-muted-foreground">{result.description}</p>
                        </div>
                        <Badge variant="secondary">{result.category}</Badge>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Auth Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isLoggedIn ? <Avatar className="w-5 h-5"><AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback></Avatar> : <UserPlus className="w-5 h-5" />}
              사용자 인증
            </CardTitle>
            <CardDescription>
              회원가입, 로그인, 사용자 프로필 관리
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoggedIn ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentUser?.name}님 환영합니다!</p>
                    <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                  </div>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">로그인</TabsTrigger>
                  <TabsTrigger value="signup">회원가입</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">이메일</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={authForm.email}
                        onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">비밀번호</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="비밀번호"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <LogIn className="w-4 h-4 mr-2" />
                      로그인
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">이름</Label>
                      <Input
                        id="signup-name"
                        placeholder="홍길동"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">이메일</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={authForm.email}
                        onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">비밀번호</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="비밀번호"
                        value={authForm.password}
                        onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      <UserPlus className="w-4 h-4 mr-2" />
                      회원가입
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>

        {/* Shopping Cart Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                장바구니 ({cartItems.length})
              </div>
              <Dialog open={cartOpen} onOpenChange={setCartOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    장바구니 보기
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>장바구니</DialogTitle>
                    <DialogDescription>
                      선택한 상품들을 확인하고 수량을 조정하세요.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {cartItems.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">장바구니가 비어있습니다.</p>
                    ) : (
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price.toLocaleString()}원</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.id, -1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.id, 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Separator />
                        <div className="flex justify-between items-center font-medium text-lg">
                          <span>총 금액:</span>
                          <span>{getTotalPrice().toLocaleString()}원</span>
                        </div>
                        <Button className="w-full" disabled={!isLoggedIn}>
                          {isLoggedIn ? '주문하기' : '로그인이 필요합니다'}
                        </Button>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
            <CardDescription>
              상품 선택, 장바구니 추가/제거, 수량 조정 기능
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              {isLoggedIn ? '상품을 선택하여 장바구니에 추가하세요.' : '장바구니 사용을 위해 로그인이 필요합니다.'}
            </div>
          </CardContent>
        </Card>

        {/* Products with Pagination and Checkboxes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>상품 목록</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={selectAllItems}
                  disabled={getCurrentPageItems().every(p => selectedItems.includes(p.id))}
                >
                  전체 선택
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={deselectAllItems}
                  disabled={!getCurrentPageItems().some(p => selectedItems.includes(p.id))}
                >
                  선택 해제
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              체크박스 선택, 페이지네이션, 상품 확대보기 기능이 포함된 상품 목록
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Selected items info */}
            {selectedItems.length > 0 && (
              <div className="p-3 bg-accent rounded-lg">
                <p className="text-sm">
                  {selectedItems.length}개 상품이 선택되었습니다.
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedItems([])}
                    className="ml-2"
                  >
                    모두 해제
                  </Button>
                </p>
              </div>
            )}

            {/* Products grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentPageItems().map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedItems.includes(product.id)}
                        onCheckedChange={(checked) => handleCheckboxChange(product.id, checked as boolean)}
                      />
                      <Label className="text-sm">선택</Label>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openZoomedView(product.image)}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="relative group">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded cursor-pointer"
                      onClick={() => openZoomedView(product.image)}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => openZoomedView(product.image)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        확대보기
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{product.price.toLocaleString()}원</span>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      장바구니 추가
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              {itemsPerPage * (currentPage - 1) + 1}-{Math.min(itemsPerPage * currentPage, products.length)} / {products.length}개 상품
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Zoom Modal */}
      <Dialog open={!!zoomedImage} onOpenChange={() => setZoomedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>이미지 확대보기</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustZoom(-0.2)}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <span className="text-sm px-2">{Math.round(zoomLevel * 100)}%</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => adjustZoom(0.2)}
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setZoomedImage(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center overflow-auto max-h-96">
            {zoomedImage && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: zoomLevel, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="origin-center"
              >
                <ImageWithFallback
                  src={zoomedImage}
                  alt="확대된 이미지"
                  className="max-w-none"
                />
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}