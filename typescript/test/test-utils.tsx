import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

type ProvidersProps = {
  children?: ReactNode
}

const Providers = ({ children }: ProvidersProps): JSX.Element => {
  return <>{children}</>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'

export { customRender as render }
