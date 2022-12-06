import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Button } from './components/Button';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

export function App() {
  const [count, setCount] = useState(0)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary"></Button>
      <Button variant="secondary"></Button>
      <Button variant="success"></Button>
      <Button variant="danger"></Button>
      <Button ></Button>
      <GlobalStyle/>
    </ThemeProvider>
  )
}
