export function useComposition() {
  const handleCompositionStart = (event: CompositionEvent) => {
    ;(event.target as any).composing = true
  }

  const handleCompositionEnd = (event: CompositionEvent) => {
    ;(event.target as any).composing = false
    event.target?.dispatchEvent(new Event('input', { bubbles: true }))
  }

  return {
    handleCompositionStart,
    handleCompositionEnd,
  }
}
