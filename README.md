# next-js-optimize

Next.js, React, @legendapp/state, TailwindCSS 기반의 최적화 상태관리 및 UI 예제 프로젝트입니다.

## 주요 특징
- **Next.js 15** 기반의 최신 React 앱
- **@legendapp/state**를 활용한 옵저버블 상태관리와 기존 useState 방식 비교
- **TailwindCSS** 및 tailwindcss-animate로 빠른 UI 스타일링
- 타입 안정성을 위한 **TypeScript** 적용

## 데모 예시
- `Counter`: @legendapp/state를 활용한 상태관리 카운터
- `OldWayCounter`: 기존 useState 기반 카운터

## 폴더 구조
```
├── app/                # Next.js app 디렉토리(라우팅, 레이아웃)
│   ├── layout.tsx
│   └── page.tsx
├── components/         # UI 컴포넌트 및 상태관리 예제
│   ├── Counter.tsx
│   ├── CounterNumber.tsx
│   ├── OldWayCounter.tsx
│   ├── OldWayCounterNumber.tsx
│   └── Button.tsx
├── public/             # 정적 파일(이미지 등)
├── tailwind.config.ts  # TailwindCSS 설정
├── next.config.mjs     # Next.js 설정
├── package.json        # 프로젝트 메타/스크립트/의존성
├── tsconfig.json       # TypeScript 설정
```

## 기술 스택
- **Next.js** 15
- **React** 19
- **@legendapp/state** (옵저버블 상태관리)
- **TailwindCSS** 4
- **TypeScript**
- **ESLint, Prettier** (코드 품질 및 포맷)

## 설치 및 실행
```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build

# 린트
pnpm lint

# 코드 포맷팅
pnpm format
```

## 상태관리 비교
- **Counter**: @legendapp/state의 useObservable로 상태를 관리, 반응형 UI 구현
- **OldWayCounter**: React useState로 상태를 관리하는 전통적 방식

## 참고사항
- `output: 'standalone'` 옵션으로 Next.js 빌드 최적화
- TailwindCSS 커스텀 컬러/애니메이션 적용
- 모노레포는 아니나, pnpm-workspace.yaml로 일부 의존성 관리

---
문의: [프로젝트 소유자에게 연락] 