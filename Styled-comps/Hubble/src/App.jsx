import {ThemeProvider} from 'styled-components'
import { Container } from "./components/styles/Container.styled"
import Card from './components/Card'
import Header from "./components/Header"
import GlobalStyles from './components/styles/Global'
import content from './content'
import Footer from './components/Footer'

const App = () => {
  
  const theme = {
    colors: {
      header: '#ebfbff',
      body: '#fff',
      footer: '#003333'
    },
    mobile: '768px',
  }

  return (
    <ThemeProvider theme= {theme}>
      <>
        <GlobalStyles />
        <Header/>
        <Container>
          {content.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </Container>
        <Footer />
      </>
    </ThemeProvider>
  )
}
 
export default App