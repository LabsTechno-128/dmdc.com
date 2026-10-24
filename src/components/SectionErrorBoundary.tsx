import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class SectionErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[SectionErrorBoundary] Caught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="py-8 sm:py-12 px-4 sm:px-6 text-center bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl max-w-4xl mx-4 sm:mx-auto my-6 sm:my-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
            {this.props.fallbackTitle || 'Section Temporarily Unavailable'}
          </h3>
          <p className="text-gray-600 mb-4 max-w-md mx-auto text-xs sm:text-sm leading-relaxed">
            {this.props.fallbackMessage || 'We are experiencing a temporary issue displaying this section. Please refresh or check back shortly.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-6 py-2.5 bg-[#1e56a0] text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors min-h-[44px] cursor-pointer"
          >
            Retry Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SectionErrorBoundary;
