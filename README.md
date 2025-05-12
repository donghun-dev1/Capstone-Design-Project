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
> - **Node.js ≥ 18** & `npm ≥ 9`  
> - 환경변수 설정: `.env` 파일을 `cp .env.example .env`로 복사 후 값 입력

```bash
# 1) 레포지토리 클론
git clone https://github.com/donghun-dev1/Capstone-Design-Project.git
cd Capstone-Design-Project

# 2) 의존성 설치
npm install

# 3) 개발 서버 & 백엔드 동시 실행
npm run dev
