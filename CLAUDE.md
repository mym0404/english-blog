# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

Next.js 기반의 영어 학습 문서 사이트. Fumadocs를 사용하여 MDX 기반 문서와 블로그를 관리합니다.

## 필수 명령어

### 개발 및 빌드
```bash
pnpm dev              # 개발 서버 실행 (http://localhost:3000)
pnpm build            # 프로덕션 빌드
pnpm start            # 프로덕션 서버 실행
```

### 타입 체크 및 린트
```bash
pnpm types:check      # MDX 생성, Next.js 타입 생성, TypeScript 타입 체크 실행
pnpm lint             # Biome으로 코드 린트
pnpm format           # Biome으로 코드 포맷팅
pnpm t                # 타입 체크 + 린트 (통합 검증)
```

### 콘텐츠 동기화
```bash
pnpm sync             # Obsidian vault에서 content/ 디렉토리로 동기화
pnpm sync:up          # content/ 디렉토리에서 Obsidian vault로 동기화
```

동기화 스크립트는 `/Users/mj/Library/Mobile Documents/iCloud~md~obsidian/Documents/english/`와 `./content/` 간 rsync를 수행합니다.

## 아키텍처

### 콘텐츠 소스 시스템

이 프로젝트는 Fumadocs의 소스 API를 사용하여 MDX 콘텐츠를 관리합니다:

- **소스 정의**: `source.config.ts`에서 `docs`와 `blog` 컬렉션을 정의
  - `docs`: `content/docs/` 디렉토리의 문서 (frontmatter + postprocess 설정)
  - `blog`: `content/blog/` 디렉토리의 블로그 (date, author, tags 필드 추가)

- **소스 로더**: `src/lib/source.ts`에서 `loader()` 함수로 컬렉션을 로드
  - `source`: 문서용 (`/docs` baseUrl)
  - `blog`: 블로그용 (`/blog` baseUrl)
  - 두 로더 모두 `lucideIconsPlugin()` 사용

- **빌드 프로세스**:
  - `postinstall` 스크립트와 `types:check`에서 `fumadocs-mdx` 실행
  - 이는 `.source/` 디렉토리에 타입 안전한 컬렉션 생성
  - `fumadocs-mdx:collections/*` 경로 별칭으로 임포트 가능

### 라우트 구조

- `app/(home)/`: 홈페이지 및 일반 페이지 (HomeLayout 사용)
- `app/docs/`: 문서 페이지 (DocsLayout, 사이드바 탭 포함)
- `app/api/search/`: 검색 API 엔드포인트
- `app/og/`: OG 이미지 생성
- `app/llms-full.txt/`: LLM용 전체 텍스트 제공

### 레이아웃 시스템

- `src/lib/layout.shared.tsx`: 공통 레이아웃 옵션 (`baseOptions()`)
  - 네비게이션 바 설정 (로고, 타이틀)
  - `HomeLayout`과 `DocsLayout` 모두 이 옵션 사용

- 홈 레이아웃: Study Note, Blog 링크 제공
- 문서 레이아웃: 페이지 트리 기반 사이드바, 탭별 색상 커스터마이징

### 컴포넌트

`src/components/`에 특수 목적 컴포넌트 포함:
- `FlyingAlphabets.tsx`: 3D 애니메이션 효과
- `Terminal.tsx`: 터미널 UI 컴포넌트

## TypeScript 설정

- **경로 별칭**:
  - `@/*`: `./src/*`
  - `fumadocs-mdx:collections/*`: `.source/*` (MDX 컬렉션)

- **타입 체크 순서**: `fumadocs-mdx` → `next typegen` → `tsc --noEmit`

## Next.js 설정

- React Strict Mode 활성화
- 이미지 최적화: 5시간 캐시 TTL, 여러 외부 도메인 허용
- Fumadocs MDX 플러그인 통합

## 중요 고려사항

1. **콘텐츠 수정**: `content/docs/` 또는 `content/blog/`의 MDX 파일 수정 후 반드시 `fumadocs-mdx` 실행 (자동으로 `postinstall`에서 실행됨)

2. **타입 안전성**: 컬렉션 타입은 `.source/`에서 자동 생성되므로, `source.config.ts` 변경 시 `pnpm types:check` 실행 필요

3. **OG 이미지**: `src/lib/source.ts`의 `getPageImage()` 함수가 `/og/docs/${slugs}/image.png` 형식의 OG 이미지 URL 생성

4. **LLM 텍스트**: `getLLMText()` 함수가 페이지의 processed markdown을 반환 (`includeProcessedMarkdown: true` 설정 필요)