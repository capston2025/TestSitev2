import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Search, Filter, SortAsc, SortDesc, Grid, List, Eye, MoreHorizontal, TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Sample data
const tableData = [
  { id: 1, name: '김철수', email: 'kim@example.com', role: '개발자', status: 'active', joinDate: '2023-01-15', salary: 5500 },
  { id: 2, name: '이영희', email: 'lee@example.com', role: '디자이너', status: 'active', joinDate: '2023-02-20', salary: 5000 },
  { id: 3, name: '박민수', email: 'park@example.com', role: '매니저', status: 'inactive', joinDate: '2022-11-10', salary: 6000 },
  { id: 4, name: '최지연', email: 'choi@example.com', role: '개발자', status: 'active', joinDate: '2023-03-05', salary: 5200 },
  { id: 5, name: '장동건', email: 'jang@example.com', role: '디자이너', status: 'pending', joinDate: '2023-04-12', salary: 4800 },
  { id: 6, name: '홍길동', email: 'hong@example.com', role: '개발자', status: 'active', joinDate: '2023-01-28', salary: 5800 },
];

const chartData = [
  { name: '1월', sales: 4000, revenue: 2400, users: 240 },
  { name: '2월', sales: 3000, revenue: 1398, users: 221 },
  { name: '3월', sales: 2000, revenue: 9800, users: 229 },
  { name: '4월', sales: 2780, revenue: 3908, users: 200 },
  { name: '5월', sales: 1890, revenue: 4800, users: 218 },
  { name: '6월', sales: 2390, revenue: 3800, users: 250 },
];

const pieData = [
  { name: '데스크톱', value: 45, color: '#0088FE' },
  { name: '모바일', value: 35, color: '#00C49F' },
  { name: '태블릿', value: 20, color: '#FFBB28' },
];

const products = [
  { id: 1, name: 'iPhone 15 Pro', price: 1290000, category: '스마트폰', rating: 4.8, image: 'https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNobm9sb2d5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc1OTMwOTU1Mnww&ixlib=rb-4.1.0&q=80&w=300' },
  { id: 2, name: 'MacBook Pro', price: 2890000, category: '노트북', rating: 4.9, image: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5Mzg5NzQzfDA&ixlib=rb-4.1.0&q=80&w=300' },
  { id: 3, name: 'iPad Air', price: 890000, category: '태블릿', rating: 4.7, image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTkzODgyMzB8MA&ixlib=rb-4.1.0&q=80&w=300' },
  { id: 4, name: 'AirPods Pro', price: 290000, category: '오디오', rating: 4.6, image: 'https://images.unsplash.com/photo-1758923530678-77c76f0ff587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwc2hvd2Nhc2UlMjBnYWxsZXJ5fGVufDF8fHx8MTc1OTM5ODUzOHww&ixlib=rb-4.1.0&q=80&w=300' },
  { id: 5, name: 'Apple Watch', price: 590000, category: '웨어러블', rating: 4.5, image: 'https://images.unsplash.com/photo-1623715537851-8bc15aa8c145?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG1lZXRpbmd8ZW58MXx8fHwxNzU5Mzg5NzQzfDA&ixlib=rb-4.1.0&q=80&w=300' },
  { id: 6, name: 'Mac Studio', price: 3890000, category: '데스크톱', rating: 4.8, image: 'https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGFuYWx5dGljcyUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NTkzODgyMzB8MA&ixlib=rb-4.1.0&q=80&w=300' },
];

export function DataDisplaySection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = tableData.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesFilter;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        const aVal = a[sortField as keyof typeof a];
        const bVal = b[sortField as keyof typeof b];
        
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDirection === 'asc' 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, sortField, sortDirection, filterStatus]);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      pending: 'outline'
    } as const;
    
    const labels = {
      active: '활성',
      inactive: '비활성',
      pending: '대기'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>데이터 표시 컴포넌트</h2>
        <p className="text-muted-foreground">다양한 형태로 데이터를 표시하고 조작하는 컴포넌트들</p>
      </div>

      <div className="grid gap-8">
        {/* Table with Sorting and Filtering */}
        <Card>
          <CardHeader>
            <CardTitle>테이블 (정렬, 필터)</CardTitle>
            <CardDescription>검색, 정렬, 필터링이 가능한 데이터 테이블</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="이름, 이메일, 역할 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md text-sm"
                >
                  <option value="all">모든 상태</option>
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="pending">대기</option>
                </select>
                
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  필터
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('name')}
                    >
                      <div className="flex items-center gap-2">
                        이름 {getSortIcon('name')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('email')}
                    >
                      <div className="flex items-center gap-2">
                        이메일 {getSortIcon('email')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('role')}
                    >
                      <div className="flex items-center gap-2">
                        역할 {getSortIcon('role')}
                      </div>
                    </TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => handleSort('joinDate')}
                    >
                      <div className="flex items-center gap-2">
                        가입일 {getSortIcon('joinDate')}
                      </div>
                    </TableHead>
                    <TableHead 
                      className="cursor-pointer hover:bg-muted/50 text-right"
                      onClick={() => handleSort('salary')}
                    >
                      <div className="flex items-center gap-2 justify-end">
                        연봉 {getSortIcon('salary')}
                      </div>
                    </TableHead>
                    <TableHead>동작</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {user.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell className="text-right">
                        ₩{user.salary.toLocaleString()}만
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="text-sm text-muted-foreground">
              총 {tableData.length}명 중 {filteredData.length}명 표시
            </div>
          </CardContent>
        </Card>

        {/* Card Grid and List View */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>카드 그리드 / 리스트 뷰</CardTitle>
                <CardDescription>제품 데이터를 그리드와 리스트 형태로 전환하여 표시</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <div className="space-y-2">
                          <h4>{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">
                              ₩{product.price.toLocaleString()}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm">{product.rating}</span>
                            </div>
                          </div>
                          <Button className="w-full" size="sm">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            장바구니 추가
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4>{product.name}</h4>
                            <p className="text-sm text-muted-foreground">{product.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-medium">
                              ₩{product.price.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm">{product.rating}</span>
                            </div>
                          </div>
                          <Button size="sm">
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Charts and Graphs */}
        <Card>
          <CardHeader>
            <CardTitle>차트/그래프</CardTitle>
            <CardDescription>다양한 형태의 데이터 시각화 차트</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">총 매출</p>
                      <p className="text-2xl font-medium">₩24.5M</p>
                      <p className="text-sm text-green-600">+12.5%</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">주문 수</p>
                      <p className="text-2xl font-medium">1,234</p>
                      <p className="text-sm text-green-600">+8.2%</p>
                    </div>
                    <ShoppingCart className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">활성 사용자</p>
                      <p className="text-2xl font-medium">2,468</p>
                      <p className="text-sm text-red-600">-2.1%</p>
                    </div>
                    <Users className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">성장률</p>
                      <p className="text-2xl font-medium">15.3%</p>
                      <p className="text-sm text-green-600">+5.4%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bar Chart */}
            <div>
              <h4 className="mb-4">월별 매출 현황</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#8884d8" />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div>
              <h4 className="mb-4">사용자 증가 추이</h4>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart and Area Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="mb-4">플랫폼별 사용률</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h4 className="mb-4">누적 수익</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}