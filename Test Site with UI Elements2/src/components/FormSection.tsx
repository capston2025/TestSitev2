import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Slider } from './ui/slider';
import { CalendarIcon, Upload, FileText, Image, Video } from 'lucide-react';
import { cn } from './ui/utils';

export function FormSection() {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [priceRange, setPriceRange] = useState([50]);
  const [volumeLevel, setVolumeLevel] = useState([75]);
  interface UploadedFile {
    name: string;
    size: number;
    type: string;
  }

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files).map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }));
      setUploadedFiles(fileArray);
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (fileType.startsWith('video/')) return <Video className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2>폼 관련 컴포넌트</h2>
        <p className="text-muted-foreground">다양한 폼 입력 요소들과 선택 컨트롤</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Radio Button Group */}
        <Card>
          <CardHeader>
            <CardTitle>라디오 버튼 그룹</CardTitle>
            <CardDescription>하나의 옵션만 선택할 수 있는 라디오 버튼</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>배송 방법을 선택해주세요</Label>
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">일반 배송 (3-5일, 무료)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">빠른 배송 (1-2일, 3,000원)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="overnight" id="overnight" />
                  <Label htmlFor="overnight">당일 배송 (당일 도착, 5,000원)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">매장 픽업 (무료)</Label>
                </div>
              </RadioGroup>
              <p className="text-sm text-muted-foreground mt-2">
                선택된 옵션: {selectedOption}
              </p>
            </div>

            <div>
              <Label>결제 방법</Label>
              <RadioGroup defaultValue="card" className="mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">신용카드</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">계좌이체</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile">간편결제</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Toggle Switch */}
        <Card>
          <CardHeader>
            <CardTitle>토글 스위치</CardTitle>
            <CardDescription>온/오프 상태를 전환할 수 있는 스위치</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>알림 받기</Label>
                <p className="text-sm text-muted-foreground">
                  새로운 메시지나 업데이트 알림을 받습니다
                </p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>이메일 알림</Label>
                <p className="text-sm text-muted-foreground">
                  중요한 정보를 이메일로 받습니다
                </p>
              </div>
              <Switch
                checked={emailAlerts}
                onCheckedChange={setEmailAlerts}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>다크 모드</Label>
                <p className="text-sm text-muted-foreground">
                  어두운 테마를 사용합니다
                </p>
              </div>
              <Switch defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>자동 저장</Label>
                <p className="text-sm text-muted-foreground">
                  변경사항을 자동으로 저장합니다
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>

            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                현재 설정: 알림 {notifications ? '켜짐' : '꺼짐'}, 
                이메일 알림 {emailAlerts ? '켜짐' : '꺼짐'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Dropdown Select */}
        <Card>
          <CardHeader>
            <CardTitle>드롭다운 셀렉트</CardTitle>
            <CardDescription>목록에서 옵션을 선택할 수 있는 드롭다운</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>국가 선택</Label>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="국가를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kr">대한민국</SelectItem>
                  <SelectItem value="us">미국</SelectItem>
                  <SelectItem value="jp">일본</SelectItem>
                  <SelectItem value="cn">중국</SelectItem>
                  <SelectItem value="uk">영국</SelectItem>
                  <SelectItem value="fr">프랑스</SelectItem>
                  <SelectItem value="de">독일</SelectItem>
                  <SelectItem value="ca">캐나다</SelectItem>
                  <SelectItem value="au">호주</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>언어 설정</Label>
              <Select defaultValue="ko">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>시간대</Label>
              <Select defaultValue="asia-seoul">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-seoul">아시아/서울 (GMT+9)</SelectItem>
                  <SelectItem value="america-new-york">미��/뉴욕 (GMT-5)</SelectItem>
                  <SelectItem value="europe-london">유럽/런던 (GMT+0)</SelectItem>
                  <SelectItem value="asia-tokyo">아시아/도쿄 (GMT+9)</SelectItem>
                  <SelectItem value="australia-sydney">호주/시드니 (GMT+11)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCountry && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">선택된 국가: {selectedCountry}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Date/Time Picker */}
        <Card>
          <CardHeader>
            <CardTitle>날짜/시간 피커</CardTitle>
            <CardDescription>날짜와 시간을 선택할 수 있는 피커</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>예약 날짜</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      selectedDate.toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })
                    ) : (
                      "날짜를 선택하세요"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>예약 시간</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="시간을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">오전 9:00</SelectItem>
                  <SelectItem value="10:00">오전 10:00</SelectItem>
                  <SelectItem value="11:00">오전 11:00</SelectItem>
                  <SelectItem value="12:00">오후 12:00</SelectItem>
                  <SelectItem value="13:00">오후 1:00</SelectItem>
                  <SelectItem value="14:00">오후 2:00</SelectItem>
                  <SelectItem value="15:00">오후 3:00</SelectItem>
                  <SelectItem value="16:00">오후 4:00</SelectItem>
                  <SelectItem value="17:00">오후 5:00</SelectItem>
                  <SelectItem value="18:00">오후 6:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedDate && selectedTime && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  예약 일시: {selectedDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} {selectedTime}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle>파일 업로드</CardTitle>
            <CardDescription>다양한 형태의 파일을 업로드할 수 있습니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>파일 선택</Label>
              <div 
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-primary');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-primary');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-primary');
                  const files = e.dataTransfer.files;
                  if (files.length > 0) {
                    const fileArray = Array.from(files).map(file => ({
                      name: file.name,
                      size: file.size,
                      type: file.type
                    }));
                    setUploadedFiles(fileArray);
                  }
                }}
              >
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <div className="space-y-2">
                  <p className="text-sm">클릭하거나 파일을 드래그하여 업로드</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, PDF 파일 지원 (최대 10MB)
                  </p>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </div>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <Label>업로드된 파일</Label>
                <div className="space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 border rounded">
                      {getFileIcon(file.type)}
                      <span className="text-sm truncate flex-1">{file.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)}KB
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setUploadedFiles(files => files.filter((_, i) => i !== index));
                        }}
                      >
                        삭제
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Range Slider */}
        <Card>
          <CardHeader>
            <CardTitle>범위 슬라이더</CardTitle>
            <CardDescription>값의 범위를 선택할 수 있는 슬라이더</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>가격 범위</Label>
                <span className="text-sm text-muted-foreground">
                  ₩{priceRange[0].toLocaleString()}
                </span>
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₩0</span>
                <span>₩1,000,000</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>볼륨</Label>
                <span className="text-sm text-muted-foreground">
                  {volumeLevel[0]}%
                </span>
              </div>
              <Slider
                value={volumeLevel}
                onValueChange={setVolumeLevel}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label>투명도</Label>
              <Slider
                defaultValue={[80]}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>불투명</span>
                <span>투명</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}