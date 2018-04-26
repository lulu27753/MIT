const { render } = ReactDOM
const {BrowserRouter, Route, Link} = ReactRouterDOM

const App = () => (
  <BrowserRouter basename='/minooo'>
    <div>
      <AddressBar />
      <Link to='/'>home</Link>
      <Link to='/about/12?name=minooo'>about</Link>
      <Link to='/contact'>contact</Link>
      <Link to='/other/react/router'>other</Link>
      <Link to='/another/2017-04-02.html'>another</Link>
      <Link to='/query/user?id=123&name=minooo'>query1</Link>
      <Link
        to={{pathname: '/query/user', search: '?id=456&name=minooo'}}
        >query2</Link>
      <div>
        <Route exact path='/' component={Home} />
        <Route path='/about/:id' render={({history, location, match}) => <h1>{console.log(history, location, match)}
          About{console.log(match)}
          <span onClick={() => { history.push('/', {name: 'mm'}) }}>click me</span>
        </h1>} />
        <Route path='/contact' children={({match}) => match && <h1>Contact</h1>} />
        <Route path='/other/:page?/:subpage?' render={({ match }) => (
          <h1>
          PAGE: {match.params.page}<br />
          SUBPAGE: {match.params.subpage}

          </h1>
      )} />
      </div>

      <Route path='/another/:a(\d{4}-\d{2}-\d{2}):b(\.[a-z]+)' render={({ match }) => (
        <h1>
          paramA: {match.params.a}<br />
          paramB: {match.params.b}
        </h1>
      )} />
      <Route path='/query/user' render={({match, location}) => (
        <div>
          <p>query</p>
          <p>match:{JSON.stringify(match)}</p>
          <p>location:{JSON.stringify(location)}</p>
          <p>id:{new URLSearchParams(location.search).get('id')}</p>
          <p>name:{new URLSearchParams(location.search).get('name')}</p>
        </div>
      )} />
    </div>
  </BrowserRouter>
)

const Home = (props) => { console.log(props, 'home'); return <h1>Home</h1> }

/* 为了展示URL的变化的组件 请无视我 */
const AddressBar = () => (
  <Route render={({ location: {pathname}, history}) => (
    <div className='address-bar'>
      <div>
        <button
          className='ab-button'
          onClick={history.goBack}
        >◀︎</button>
      </div>
      <div>
        <button
          className='ab-button'
          onClick={history.goForward}
        >▶</button>
      </div>
      <div className='url'>URL: {location.pathname}</div>
    </div>

  )} />
)

render(<App />, document.getElementById('root'))
