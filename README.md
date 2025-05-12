# Capstone-Design-Project 🚀  
**AI 기반 개인 맞춤형 식단 추천 웹서비스**

[![Node version](https://img.shields.io/badge/node-%3E%3D18.0-green?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Build](https://img.shields.io/badge/GitHub%20Actions-passing-brightgreen?logo=github-actions)](#ci)

> **“누구나 건강하게 먹을 권리가 있다.”**  
> 영양학·예산·알레르기·식습관 데이터를 AI로 분석해  
> **맞춤 식단**과 **시각화된 영양 리포트**를 제공하는 올-인-원 웹앱

## 📸 데모 & 스크린샷

| 시스템 아키텍처 (프로젝트 개요) | 기능 플로우 (모듈 개요) |
|:--:|:--:|
| ![Project Architecture](개요도/프로젝트%20개요도.png) | ![Module Flow](개요도/모듈%20개요도.png) |

<p align="center">
  <a href="https://your-demo-url.com" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Click&nbsp;Here-informational?style=for-the-badge&logo=vercel">
  </a>
</p>

## 📝 소개 (Description)

현대인은 **개인 체형·건강 목표·시간·예산·알레르기** 등 다양한 제약 속에서 “뭘 먹어야 할지” 고민합니다.  
**Capstone-Design-Project**는 이러한 문제를 해결하기 위해 **AI 엔진**과 **풍부한 영양 DB**를 결합,  
사용자 맞춤 식단을 **원-클릭**으로 추천하고 시각화까지 제공하는 올-인-원 웹서비스입니다.

### 핵심 기능
| 카테고리 | 기능 |
|----------|------|
| **1. 데이터 입력** | 키 · 체중 · 목표(감량/증량) · 활동량 · 예산 · 알레르기 |
| **2. AI 식단 추천** | <br>• 칼로리 & 3대 영양소 밸런스 계산 <br>• 음식 가격 반영 예산 최적화 <br>• 대체 식단(Fallback) 제공 |
| **3. 구성/편집 UI** | 끌어-놓기(Drag-and-Drop)로 식단 수정, 실시간 영양 계산 |
| **4. 결과 시각화** | 게이지 차트·스택 바·파이 차트로 영양 비율을 직관적으로 표시 |
| **5. 저장 & 다운로드** | 식단 요약 TXT 다운로드 · DB 저장 · API 응답(JSON) 제공 |

### 주요 기술 키워드

| 영역 | 스택 |
|:--|:--|
| **Frontend** | <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/> <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/Zustand-State-Mgmt-3E3E3E?style=for-the-badge"/> <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/> |
| **Backend** | <img src="https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/> <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/Drizzle%20ORM-0.29-8B5CF6?style=for-the-badge"/> <img src="https://img.shields.io/badge/JWT-Auth-FFB400?style=for-the-badge&logo=jsonwebtokens&logoColor=black"/> |
| **Dev&nbsp;Tools** | <img src="https://img.shields.io/badge/ESLint-FlatConfig-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/> <img src="https://img.shields.io/badge/Prettier-3.2-F7B93E?style=for-the-badge&logo=prettier&logoColor=white"/> <img src="https://img.shields.io/badge/Vitest-1.5-6E9F18?style=for-the-badge"/> <img src="https://img.shields.io/badge/GitHub%20Actions-CI-CD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white"/> |

## 📋 Table&nbsp;of&nbsp;Contents
- [소개 (Description)](#-소개-description)
- [데모 & 스크린샷](#-데모--스크린샷)
- [주요 기능](#-기능-features)        
- [주요 기술 스택](#-주요-기술-키워드)
- [Quick Start](#-quick-start)
- [NPM 스크립트](#-npm-스크립트)
- [폴더 구조](#-폴더-구조-folder-structure)
- [코드 스타일 & 개발 환경](#-코드-스타일--개발-환경)
- [프로젝트 아키텍처](#-프로젝트-아키텍처)
- [로드맵](#-로드맵-roadmap)
- [기여 방법](#-기여-방법-contributing)
- [License](#license)
- [Credits](#-참고-자료-acknowledgements)

---

## ⚡ Quick Start

> **Prerequisites**  
> - Node.js ≥ 18 / npm ≥ 9  
> - `.env` 파일: `cp .env.example .env` 후 값 입력

```bash
# 1) 레포지토리 클론
git clone https://github.com/donghun-dev1/Capstone-Design-Project.git
cd Capstone-Design-Project

# 2) 의존성 설치
npm install

# 3) 개발 서버 & 백엔드 동시 실행
npm run dev
```

## ✨ 기능 (Features)

| # | 기능 | 설명 |
|---|------|------|
| 1 | **AI 맞춤 식단 추천** | 성별·연령·활동량·알레르기·예산을 입력하면 <br>AI 엔진이 **칼로리·3대 영양소·가격** 균형을 맞춰 식단을 생성 |
| 2 | **Drag-and-Drop 식단 편집** | 카드 방식 UI로 끌어-놓기만 하면 식단 재구성<br>→ 실시간으로 영양·칼로리·비용 업데이트 |
| 3 | **영양 시각화 대시보드** | 게이지·스택 바·파이 차트로 <br>섭취 비율·권장량 대비 초과/부족 구간을 즉시 확인 |
| 4 | **예산 최적화 알고리즘** | 동일 칼로리 범위 내에서 **가성비 최상** 조합 제안 <br>– 할인/계절가 정보 반영 |
| 5 | **대체 식품 추천** | 특정 음식 제외 시 **알레르기·취향 필터** 기반 대체 메뉴 자동 제안 |
| 6 | **PDF · CSV · JSON 내보내기** | 결과 리포트를 한 번에 다운로드 → 의료진·PT 트레이너 공유 가능 |
| 7 | **PWA & 모바일 최적화** | 홈 화면 설치 지원, 오프라인 캐싱, 다크 모드 |
| 8 | **DevOps 친화 CI/CD** | GitHub Actions → Vercel Preview → 프로덕션 자동 배포 |

## 🛠 NPM 스크립트

| 명령어 | 설명 |
|--------|------|
| `dev` | 프런트 + 백엔드 **동시** 개발 서버 실행 |
| `build` | Vite 프런트 빌드 **+** esbuild 서버 번들 |
| `start` | 프로덕션 서버 실행 (`dist/index.js`) |
| `check` | `tsc`&nbsp;+&nbsp;`eslint`&nbsp;+&nbsp;`prettier` **통합 품질 검사** |
| `lint` / `lint:fix` | ESLint 검사 / 자동 고침 |
| `format` | Prettier로 코드 일괄 포맷 |
| `db:push` | Drizzle ORM 마이그레이션 반영 |
| `preview` | Vite 정적 결과 미리보기 |

<details>
<summary><code>package.json</code> 스크립트 원문 보기</summary>

```json
"scripts": {
  "dev": "cross-env NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc && npm run lint && npm run format",
  "db:push": "drizzle-kit push",
  "lint": "eslint . --ext .ts,.tsx,.js",
  "lint:fix": "eslint . --ext .ts,.tsx,.js --fix",
  "format": "prettier . --write",
  "preview": "vite preview"
}
```

## 🗂️ 폴더 구조 (Folder Structure)

<details>
<summary>프로젝트 디렉터리 트리 보기</summary>

```text
Capstone-Design-Project/
├── samename/
│   ├── client/                    # React + TS 프론트엔드
│   │   ├── src/
│   │   │   ├── components/       # UI & Feature 컴포넌트
│   │   │   ├── pages/            # 라우트 페이지
│   │   │   ├── stores/           # Zustand 상태
│   │   │   ├── hooks/            # 커스텀 훅
│   │   │   ├── styles/           # Tailwind / CSS
│   │   │   └── main.tsx
│   │   └── index.html
│   ├── server/                   # Express API 서버
│   │   ├── routes.ts
│   │   ├── storage.ts            # DB 액세스 (Drizzle ORM)
│   │   ├── db.ts
│   │   └── index.ts
│   ├── shared/                   # 공용 타입 & 스키마
│   ├── drizzle.config.ts
│   ├── tailwind.config.ts
│   ├── eslint.config.js
│   ├── .prettierrc
│   └── .vscode/
│       ├── settings.json
│       └── extensions.json
├── .gitignore
├── README.md
└── package.json


