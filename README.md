# Capstone-Design-Project - AI 기반 식단 추천 웹서비스

<br><br>

## 🟨 서비스 개요
AI가 사용자의 건강 목표, 알레르기, 예산 등을 기반으로 맞춤형 식단을 추천하고 설계하는 웹 기반 식단 추천 서비스입니다.

<br><br>

## 🟨 목적 및 필요성
건강한 식단은 개인의 건강 목표 달성과 질병 예방에 필수적이지만, 많은 사용자가 자신의 상황에 맞는 식단을 구성하는 데 어려움을 겪습니다.
<br>
본 서비스는 AI를 활용하여 사용자 맞춤형 식단을 자동으로 추천해 누구나 쉽게 건강한 식생활을 실천할 수 있도록 지원합니다.

<br><br>

## 🟨 핵심 기능
- 성별, 키, 몸무게, 건강 목표, 예산, 알레르기 등 사용자의 다양한 정보를 바탕으로 맞춤형 식단을 추천
- Rule-based AI 알고리즘을 통한 음식 추천
- 추천된 음식을 아침, 점심, 저녁으로 구분하여 맞춤 식단 설계
- 영양소 시각화 및 총 칼로리, 예산 비교 요약 제공
- 예외 상황에도 기본 추천 데이터를 기반으로 서비스 제공

<br><br>

## 🟨 기술 스택

<br>

### 프론트엔드 기술 스택
<table>
  <thead>
    <tr>
      <th>역할</th>
      <th>기술 스택</th>
      <th>세부 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>UI Library</td>
      <td><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></td>
      <td>UI 구성 및 관리 라이브러리, 컴포넌트 기반 웹 애플리케이션 개발</td>
    </tr>
    <tr>
      <td>Chart Library</td>
      <td><img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white" alt="Chart.js"></td>
      <td>데이터 시각화 및 차트 라이브러리, 다양한 차트 생성</td>
    </tr>
    <tr>
      <td>State Management</td>
      <td><img src="https://img.shields.io/badge/Zustand-FFBB00?style=for-the-badge&logo=zustand&logoColor=black" alt="Zustand"></td>
      <td>경량화된 상태 관리 라이브러리, React와 함께 사용하여 전역 상태 관리</td>
    </tr>
    <tr>
      <td>HTTP Client</td>
      <td><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"></td>
      <td>HTTP 요청을 보내는 클라이언트 라이브러리, API 호출에 사용, 요청 및 응답 처리</td>
    </tr>
    <tr>
      <td>UI Notification</td>
      <td><img src="https://img.shields.io/badge/Sonner-00B9F1?style=for-the-badge&logo=sonner&logoColor=white" alt="Sonner"></td>
      <td>사용자 상호작용 시 알림을 표시하는 UI 라이브러리, 즉각적인 알림 처리</td>
    </tr>
    <tr>
      <td>Markup Language</td>
      <td><img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
          <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3"></td>
      <td>웹 페이지의 구조 및 스타일링을 담당하는 언어, HTML5로 구조화하고 CSS3로 스타일 적용</td>
    </tr>
    <tr>
      <td>Programming Language</td>
      <td><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
          <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></td>
      <td>웹 애플리케이션의 기능 구현 및 데이터 흐름 처리, JavaScript와 TypeScript로 동적 웹 개발</td>
    </tr>
    <tr>
      <td>Build Tool</td>
      <td><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></td>
      <td>빠른 빌드 및 개발 서버, ES 모듈 지원, React 개발에 최적화된 빌드 도구</td>
    </tr>
  </tbody>
</table>

<br><br>

