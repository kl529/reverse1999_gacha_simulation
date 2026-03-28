"use client";

import React, { Component, ErrorInfo, ReactNode, createContext } from "react";
import { Link } from "@/i18n/navigation";
import { analytics } from "@/lib/posthog";

// ErrorBoundary 활성화 상태를 공유하는 Context
export const ErrorBoundaryContext = createContext<boolean>(false);

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 에러 바운더리 컴포넌트
 * React 컴포넌트 트리에서 발생하는 에러를 캐치하고 폴백 UI를 표시합니다.
 */
class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // 다음 렌더링에서 폴백 UI를 표시하도록 상태를 업데이트
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅 서비스에 에러 정보 전송 가능
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // PostHog에 에러 추적
    analytics.errors.errorOccurred(
      error.message,
      error.stack,
      {
        componentStack: errorInfo.componentStack,
      }
    );
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // 커스텀 폴백 UI가 제공된 경우 사용
      if (this.props.fallback) {
        return (
          <ErrorBoundaryContext.Provider value={true}>
            {this.props.fallback}
          </ErrorBoundaryContext.Provider>
        );
      }

      // 기본 폴백 UI
      return (
        <ErrorBoundaryContext.Provider value={true}>
          <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
              <div className="mb-6 text-center">
                <div className="mb-4 text-6xl">⚠️</div>
                <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  문제가 발생했습니다
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  예상치 못한 오류가 발생했습니다.
                </p>
              </div>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <div className="mb-6 rounded-md bg-red-50 p-4 dark:bg-red-900/20">
                  <h3 className="mb-2 font-semibold text-red-800 dark:text-red-400">
                    에러 상세 (개발 모드):
                  </h3>
                  <pre className="overflow-x-auto text-xs text-red-700 dark:text-red-300">
                    {this.state.error.toString()}
                  </pre>
                </div>
              )}

              <div className="flex flex-col gap-3">
                <button
                  onClick={this.handleReset}
                  className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                  다시 시도
                </button>
                <Link
                  href="/"
                  className="rounded-md bg-gray-200 px-4 py-2 text-center font-medium text-gray-900 transition hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                >
                  홈으로 돌아가기
                </Link>
              </div>
            </div>
          </div>
        </ErrorBoundaryContext.Provider>
      );
    }

    return (
      <ErrorBoundaryContext.Provider value={false}>
        {this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export default ErrorBoundary;
