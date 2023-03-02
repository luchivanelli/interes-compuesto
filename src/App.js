import Form from "./components/Form"
import Container from "./components/Container"
import Section from "./components/Section"

const formula = (deposit, contribution, years, rate)=> {
  let total = deposit

  for (let i=0; i < years; i++) {
    total= (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const App = ()=> {
  return (
    <Container>
      <Section>
        <Form formula={formula}/>
      </Section>
    </Container>
  )
}
export default App;