### 백엔드 기술 스택
<table>
  <thead>
    <tr>
      <th>역할</th>
      <th>기술 스택</th>
      <th>세부 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Runtime Environment</td>
      <td>
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
      </td>
      <td>JavaScript 런타임 환경, 서버 사이드 애플리케이션 개발에 사용되며, 비동기 I/O와 이벤트 기반 구조를 제공</td>
    </tr>
    <tr>
      <td>Web Framework</td>
      <td>
        <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
      </td>
      <td>Node.js 기반의 경량 웹 프레임워크, REST API 구축 및 미들웨어 처리에 사용</td>
    </tr>
    <tr>
      <td>Web Framework</td>
      <td><img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI"></td>
      <td>고성능 API 개발을 위한 Python 기반의 웹 프레임워크, 비동기 처리를 지원</td>
    </tr>
    <tr>
      <td>Data Validation</td>
      <td><img src="https://img.shields.io/badge/Pydantic-1B58FF?style=for-the-badge&logo=pydantic&logoColor=white" alt="Pydantic"></td>
      <td>데이터 유효성 검사 및 데이터 모델 관리를 위한 라이브러리, FastAPI와 통합되어 사용</td>
    </tr>
    <tr>
      <td>ASGI Server</td>
      <td><img src="https://img.shields.io/badge/Uvicorn-4B3C8C?style=for-the-badge&logo=uvicorn&logoColor=white" alt="Uvicorn"></td>
      <td>FastAPI와 함께 사용하는 ASGI 서버, 고성능 비동기 서버, 빠른 응답 시간 제공</td>
    </tr>
    <tr>
      <td>Database</td>
      <td><img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=PostgreSQL&logoColor=white" alt="PostgreSQL">
          <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=SQLite&logoColor=white" alt="SQLite"></td>
      <td>관계형 데이터베이스 시스템, PostgreSQL은 대규모 애플리케이션에 적합, SQLite는 경량 DB</td>
    </tr>
    <tr>
      <td>ORM Library</td>
      <td><img src="https://img.shields.io/badge/SQLAlchemy-8B0000?style=for-the-badge&logo=SQLAlchemy&logoColor=white" alt="SQLAlchemy"></td>
      <td>Python 기반 ORM 라이브러리, 데이터베이스와의 상호작용 담당, SQLAlchemy로 데이터베이스 모델링</td>
    </tr>
    <tr>
      <td>API Documentation</td>
      <td><img src="https://img.shields.io/badge/OpenAPI%203.0-7A61E8?style=for-the-badge&logo=openapi&logoColor=white" alt="OpenAPI">
          <img src="https://img.shields.io/badge/Swagger%20UI-85A5D6?style=for-the-badge&logo=swagger&logoColor=white" alt="Swagger UI"></td>
      <td>API 문서화 도구, OpenAPI 3.0을 기반으로 API 명세서를 작성하고, Swagger UI로 제공</td>
    </tr>
    <tr>
      <td>Authentication</td>
      <td><img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"></td>
      <td>실시간 데이터베이스, 인증, 저장소 등의 백엔드 서비스를 제공하는 오픈소스 서비스</td>
    </tr>
    <tr>
      <td>Testing</td>
      <td><img src="https://img.shields.io/badge/Newman-5F4B8B?style=for-the-badge&logo=newman&logoColor=white" alt="Newman"></td>
      <td>Postman에서 작성한 API 테스트 스크립트를 CLI에서 실행하는 도구</td>
    </tr>
  </tbody>
</table>

<br><br>

### 공통 기술 스택
<table>
  <thead>
    <tr>
      <th>역할</th>
      <th>기술 스택</th>
      <th>세부 설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Version Control</td>
      <td><img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"></td>
      <td>버전 관리 시스템, 소스 코드 변경 사항 추적 및 팀 협업을 위한 도구</td>
    </tr>
    <tr>
      <td>CI/CD</td>
      <td><img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"></td>
      <td>소프트웨어의 지속적 통합 및 배포를 위한 자동화 도구, GitHub Actions로 빌드, 테스트, 배포</td>
    </tr>
    <tr>
      <td>Deployment</td>
      <td>
        <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel">
        <img src="https://img.shields.io/badge/Fly.io-00B4D8?style=for-the-badge&logo=fly&logoColor=white" alt="Fly.io">
      </td>
      <td>서버리스 애플리케이션 배포 및 호스팅 플랫폼, Vercel과 Fly.io로 배포 및 관리</td>
    </tr>
    <tr>
      <td>Code Editor</td>
      <td>
        <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VS Code">
      </td>
      <td>코드 편집기 및 IDE, VS Code는 범용 편집기로, PyCharm은 Python 개발에 특화된 IDE</td>
    </tr>
  </tbody>
</table>

<br><br>

## 🟨 프로젝트 개요도

<br>

<img src="개요도/프로젝트 개요도.png" alt="프로젝트 개요도" width="1200"/>

<br><br>

## 🟨 모듈 개요도

<br>

<img src="개요도/모듈 개요도.png" alt="모듈 개요도" width="1200"/>

<br><br>

## 🟨 시나리오 흐름도

<br>

### 1단계
<img src="시나리오%20흐름도/1.png" width="1200" alt="1단계"/>

<br><br>

### 2단계
<img src="시나리오%20흐름도/2.png" width="1200" alt="2단계"/>

<br><br>

### 3단계
<p float="left">
  <img src="시나리오%20흐름도/3.png" width="50%" height="600" alt="3단계-1"/>
  <img src="시나리오%20흐름도/4.png" width="49%" height="600" alt="3단계-2"/>
</p>

<br><br>

### 4단계
<p float="left">
  <img src="시나리오%20흐름도/5.png" width="50%" height="600" alt="4단계-1"/>
  <img src="시나리오%20흐름도/6.png" width="49%" height="600" alt="4단계-2"/>
</p>






