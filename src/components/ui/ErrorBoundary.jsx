import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Algo deu errado:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Tentar novamente</button>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => {
    // Reinicialize o estado da aplicação aqui
  }}
>
  <YourComponent />
</ErrorBoundary>
